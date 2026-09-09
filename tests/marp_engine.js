const assert = require("node:assert/strict");
const engine = require("../scripts/marp-engine.cjs");

let transform;
const marp = {
  markdown: {
    core: {
      ruler: {
        after(stage, name, callback) {
          assert.equal(stage, "inline");
          assert.equal(name, "rvap_decorative_prefixes");
          transform = callback;
        },
      },
    },
  },
};

assert.equal(engine({ marp }), marp);

function inline(content, type = "text") {
  return { type: "inline", content, children: [{ type, content }] };
}

const heading = inline("\u{1F4CB} Agenda");
const callout = inline("\u{1F4A1} Keep human review");
const code = inline("\u{1F4A1} Code example", "code_inline");
const paragraph = inline("\u{1F4A1} An instructional example");
const tableCell = inline("\u2615 Break");
const arrow = inline("Build \u2192 Innovate \u2192 Scale");
const state = {
  tokens: [
    { type: "heading_open" }, heading, { type: "heading_close" },
    { type: "blockquote_open" },
    { type: "paragraph_open" }, callout, { type: "paragraph_close" },
    { type: "blockquote_close" },
    { type: "heading_open" }, code, { type: "heading_close" },
    { type: "paragraph_open" }, paragraph, { type: "paragraph_close" },
    { type: "td_open" }, tableCell, { type: "td_close" },
    { type: "heading_open" }, arrow, { type: "heading_close" },
    { type: "fence", content: "\u{1F4A1} Literal fenced code" },
  ],
};

transform(state);
assert.equal(heading.content, "Agenda");
assert.equal(heading.children[0].content, "Agenda");
assert.equal(callout.content, "Keep human review");
assert.equal(callout.children[0].content, "Keep human review");
assert.equal(code.content, "\u{1F4A1} Code example");
assert.equal(paragraph.content, "\u{1F4A1} An instructional example");
assert.equal(tableCell.content, "\u2615 Break");
assert.equal(arrow.content, "Build \u2192 Innovate \u2192 Scale");
assert.equal(state.tokens.at(-1).content, "\u{1F4A1} Literal fenced code");

const result = JSON.stringify(state);
transform(state);
assert.equal(JSON.stringify(state), result);
