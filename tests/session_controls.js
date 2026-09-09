const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

let now = 0;
const intervals = new Map();
const listeners = new Map();
let intervalId = 0;
let scrollOptions;
let context;

class Element {
  constructor() {
    this.handlers = {};
    this.textContent = "";
    this.top = 0;
    this.bottom = 0;
  }
  addEventListener(name, callback) { this.handlers[name] = callback; }
  closest() { return null; }
  getBoundingClientRect() { return { top: this.top, bottom: this.bottom }; }
  focus() { context.document.activeElement = this; }
  scrollIntoView(options) {
    scrollOptions = options;
    const delta = this.top - 120;
    sections.forEach(section => { section.top -= delta; });
    controls.bottom -= delta;
  }
}

const selectors = [
  ".trainer-timer", "[data-trainer-timer]", "[data-trainer-previous]",
  "[data-trainer-next]", "[data-trainer-shortcuts]", "[data-trainer-reset]",
  "[data-trainer-print]"
];
const nodes = Object.fromEntries(selectors.map(selector => [selector, new Element()]));
const controls = new Element();
controls.bottom = 300;
controls.querySelector = selector => nodes[selector];
const sections = [500, 1200, 1800].map((top, index) => {
  const section = new Element();
  section.id = `section-${index}`;
  section.top = top;
  return section;
});
controls.closest = () => ({ querySelectorAll: selector => {
  assert.equal(selector, "h2[id]");
  return sections;
} });
const header = new Element();
header.bottom = 56;
context = {
  Element, URL, performance: { now: () => now },
  document: {
    readyState: "complete", documentElement: new Element(),
    getElementById: () => null,
    querySelectorAll: () => [],
    querySelector: selector => selector === ".trainer-controls" ? controls : selector === ".md-header" ? header : null,
    addEventListener: (name, callback) => listeners.set(name, callback)
  },
  window: {
    location: { href: "https://example.test/repo/sessions/session-01-test/trainer-content/" },
    history: { replaceState: (_, __, url) => { context.window.location.href = url.href; } },
    getComputedStyle: () => ({ scrollPaddingTop: "0px", scrollMarginTop: "120px" }),
    matchMedia: () => ({ matches: true }),
    setInterval: callback => { intervals.set(++intervalId, callback); return intervalId; },
    clearInterval: id => intervals.delete(id),
    addEventListener: () => {},
    requestAnimationFrame: callback => callback(),
    print: () => {}
  }
};
vm.runInNewContext(
  fs.readFileSync(path.join(__dirname, "../overrides/session.js"), "utf8"),
  context
);
const click = selector => nodes[selector].handlers.click();
const tick = milliseconds => {
  now += milliseconds;
  intervals.forEach(callback => callback());
};
const timer = nodes[".trainer-timer"];
const toggle = nodes["[data-trainer-timer]"];
click("[data-trainer-timer]");
assert.equal(toggle.textContent, "Pause timer");
tick(1500);
assert.equal(timer.textContent, "00:01");
click("[data-trainer-timer]");
assert.equal(toggle.textContent, "Resume timer");
tick(10000);
assert.equal(timer.textContent, "00:01");
click("[data-trainer-timer]");
tick(1500);
assert.equal(timer.textContent, "00:03");
click("[data-trainer-reset]");
assert.equal(timer.textContent, "00:00");
assert.equal(toggle.textContent, "Start timer");
assert.equal(intervals.size, 0);

assert.equal(nodes["[data-trainer-previous]"].disabled, true);
click("[data-trainer-next]");
assert.equal(new URL(context.window.location.href).hash, "#section-0");

const moduleLinks = [1, 2, 3, 4, 5].map(number => ({
  hash: `#module-${number}`,
  attributes: {},
  setAttribute(name, value) { this.attributes[name] = value; },
  removeAttribute(name) { delete this.attributes[name]; }
}));
const homeEvents = new Map();
const homeContext = {
  ...context,
  document: {
    ...context.document,
    querySelector: () => null,
    querySelectorAll: selector => {
      assert.equal(selector, ".ghcp-module-node");
      return moduleLinks;
    }
  },
  window: {
    ...context.window,
    location: new URL("https://example.test/repo/#module-3"),
    addEventListener: (name, callback) => homeEvents.set(name, callback)
  }
};
vm.runInNewContext(
  fs.readFileSync(path.join(__dirname, "../overrides/session.js"), "utf8"),
  homeContext
);
const selectedModules = () => moduleLinks.filter(link => link.attributes["aria-current"] === "location");
assert.deepEqual(selectedModules(), [moduleLinks[2]]);
homeContext.window.location.hash = "#module-5";
homeEvents.get("hashchange")();
assert.deepEqual(selectedModules(), [moduleLinks[4]]);
homeContext.window.location.hash = "#learning-tracks";
homeEvents.get("hashchange")();
assert.deepEqual(selectedModules(), []);
click("[data-trainer-next]");
assert.equal(new URL(context.window.location.href).hash, "#section-1");
assert.equal(scrollOptions.behavior, "instant");
click("[data-trainer-previous]");
assert.equal(new URL(context.window.location.href).hash, "#section-0");

function key(properties = {}) {
  let prevented = false;
  listeners.get("keydown")({
    key: "t", target: new Element(),
    preventDefault: () => { prevented = true; }, ...properties
  });
  return prevented;
}
assert.equal(key(), false);
nodes["[data-trainer-shortcuts]"].checked = true;
for (const modifier of ["ctrlKey", "altKey", "metaKey", "shiftKey", "repeat", "isComposing"]) {
  assert.equal(key({ [modifier]: true }), false);
}
const editable = new Element();
editable.isContentEditable = true;
assert.equal(key({ target: editable }), false);
const input = new Element();
input.closest = () => input;
assert.equal(key({ target: input }), false);
assert.equal(key(), true);
assert.equal(toggle.textContent, "Pause timer");
assert.equal(key({ key: "j" }), true);
assert.equal(new URL(context.window.location.href).hash, "#section-1");
assert.equal(key({ key: "k" }), true);
assert.equal(new URL(context.window.location.href).hash, "#section-0");
