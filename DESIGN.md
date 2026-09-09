---
name: RVAP Technical Field Guide
description: Shipped RVAP reading system for GitHub Copilot Train-the-Trainer.
colors:
  rvap-blue: "#1A77E3"
  ms-blue: "#0078D4"
  deep-navy: "#032254"
  charcoal: "#47494E"
  light-neutral: "#E3E6ED"
  white: "#FFFFFF"
  surface: "#F5F8FE"
  surface-alt: "#FAFBFD"
  navy-light: "#DDE6F7"
  category-teal: "#0E6467"
  category-teal-light: "#E0F2F1"
  purple: "#504092"
  purple-light: "#EDE9F7"
  text-primary: "#111827"
  text-muted: "#6B7280"
  hero-mid: "#0F3A7A"
typography:
  display:
    fontFamily: '"Aptos Display", "Outfit", "Segoe UI", system-ui, sans-serif'
    fontSize: "1.8rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  headline:
    fontFamily: '"Aptos Display", "Outfit", "Segoe UI", system-ui, sans-serif'
    fontSize: "1.3rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  title:
    fontFamily: '"Aptos Display", "Outfit", "Segoe UI", system-ui, sans-serif'
    fontSize: "1.05rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.015em"
  heading-small:
    fontFamily: '"Aptos Display", "Outfit", "Segoe UI", system-ui, sans-serif'
    fontSize: "0.9rem"
    fontWeight: 600
    letterSpacing: "-0.015em"
  body:
    fontFamily: '"Aptos", "Inter", "Segoe UI", system-ui, sans-serif'
    fontSize: "0.85rem"
    lineHeight: 1.7
  mono:
    fontFamily: '"Cascadia Code", "JetBrains Mono", "Fira Code", monospace'
    fontSize: "0.78rem"
  button:
    fontFamily: '"Aptos", "Inter", "Segoe UI", system-ui, sans-serif'
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
  label:
    fontFamily: '"Aptos", "Inter", "Segoe UI", system-ui, sans-serif'
    fontSize: "0.65rem"
    fontWeight: 600
  nav:
    fontFamily: '"Aptos", "Inter", "Segoe UI", system-ui, sans-serif'
    fontSize: "0.72rem"
    lineHeight: 1.5
  session-tab:
    fontFamily: '"Aptos", "Inter", "Segoe UI", system-ui, sans-serif'
    fontSize: "0.78rem"
    fontWeight: 600
  card-title:
    fontFamily: '"Aptos Display", "Outfit", "Segoe UI", system-ui, sans-serif'
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.35
  table:
    fontFamily: '"Aptos", "Inter", "Segoe UI", system-ui, sans-serif'
    fontSize: "0.78rem"
    lineHeight: 1.55
  set-input:
    fontFamily: '"Aptos", "Inter", "Segoe UI", system-ui, sans-serif'
    fontSize: "0.8rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "4px"
  md: "6px"
  lg: "10px"
spacing:
  control-gap: "0.6rem"
  grid-gap: "0.8rem"
  card-padding: "1.2rem"
  section-gap: "2.4rem"
components:
  button-primary:
    backgroundColor: "{colors.ms-blue}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "0.45rem 0.8rem"
  button-outline:
    backgroundColor: "{colors.white}"
    textColor: "{colors.deep-navy}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "0.45rem 0.8rem"
  button-primary-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.deep-navy}"
  button-outline-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.deep-navy}"
  trainer-button-disabled:
    backgroundColor: "{colors.light-neutral}"
    textColor: "{colors.charcoal}"
  badge:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.charcoal}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.12rem 0.35rem"
  badge-module:
    backgroundColor: "{colors.ms-blue}"
    textColor: "{colors.white}"
  badge-module-2:
    backgroundColor: "{colors.category-teal}"
    textColor: "{colors.white}"
  badge-module-3:
    backgroundColor: "{colors.purple}"
    textColor: "{colors.white}"
  badge-module-4:
    backgroundColor: "{colors.deep-navy}"
    textColor: "{colors.white}"
  badge-module-5:
    backgroundColor: "{colors.charcoal}"
    textColor: "{colors.white}"
  badge-beginner:
    backgroundColor: "{colors.category-teal-light}"
    textColor: "{colors.category-teal}"
  badge-intermediate:
    backgroundColor: "{colors.navy-light}"
    textColor: "{colors.deep-navy}"
  badge-advanced:
    backgroundColor: "{colors.purple-light}"
    textColor: "{colors.purple}"
  card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card-padding}"
  nav:
    backgroundColor: "{colors.white}"
    textColor: "{colors.charcoal}"
  nav-active:
    backgroundColor: "{colors.ms-blue}"
    textColor: "{colors.white}"
  nav-hover:
    backgroundColor: "{colors.navy-light}"
    textColor: "{colors.deep-navy}"
  header:
    backgroundColor: "{colors.white}"
    textColor: "{colors.deep-navy}"
    width: "62rem"
  hero:
    textColor: "{colors.white}"
    padding: "3.2rem 2.4rem"
    width: "62rem"
  hero-action-primary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.deep-navy}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "0.45rem 0.8rem"
  hero-action-outline:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "0.45rem 0.8rem"
  curriculum-link:
    backgroundColor: "rgba(3, 34, 84, 0.3)"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "0.55rem 0.8rem"
  curriculum-link-active:
    backgroundColor: "{colors.white}"
    textColor: "{colors.deep-navy}"
  track-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card-padding}"
  track-card-hover:
    backgroundColor: "{colors.navy-light}"
  session-tabs:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "0.25rem"
  session-tab:
    textColor: "{colors.charcoal}"
    typography: "{typography.session-tab}"
    rounded: "{rounded.sm}"
    padding: "0.35rem 0.8rem"
  session-tab-active:
    backgroundColor: "{colors.ms-blue}"
    textColor: "{colors.white}"
  trainer-controls:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "0.8rem"
  reading-table:
    typography: "{typography.table}"
    rounded: "{rounded.md}"
    width: "100%"
  reading-code:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.deep-navy}"
    typography: "{typography.mono}"
    rounded: "{rounded.md}"
  search:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.md}"
  set-field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.charcoal}"
    typography: "{typography.set-input}"
    rounded: "{rounded.sm}"
    padding: "0.5rem 0.6rem"
  set-choice-selected:
    backgroundColor: "{colors.navy-light}"
    textColor: "{colors.deep-navy}"
    padding: "0.8rem"
  set-composer:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.md}"
    padding: "1rem"
    width: "20rem"
  shared-set-row:
    backgroundColor: "{colors.white}"
    textColor: "{colors.charcoal}"
    padding: "1.4rem 0"
  set-primary-focus:
    backgroundColor: "{colors.ms-blue}"
    textColor: "{colors.white}"
  set-primary-hover:
    backgroundColor: "{colors.deep-navy}"
    textColor: "{colors.white}"
  set-primary-active:
    backgroundColor: "{colors.deep-navy}"
    textColor: "{colors.white}"
  set-primary-disabled:
    backgroundColor: "{colors.light-neutral}"
    textColor: "{colors.charcoal}"
---

# Design System: RVAP Technical Field Guide

## Overview

**Creative North Star: "RVAP Technical Field Guide"**

The compact full RVAP wordmark and blue navigation anchor the shared white
header. The home hero uses the brand's navy-to-blue gradient. Labs and trainer
guides keep their white reading surfaces and navy headings, with trainer controls
inside the document.

**This records the shipped implementation.** `overrides/rvap-brand.css` preserves
the supplied kit; `overrides/extra.css` applies it to Material. The original
sources are `.agents/skills/rvap-brand/assets/brand.css` and
`.agents/skills/rvap-brand/references/brand-tokens.md`. That reference cites a
14-slide internal working draft; this record does not claim inspection of the
original presentation.

Markup and behavior come from `overrides/main.html`, the header and logo partials
under `overrides/partials/`, `mkdocs.yml`, `hooks/presentation_embed.py`, and
`overrides/session.js`.
`PRODUCT.md` holds product facts. `.impeccable/surfaces/overrides-extra-css.md`
holds the approved direction. Frontmatter records used primitives;
`.impeccable/design.json` adds metadata and scoped component previews.

The custom builder and shared viewer inherit this system and the compact logo
exception. Their sources are `overrides/set-builder.html`, `overrides/session-set.html`,
`overrides/set-builder.css`, and `overrides/sets.js`; `build-set.md` and
`session-set.md` select the templates. Their direction stays in
`.impeccable/surfaces/overrides-set-builder-css.md`. No new imagery or font stack
is introduced, and lab/trainer layouts and controls stay unchanged.

**Synthetic tonal ramps are preview aids, not approved palette extensions.**
Preview CSS uses pixel equivalents of the observed 20px Material rem to render
independently of the preview host. Previews describe appearance, without running
the site's JavaScript.

**Key Characteristics:**

- Shared light reading layout with navy headings.
- Aptos font stacks with Outfit and Inter web fallbacks.
- Compact RVAP identity and blue current-page states.
- Brand-gradient hero with curriculum jump links.

## Colors

### Primary

**RVAP Blue** remains the brand accent for borders and the gradient endpoint.
It also underlines targeted module headings. **Microsoft Blue** supplies ordinary
reading links and small filled actions. Current-page navigation and M1 badges
use the same blue without gaining pillar meaning.
This approved adaptation gives white text a contrast ratio of 4.53:1;
RVAP Blue gives 4.38:1, below the 4.5:1 target for these small labels.

### Secondary

**Deep Navy** supplies headings and labels on light surfaces. Footer navigation and
linked code use navy on their tinted ground, as do links inside tables, quotes,
and admonitions. Ordinary links turn navy on hover.

The home hero and slide titles/dividers use the supplied 135-degree gradient:
Deep Navy at 0%, `hero-mid` at 60%, and RVAP Blue at 100%. Hero text stays solid
white, with `navy-light` emphasis.

### Tertiary

The supplied pillar palette remains available as **brand reference**:

| Pillar | Accent | Tint | Shipped use |
| --- | --- | --- | --- |
| Build | `ms-blue` | `navy-light` | Also used for actions, M1, and Intermediate labels |
| Innovate | `purple` | `purple-light` | Also used for M3 and Advanced labels |
| Scale | Teal (`#14868A`) | `#DDE3EF` | Kit only; category badges use a darker teal adaptation |

**The Category Color Rule.** Use distinct colors for difficulty and M1-M5 badges, with visible names and module numbers. These categories have no Build / Innovate / Scale mapping.

The September 7, 2026 approval supersedes neutral-difficulty and no-category-color
instructions for these badges. Beginner uses `category-teal` on
`category-teal-light`; Intermediate uses Deep Navy on `navy-light`; Advanced uses
Purple on `purple-light`. Module labels use white on Microsoft Blue (M1),
`category-teal` (M2), Purple (M3), Deep Navy (M4), and Charcoal (M5).

`overrides/extra.css` adds `--color-category-teal`,
`--color-category-teal-light`, and `--color-purple-light`; Purple already exists
in the kit. Dark teal replaces the kit teal for category labels because white
on the original teal gives 4.37:1, below 4.5:1. All new badge pairs meet 4.5:1.

### Neutral

White fills pages and session cards. Charcoal carries reading copy; `surface`
separates controls from the page and fills code blocks and table headers.
Light Neutral supplies borders. `surface-alt` supports table hover and alternating
slide rows. `navy-light` supplies top-menu and track-card hover/focus fills.
It also colors hero emphasis. Material retains `text-primary` as its default
foreground token. Slide captions use `text-muted`; web reading copy stays Charcoal.

## Typography

Headings use **Aptos Display / Outfit**; body copy uses **Aptos / Inter**.
Both stylesheets load the web fallbacks. Aptos remains first in each stack, so
metrics depend on local fonts. The code stack relies on local monospace fallbacks.
The Inter detector exception in `.impeccable/config.json` records the user's
required brand choice.

The observed Material rem is 20px. The hierarchy uses explicit sizes, without a
fixed scale ratio:

| Reading role | Frontmatter role | Observed size | Line height |
| --- | --- | --- | --- |
| H1 | `display` | 36px; 31px at the mobile breakpoint (`1.55rem`) | 1.2 |
| H2 | `headline` | 26px | 1.3 |
| H3 | `title` | 21px | 1.4 |
| H4 | `heading-small` | 18px | Inherited Material rule |
| Prose | `body` | 17px | 1.7 |
| Table / code | `table` / `mono` | 15.6px | 1.55 / 1.6 for blocks |
| Action / sidebar / badge | `button` / `nav` / `label` | 15px / 14.4px / 13px | Component-specific |

Card titles are 20px. The home title is 48px (`2.4rem`), reducing to 40px
(`2rem`) at the reading-narrow breakpoint and 36px (`1.8rem`) on mobile.
Its line height is 1.15. These are home overrides; the title uses no gradient text.
Badges retain ordinary case, without the kit's uppercase pillar-label styling.

Slides share the font stacks but use their own fixed-canvas scale: 21px body
at 1.45 line height, ordinary H1 at `1.5em`, title-slide H1 at `2.15em`, and
divider H1 at `2em`. These sizes do not apply to reading pages.

Set fields reuse body type at 16px; their navy labels are 15px/600. Catalog
titles are 17px/1.4, descriptions 15px/1.6, and metadata/help 14px.
Builder section headings use 22px; shared-set headings use 24px, beside 26px
Microsoft Blue order numbers. Page titles and viewer prose reuse reading styles.

## Layout

The MkDocs grid is capped at `76rem`. Reading content is capped at `72ch`, with
`1.6rem` side padding. Native navigation and the table of contents surround the
central column. Paragraphs use `.8rem` block margins; H2 begins after `2.4rem`.

All 19 trainer guides use this layout and the same table/code treatment as labs.
The three session-material tabs precede H1; trainer controls follow H1. Legacy
`output/trainer/` filenames redirect to the MkDocs guide, preserving query
strings and hashes through JavaScript. A plain link remains without JavaScript.
These redirects have no separate visual system.

The shared header fits the wordmark and title beside desktop navigation and
native Material search in one row. Its inner width is capped at `62rem`, with a
`3.4rem` minimum height and `1.2rem` side padding. Material retains its smaller-screen
drawer and search controls.

The home hero sits outside the article in the full-width hero block. Its inner
grid is capped at `62rem`, with `1.3fr 1fr` columns, a `3rem` gap, and
`3.2rem 2.4rem` padding. The right column stacks five module links with `.45rem`
gaps. Below the hero, the home index retains 19 session cards and six tracks.
Session and track grids use three and two columns, with `.8rem` gaps and a
`62rem` content cap. Content is visible without JavaScript or reveal animation.

At `59.9844em` and below, reading side padding becomes `1rem`; session grids use
two columns. The hero keeps two columns with a `2rem` gap and `2.4rem 1.8rem`
padding. At `40em` and below, grids become single-column and reading padding
becomes `.8rem`. Session tabs share the row with smaller labels.
The hero uses a `1.6rem` gap and `2rem 1.2rem` padding.
Trainer controls wrap and reduce their padding to `.6rem`. The home primary
sidebar is hidden from `76.25em`; Material supplies the smaller-screen drawer.

**Set workspace.** Builder/viewer content uses the shared `62rem` cap with
`1.2rem` side padding, without a TOC or desktop primary sidebar. The builder
places its catalog beside a `20rem` composer with a `1.4rem` gap. The composer
sticks at `4.5rem`, with `max-height: calc(100dvh - 5.5rem)` and local scrolling.
At `59.9844em` and below, it moves above the catalog, becomes static, and drops
its height cap; the selected list is capped at `14rem` and scrolls locally.
At `40em` and below, filters stack in one column and side padding becomes `.8rem`. The shared
header/drawer remains unchanged. Viewer rows pair an order number with reading
copy; their number column narrows from `2rem` to `1.2rem` at `40em`.

## Elevation & Depth

The header and reading panels stay flat. Borders and light fills separate them.
Session and track cards retain the supplied `--shadow-card`:

```css
box-shadow: 0 1px 3px rgba(3, 34, 84, 0.08),
            0 4px 12px rgba(3, 34, 84, 0.06);
```

The slide dialog uses a navy backdrop at 70% opacity. Curriculum links use a
30% navy overlay on the hero gradient, then a white fill on hover or selection.
The hero and gradient title/divider slides are supported brand treatments;
the site has no dark-mode palette.

## Shapes

Small corners serve labels and inline code; medium corners serve controls and
reading panels. Cards and the slide dialog use the large radius. Borders are
normally 1px Light Neutral. The shipped outline action has a neutral border,
replacing the raw kit's 1.5px blue outline.

## Components

### Actions and fields

Primary actions use Microsoft Blue with white labels. Outline actions use white
with navy labels. Both have a `2.2rem` minimum height. Hover changes the fill to
`surface` and the border/text to navy, with a `.15s` color transition. Keyboard
focus uses a 2px navy outline with a 3px offset. Disabled trainer buttons use
Light Neutral with Charcoal text and a not-allowed cursor.

Search keeps Material's behavior, with a light fill, neutral border, and medium
corners. Checkboxes use navy. Set-specific loading and errors are described below.

### Navigation and trainer controls

The white shared header uses the compact full RVAP wordmark. Desktop links reuse
Material's tab-item macro inside the header. The inline navigation omits the
native tabs scroll observer, which would hide this row. Current top-menu items
use white on Microsoft Blue; hover uses navy on `navy-light`.

Primary sidebar current-page links use white on Microsoft Blue, including their
hover/focus state. The TOC keeps navy current-page text. Session tabs use
`aria-current="page"` with white on Microsoft Blue. Other session tabs gain a
white fill on hover. Preserve visible focus outlines and native drawer/search
behavior.

Trainer controls provide start/pause/resume and reset, previous/next H2 navigation,
and print. Section navigation updates the URL hash and moves focus to the heading.
The timer uses tabular numerals. J/K/T shortcuts require the visible opt-in
checkbox and ignore editable fields, interactive controls, and open dialogs.
Controls are hidden until initialized; the guide and native TOC remain readable.
Reduced motion removes animated scrolling and shortens CSS transitions.
Print hides navigation and controls.

### Home hero and curriculum map

Hero actions use a white primary fill with navy text. The secondary action has a
transparent fill, white text, and a `navy-light` outline. Both turn navy on
`navy-light` on hover; focus outlines are white against the gradient.

The five module links have medium corners and a translucent white border over
the navy overlay. Hover and selected links use navy on white. The selected label
is also underlined. Links target focusable `#module-1` through `#module-5` headings;
the targeted heading receives an RVAP Blue underline.

**The Curriculum Jump Rule.** Module links jump to session groups. Keep all 19 sessions and six tracks visible; selection must not filter content.

`overrides/session.js` synchronizes `aria-current="location"` with the URL hash
on initial load and `hashchange`, including deep links. Native anchor navigation
works without JavaScript; the script adds the current-location state.

### Custom session builder and shared set

**The Filter/Selection Rule.** Builder filters affect only its catalog rows. Keep selected sessions and their order when filters change; clearing filters and clearing selection are separate actions.

The homepage and builder share `data/session-catalog.json`: 19 sessions across
five modules. `hooks/presentation_embed.py` resolves material links from actual
MkDocs file URLs. Search matches session ID, title, or description; Module and
Level narrow the builder catalog. A result count and no-match message explain
what remains. Add matching sessions appends unselected matches in catalog order.

Catalog rows use native checkboxes with an Overview link outside the label.
Each row shows session/module/level metadata above its title, then a description
and duration. Selected rows use `navy-light`; Material's more specific checkbox
rule supplies navy checks. Keyboard focus outlines the row in navy. Labeled
fields have white fills and 1px Charcoal borders with small corners; the
introduction textarea resizes vertically.

The flat, tinted composer uses a neutral border and medium corners. It holds
an 80-character title and optional 400-character introduction, followed by a
session count and catalog duration. Its numbered list uses native Up/Down/Remove
buttons, with unavailable moves disabled. Reordering restores button focus and
announces the new position. Empty selection disables Create page and Clear
selection. **Set primary actions keep white text:** Microsoft Blue at rest or
focus, Deep Navy on hover/active, including when focused. The selector
`.md-typeset :is(.set-builder, .session-set) .rvap-action--primary:not(:disabled)`
keeps this override scoped and leaves disabled Create page gray. Focus-visible
uses a 2px navy outline with a 3px offset. White text no longer crosses a light
fill during transitions, fixing Open page. Home and other action states stay
unchanged.

**The URL Set Rule.** Store the ordered subset and user text in the query string; leave the fragment available for heading anchors.

State uses `?v=1&ids=01,10,04&name=...&intro=...`. Draft edits use `replaceState`;
text input waits 300ms, then flushes on change or before unload. Reload, Back,
and Edit this set restore URL state. Create page exposes a readonly share link
and focuses Open page. Changes to the set invalidate that link; filters do not.
Clipboard failure selects the readonly link and reports that manual copying is
needed. **The URL is public to anyone who has it.** Keep confidential text out;
sets require no account, server storage, or committed files.

The viewer renders only the selected sessions, in order, as a ruled reading list
with Overview, Lab, and Trainer Guide links. Title and introduction use
`textContent`, with introduction line breaks preserved. Edit, copy, and print
actions sit above the list; print hides controls and avoids splitting rows.
The preparation reminder remains visible. Prerequisites are not added automatically.

**JavaScript is required** for both set surfaces. Their loading notice links to
the full curriculum and asks readers to enable JavaScript. Invalid versions,
unknown or duplicate IDs, repeated/unexpected fields, and excessive lengths
produce a visible alert in a navy-bordered tinted panel. Query strings above
8,000 characters are rejected. The builder allows a fresh selection; an empty
or invalid viewer offers Build your set. These states reuse existing RVAP colors.

### Reading tables, code, and quotes

Tables use navy headings on a tinted fill, with `.7rem .8rem` cell padding.
**Words wrap normally; wide tables scroll locally.** Do not inherit the article's
anywhere-wrapping rule into tables. Code blocks also scroll locally, with `1rem`
padding and medium corners; linked inline code stays navy.

Quotes and admonitions use neutral borders with light fills. Syntax highlighting
uses navy and Charcoal rather than pillar accents. Slide rendering removes the
known decorative emoji prefixes from headings and callout paragraphs through
`scripts/marp-engine.cjs`; this does not remove meaningful curriculum symbols.

### Cards and labels

Session cards use white with `1.2rem` padding and the supplied shadow.
Hover adds a light fill and RVAP Blue border. The action label uses Microsoft
Blue on white, then navy on hover. Track cards start on `surface` and change to
`navy-light` on hover/focus. Duration labels remain neutral. Difficulty and module
labels use the category palette above; `badge-module` is the M1 default.
The hero map and home cards share module classes with the builder catalog,
selected composer, and shared reader. Difficulty classes are shared wherever
levels appear. Keep the visible labels: color is an extra cue. Badges are
non-interactive and carry no pillar meaning.

### Slides and identity assets

Overview pages offer a slide dialog plus direct HTML/PDF links. The dialog loads
its iframe on demand, closes with Escape or its close button, unloads on close,
and restores focus. Direct links remain without JavaScript. All 19 slide
HTML/PDF pairs use `themes/ghcp-ttt.css`: light content slides, with the permitted
gradient on titles/dividers.

**The Logo Rule.** Use the approved compact full RVAP wordmark in the header and drawer. Keep the 600px minimum displayed width for other full-logo placements. Use a white or very light background, preserve proportions and clear space, and never recolor the artwork.

The user approved "Match the reference's compact full RVAP wordmark" on
September 7, 2026. `assets/logos/rvap-full.png` is the unmodified
`frontier-agentic-devops-rvas` reference's `docs/assets/img/logo-full.png`,
byte-identical to `.agents/skills/rvap-brand/assets/logos/logo-full.png`.
SHA-256: `70896e041f2043c226e94d724f2f1caf403070e0cb230361a1fbaebc5e95e849`.
The header displays it at 36px high, or 32px at `40em` and below; the drawer
uses 36px. Width stays automatic from the 1058:376 source proportions.
The existing GitHub favicon is unchanged.

**Not canonized:** unused kit eyebrows conflict with the craft floor; unused
pillar-badge recipes carry no curriculum meaning.

## Do's and Don'ts

- **Do** keep labs and trainer guides in the same MkDocs reading system.
- **Do** use Microsoft Blue for small filled actions and ordinary links; use navy for links on tinted reading surfaces.
- **Do** keep table word wrapping normal and overflow local.
- **Do** preserve focus cues, visible content without JavaScript, and opt-in trainer shortcuts.
- **Do** preserve logo proportions and clear space.
- **Do** keep curriculum jump links usable without JavaScript.
- **Don't** invent a dark RVAP theme or reintroduce neon reading surfaces.
- **Don't** assign Build / Innovate / Scale meanings to category badge colors.
- **Don't** extend the compact header/drawer logo exception to other placements.
- **Don't** treat generated preview ramps or unused kit recipes as shipped components.
