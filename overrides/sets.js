const SessionSets = (() => {
  "use strict";

  class SetLinkError extends Error {}

  function parseSet(search, sessions) {
    if (!search || search === "?") return { ids: [], name: "", intro: "" };
    if (search.length > 8000) throw new SetLinkError("This set link is too long.");
    const params = new URLSearchParams(search.replace(/^\?/, ""));
    const allowed = new Set(["v", "ids", "name", "intro"]);
    for (const key of params.keys()) {
      if (!allowed.has(key) || params.getAll(key).length !== 1) {
        throw new SetLinkError("This set link contains invalid or repeated fields.");
      }
    }
    if (params.get("v") !== "1" || !params.has("ids")) {
      throw new SetLinkError("This set link has an unsupported format. Create a new set.");
    }
    const ids = params.get("ids") ? params.get("ids").split(",") : [];
    const known = new Set(sessions.map(session => session.id));
    if (ids.some(id => !known.has(id))) {
      throw new SetLinkError("This set includes a session that is not in the catalog. Create a new set.");
    }
    if (new Set(ids).size !== ids.length) {
      throw new SetLinkError("This set link repeats a session. Create a new set.");
    }
    const name = params.get("name") || "";
    const intro = params.get("intro") || "";
    if (name.length > 80 || intro.length > 400) {
      throw new SetLinkError("Set titles can have up to 80 characters and introductions up to 400.");
    }
    return { ids, name, intro };
  }

  function encodeSet(state) {
    const params = new URLSearchParams({ v: "1", ids: state.ids.join(",") });
    if (state.name) params.set("name", state.name);
    if (state.intro) params.set("intro", state.intro);
    return params.toString();
  }

  function setUrl(target, state, base) {
    const url = new URL(target, base);
    url.search = encodeSet(state);
    url.hash = "";
    return url.href;
  }

  function matchingSessions(sessions, { query = "", module = "", level = "" }) {
    const needle = query.trim().toLocaleLowerCase();
    return sessions.filter(session =>
      (!module || session.module === module) &&
      (!level || session.difficulty === level) &&
      (!needle || `${session.id} ${session.title} ${session.description}`.toLocaleLowerCase().includes(needle))
    );
  }

  function moveSession(ids, id, direction) {
    const index = ids.indexOf(id);
    const destination = index + direction;
    const next = [...ids];
    if (index >= 0 && destination >= 0 && destination < ids.length) {
      [next[index], next[destination]] = [next[destination], next[index]];
    }
    return next;
  }

  function durationLabel(minutes) {
    const hours = Math.floor(minutes / 60);
    const remaining = minutes % 60;
    return `${hours} ${hours === 1 ? "hour" : "hours"}${remaining ? ` ${remaining} min` : ""}`;
  }

  function summary(state, byId) {
    const minutes = state.ids.reduce((sum, id) => sum + byId.get(id).duration_minutes, 0);
    return `${state.ids.length} ${state.ids.length === 1 ? "session" : "sessions"} / Catalog duration: ${durationLabel(minutes)}`;
  }

  return { SetLinkError, parseSet, encodeSet, setUrl, matchingSessions, moveSession, durationLabel, summary };
})();

if (typeof module !== "undefined" && module.exports) module.exports = SessionSets;

if (typeof document !== "undefined") {
  (() => {
    "use strict";

    function element(tag, text, className) {
      const node = document.createElement(tag);
      if (text !== undefined) node.textContent = text;
      if (className) node.className = className;
      return node;
    }

    function categoryBadges(session) {
      const badges = element("span", undefined, "ghcp-session-card__badges");
      const module = element("span", `M${session.module}`, "ghcp-badge ghcp-badge--module");
      module.dataset.module = session.module;
      badges.append(
        module,
        element("span", session.difficulty, `ghcp-badge ghcp-badge--${session.difficulty.toLowerCase()}`)
      );
      return badges;
    }

    function readState(root, sessions) {
      const error = root.querySelector("[data-set-error]");
      error.hidden = true;
      try {
        return SessionSets.parseSet(window.location.search, sessions);
      } catch (failure) {
        if (!(failure instanceof SessionSets.SetLinkError)) throw failure;
        error.textContent = failure.message;
        error.hidden = false;
        return null;
      }
    }

    async function copyLink(root, link) {
      const status = root.querySelector("[data-set-status]");
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(link);
          status.textContent = "Link copied.";
          return;
        } catch (error) {
          console.warn("Set link could not be copied to the clipboard.", error);
        }
      }
      const field = root.querySelector("[data-set-link]");
      root.querySelector("[data-set-share]").hidden = false;
      field.value = link;
      field.focus();
      field.select();
      status.textContent = "Automatic copying is unavailable. Copy the selected link manually.";
    }

    function setupBuilder(root, catalog) {
      const sessions = catalog.sessions;
      const byId = new Map(sessions.map(session => [session.id, session]));
      const name = root.querySelector("[data-set-name]");
      const intro = root.querySelector("[data-set-intro]");
      const search = root.querySelector("[data-set-search]");
      const module = root.querySelector("[data-set-module]");
      const level = root.querySelector("[data-set-level]");
      const rows = [...root.querySelectorAll("[data-session-id]")];
      const selected = root.querySelector("[data-set-selected]");
      const create = root.querySelector("[data-set-create]");
      const clear = root.querySelector("[data-set-clear]");
      const share = root.querySelector("[data-set-share]");
      const shareField = root.querySelector("[data-set-link]");
      const open = root.querySelector("[data-set-open]");
      const status = root.querySelector("[data-set-status]");
      let state = { ids: [], name: "", intro: "" };
      let saveTimer = null;

      function matching() {
        return SessionSets.matchingSessions(sessions, {
          query: search.value, module: module.value, level: level.value
        });
      }

      function filter() {
        const ids = new Set(matching().map(session => session.id));
        rows.forEach(row => { row.hidden = !ids.has(row.dataset.sessionId); });
        root.querySelector("[data-set-results]").textContent = `${ids.size} of ${sessions.length} sessions`;
        root.querySelector("[data-set-no-results]").hidden = ids.size > 0;
        root.querySelector("[data-set-add-matching]").disabled = !matching().some(session => !state.ids.includes(session.id));
      }

      function renderSelection() {
        rows.forEach(row => { row.querySelector("input").checked = state.ids.includes(row.dataset.sessionId); });
        selected.replaceChildren();
        state.ids.forEach((id, index) => {
          const session = byId.get(id);
          const item = element("li");
          item.dataset.selectedId = id;
          item.append(element("strong", `Session ${id}: ${session.title}`, "set-selected-title"));
          item.append(categoryBadges(session));
          const actions = element("div", undefined, "set-order-actions");
          for (const [action, text] of [["up", "Up"], ["down", "Down"], ["remove", "Remove"]]) {
            const button = element("button", text, "rvap-action");
            button.type = "button";
            button.dataset.action = action;
            button.setAttribute("aria-label", `${text === "Remove" ? "Remove" : "Move"} session ${id}${text === "Remove" ? "" : ` ${action}`}`);
            button.disabled = (action === "up" && index === 0) || (action === "down" && index === state.ids.length - 1);
            actions.append(button);
          }
          item.append(actions);
          selected.append(item);
        });
        root.querySelector("[data-set-selection-empty]").hidden = state.ids.length > 0;
        root.querySelector("[data-set-summary]").textContent = SessionSets.summary(state, byId);
        create.disabled = state.ids.length === 0;
        clear.disabled = state.ids.length === 0;
        filter();
      }

      function invalidateShare() {
        share.hidden = true;
        shareField.value = "";
        open.removeAttribute("href");
      }

      function persist() {
        window.clearTimeout(saveTimer);
        saveTimer = null;
        const url = new URL(window.location.href);
        url.search = SessionSets.encodeSet(state);
        window.history.replaceState(null, "", url);
      }

      function save(defer = false) {
        state.name = name.value;
        state.intro = intro.value;
        root.querySelector("[data-set-error]").hidden = true;
        invalidateShare();
        window.clearTimeout(saveTimer);
        if (defer) saveTimer = window.setTimeout(persist, 300);
        else persist();
        status.textContent = "";
      }

      function load() {
        window.clearTimeout(saveTimer);
        saveTimer = null;
        state = readState(root, sessions) || { ids: [], name: "", intro: "" };
        name.value = state.name;
        intro.value = state.intro;
        invalidateShare();
        renderSelection();
      }

      rows.forEach(row => row.querySelector("input").addEventListener("change", event => {
        const id = row.dataset.sessionId;
        state.ids = event.target.checked ? [...state.ids, id] : state.ids.filter(value => value !== id);
        save();
        renderSelection();
      }));
      selected.addEventListener("click", event => {
        const button = event.target.closest("button[data-action]");
        if (!button) return;
        const id = button.closest("[data-selected-id]").dataset.selectedId;
        const action = button.dataset.action;
        const index = state.ids.indexOf(id);
        if (action === "remove") state.ids = state.ids.filter(value => value !== id);
        else state.ids = SessionSets.moveSession(state.ids, id, action === "up" ? -1 : 1);
        save();
        renderSelection();
        const focusId = action === "remove" ? state.ids[Math.min(index, state.ids.length - 1)] : id;
        const item = [...selected.children].find(node => node.dataset.selectedId === focusId);
        const sameAction = item?.querySelector(`[data-action="${action}"]:not(:disabled)`);
        (sameAction || item?.querySelector("button:not(:disabled)") || name).focus();
        status.textContent = action === "remove"
          ? `Removed session ${id}.`
          : `Moved session ${id} to position ${state.ids.indexOf(id) + 1}.`;
      });
      [search, module, level].forEach(field => field.addEventListener("input", filter));
      root.querySelector("[data-set-clear-filters]").addEventListener("click", () => {
        search.value = "";
        module.value = "";
        level.value = "";
        filter();
      });
      root.querySelector("[data-set-add-matching]").addEventListener("click", () => {
        state.ids = [...new Set([...state.ids, ...matching().map(session => session.id)])];
        save();
        renderSelection();
      });
      [name, intro].forEach(field => {
        field.addEventListener("input", () => save(true));
        field.addEventListener("change", persist);
      });
      clear.addEventListener("click", () => {
        state.ids = [];
        save();
        renderSelection();
        name.focus();
      });
      create.addEventListener("click", () => {
        persist();
        const link = SessionSets.setUrl(root.dataset.setUrl, state, window.location.href);
        shareField.value = link;
        open.href = link;
        share.hidden = false;
        status.textContent = "Your page is ready. Open it or copy the link to share.";
        open.focus();
      });
      root.querySelector("[data-set-copy]").addEventListener("click", () => copyLink(root, shareField.value));
      window.addEventListener("popstate", load);
      window.addEventListener("beforeunload", () => {
        if (saveTimer !== null) persist();
      });
      load();
      root.querySelector("[data-set-loading]").hidden = true;
      root.querySelector("[data-set-workspace]").hidden = false;
    }

    function setupViewer(root, catalog) {
      const byId = new Map(catalog.sessions.map(session => [session.id, session]));
      const title = root.querySelector("[data-set-title]");
      const description = root.querySelector("[data-set-description]");
      const content = root.querySelector("[data-set-view]");
      const empty = root.querySelector("[data-set-empty]");
      const delivery = root.querySelector("[data-set-delivery]");

      function render() {
        const state = readState(root, catalog.sessions);
        content.hidden = true;
        empty.hidden = false;
        root.querySelector("[data-set-share]").hidden = true;
        root.querySelector("[data-set-status]").textContent = "";
        title.textContent = "Your session set";
        description.textContent = "";
        document.title = "Your session set | GitHub Copilot Train-the-Trainer";
        delivery.replaceChildren();
        if (!state || state.ids.length === 0) return;
        title.textContent = state.name || "My training set";
        description.textContent = state.intro;
        document.title = `${title.textContent} | GitHub Copilot Train-the-Trainer`;
        root.querySelector("[data-set-summary]").textContent = SessionSets.summary(state, byId);
        root.querySelector("[data-set-edit]").href = SessionSets.setUrl(root.dataset.builderUrl, state, window.location.href);
        state.ids.forEach(id => {
          const session = byId.get(id);
          const item = element("li");
          const body = element("div");
          body.append(
            element("h2", session.title),
            element("p", `Session ${id} / ${SessionSets.durationLabel(session.duration_minutes)}`, "set-session-meta"),
            categoryBadges(session),
            element("p", session.description)
          );
          const materials = element("div", undefined, "set-materials");
          for (const [text, target] of [["Overview", session.url], ["Lab", session.lab_url], ["Trainer Guide", session.trainer_url]]) {
            const link = element("a", text);
            link.href = target;
            link.setAttribute("aria-label", `${text} for session ${id}`);
            materials.append(link);
          }
          body.append(materials);
          item.append(body);
          delivery.append(item);
        });
        empty.hidden = true;
        content.hidden = false;
      }

      root.querySelector("[data-set-copy]").addEventListener("click", () => copyLink(root, window.location.href));
      root.querySelector("[data-set-print]").addEventListener("click", () => window.print());
      window.addEventListener("popstate", render);
      render();
      root.querySelector("[data-set-loading]").hidden = true;
    }

    function setup() {
      const builder = document.querySelector("[data-set-builder]");
      const viewer = document.querySelector("[data-session-set]");
      if (!builder && !viewer) return;
      const catalog = JSON.parse(document.getElementById("set-catalog-data").textContent);
      if (builder) setupBuilder(builder, catalog);
      if (viewer) setupViewer(viewer, catalog);
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", setup, { once: true });
    else setup();
  })();
}
