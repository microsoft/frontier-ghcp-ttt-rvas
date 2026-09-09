"""Run against an existing MkDocs preview: python tests/browser_session_sets.py URL."""

import json
from pathlib import Path
import re
import sys
from urllib.parse import parse_qs, urljoin, urlsplit

from playwright.sync_api import expect, sync_playwright


BASE = (sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8765/").rstrip("/") + "/"
OUT = Path(__file__).resolve().parents[1] / ".impeccable/review"
OUT.mkdir(parents=True, exist_ok=True)


def assert_layout(page):
    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth + 1")
    assert page.locator("h1").count() == 1
    assert page.locator(".md-header .md-logo img").evaluate("image => image.complete && image.naturalWidth > 0")

def contrast(foreground, background):
    def luminance(color):
        channels = [int(value) / 255 for value in re.findall(r"\d+", color)[:3]]
        linear = [value / 12.92 if value <= .04045 else ((value + .055) / 1.055) ** 2.4 for value in channels]
        return sum(value * weight for value, weight in zip(linear, [.2126, .7152, .0722]))
    light, dark = sorted([luminance(foreground), luminance(background)], reverse=True)
    return (light + .05) / (dark + .05)


def assert_category_colors(page):
    badges = page.locator(".ghcp-badge").evaluate_all("""nodes => nodes
        .filter(n => n.dataset.module || /--(beginner|intermediate|advanced)/.test(n.className))
        .map(n => ({module:n.dataset.module, text:n.textContent.trim(),
                    color:getComputedStyle(n).color, background:getComputedStyle(n).backgroundColor}))""")
    modules = {badge["module"]: badge["background"] for badge in badges if badge.get("module")}
    levels = {badge["text"]: badge["background"] for badge in badges if not badge.get("module")}
    assert badges
    assert len(set(modules.values())) == len(modules)
    assert len(set(levels.values())) == len(levels)
    for badge in badges:
        assert badge["background"].startswith("rgb("), badge
        assert contrast(badge["color"], badge["background"]) >= 4.5, badge


def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for label, width in [("desktop", 1440), ("mobile", 390)]:
            page = browser.new_page(viewport={"width": width, "height": 1000}, reduced_motion="reduce")
            errors = []
            page.on("pageerror", lambda error: errors.append(str(error)))
            page.goto(urljoin(BASE, "build-set/"), wait_until="networkidle")
            expect(page.locator("[data-set-workspace]")).to_be_visible()
            expect(page.locator("[data-set-create]")).to_be_disabled()
            expect(page.locator(".set-catalog-row:visible")).to_have_count(19)
            assert_layout(page)
            assert_category_colors(page)
            page.screenshot(path=str(OUT / f"set-builder-empty-{label}-top.png"))
            page.screenshot(path=str(OUT / f"set-builder-empty-{label}.png"), full_page=True)

            page.locator('[data-session-id="01"] input').check()
            page.locator('[data-session-id="04"] input').check()
            page.locator('[data-session-id="10"] input').check()
            page.locator("[data-set-name]").fill("Team A & B")
            page.locator("[data-set-intro]").fill("Prepare your environment.\nBring your own repository.")
            page.get_by_role("button", name="Move session 10 up").click()
            selected = page.locator("[data-set-selected] > li")
            assert selected.evaluate_all("nodes => nodes.map(n => n.dataset.selectedId)") == ["01", "10", "04"]
            page.locator("[data-set-search]").fill("no matching session here")
            expect(page.locator("[data-set-no-results]")).to_be_visible()
            expect(selected).to_have_count(3)
            page.locator("[data-set-clear-filters]").click()
            page.locator("[data-set-module]").select_option("3")
            assert page.locator(".set-catalog-row:visible").count() > 0
            expect(selected).to_have_count(3)
            page.locator("[data-set-clear-filters]").click()
            page.reload(wait_until="networkidle")
            expect(page.locator("[data-set-name]")).to_have_value("Team A & B")
            assert selected.evaluate_all("nodes => nodes.map(n => n.dataset.selectedId)") == ["01", "10", "04"]
            page.locator("[data-set-create]").click()
            expect(page.locator("[data-set-open]")).to_be_focused()
            expect(page.locator("[data-set-open]")).to_have_css("color", "rgb(255, 255, 255)")
            expect(page.locator("[data-set-open]")).to_have_css("background-color", "rgb(0, 120, 212)")
            page.locator("[data-set-copy]").focus()
            page.keyboard.press("Tab")
            expect(page.locator("[data-set-open]")).to_be_focused()
            expect(page.locator("[data-set-open]")).to_have_css("outline-style", "solid")
            page.locator("[data-set-copy]").focus()
            page.locator("[data-set-open]").hover()
            page.wait_for_timeout(180)
            expect(page.locator("[data-set-open]")).to_have_css("background-color", "rgb(3, 34, 84)")
            expect(page.locator("[data-set-open]")).to_have_css("color", "rgb(255, 255, 255)")
            page.locator("[data-set-open]").focus()
            expect(page.locator("[data-set-open]")).to_have_css("color", "rgb(255, 255, 255)")
            page.mouse.down()
            expect(page.locator("[data-set-open]")).to_have_css("color", "rgb(255, 255, 255)")
            page.mouse.move(4, 4)
            page.mouse.up()
            page.wait_for_timeout(180)
            expect(page.locator("[data-set-open]")).to_have_css("background-color", "rgb(0, 120, 212)")
            page.locator("[data-set-copy]").focus()
            page.keyboard.press("Tab")
            page.locator("[data-set-open]").scroll_into_view_if_needed()
            page.screenshot(path=str(OUT / f"set-open-focused-{label}.png"))
            link = page.locator("[data-set-link]").input_value()
            assert parse_qs(urlsplit(link).query)["ids"] == ["01,10,04"]
            assert urlsplit(link).path == urlsplit(urljoin(BASE, "session-set/")).path
            page.evaluate("scrollTo(0, 0)")
            assert_layout(page)
            assert_category_colors(page)
            page.screenshot(path=str(OUT / f"set-builder-selected-{label}-top.png"))
            page.screenshot(path=str(OUT / f"set-builder-selected-{label}.png"), full_page=True)

            page.locator("[data-set-name]").fill("Updated set")
            expect(page.locator("[data-set-share]")).not_to_be_visible()
            page.locator("[data-set-create]").click()
            link = page.locator("[data-set-link]").input_value()
            page.evaluate("""() => Object.defineProperty(navigator, 'clipboard', {
                configurable: true, value: {writeText: () => Promise.reject(new DOMException('Denied', 'NotAllowedError'))}
            })""")
            page.locator("[data-set-copy]").click()
            expect(page.locator("[data-set-status]")).to_contain_text("Copy the selected link manually")
            page.locator("[data-set-open]").click()
            page.wait_for_url("**/session-set/?**")
            expect(page.locator("[data-set-title]")).to_have_text("Updated set")
            expect(page.locator("[data-set-delivery] > li")).to_have_count(3)
            assert [item.split(" / ")[0] for item in page.locator(".set-delivery .set-session-meta").all_text_contents()] == [
                "Session 01", "Session 10", "Session 04"
            ]
            expect(page.locator("[data-set-description]")).to_contain_text("Bring your own repository.")
            expect(page.locator(".set-materials a")).to_have_count(9)
            page.locator("[data-set-edit]").focus()
            expect(page.locator("[data-set-edit]")).to_have_css("color", "rgb(255, 255, 255)")
            for target in page.locator(".set-materials a").evaluate_all("links => links.map(a => a.href)"):
                assert page.request.get(target).status == 200, target
            assert_layout(page)
            page.screenshot(path=str(OUT / f"session-set-{label}.png"), full_page=True)
            page.goto(link + "#your-session-set", wait_until="networkidle")
            expect(page.locator("[data-set-delivery] > li")).to_have_count(3)
            page.locator("[data-set-edit]").click()
            page.wait_for_url("**/build-set/?**")
            expect(page.locator("[data-set-name]")).to_have_value("Updated set")
            expect(page.locator("[data-set-selected] > li")).to_have_count(3)
            page.get_by_role("button", name="Remove session 10").click()
            expect(page.locator("[data-set-selected] > li")).to_have_count(2)
            page.locator("[data-set-clear]").click()
            expect(page.locator("[data-set-create]")).to_be_disabled()
            page.locator("[data-set-level]").select_option("Beginner")
            count = page.locator(".set-catalog-row:visible").count()
            page.locator("[data-set-add-matching]").click()
            expect(page.locator("[data-set-selected] > li")).to_have_count(count)
            expect(page.locator("[data-set-add-matching]")).to_be_disabled()
            assert not errors, errors
            page.close()

        page = browser.new_page(viewport={"width": 320, "height": 900})
        page.goto(BASE, wait_until="networkidle")
        assert_category_colors(page)
        for suffix in ["", "?v=1&ids=99", "?v=1&ids=01,01", "?v=2&ids=01"]:
            page.goto(urljoin(BASE, "session-set/") + suffix, wait_until="networkidle")
            expect(page.locator("[data-set-empty]")).to_be_visible()
            expect(page.locator("[data-set-view]")).not_to_be_visible()
            if suffix:
                expect(page.locator("[data-set-error]")).to_be_visible()
            assert_layout(page)
        page.screenshot(path=str(OUT / "session-set-invalid-mobile.png"))
        page.goto(urljoin(BASE, "build-set/") + "?v=1&ids=99", wait_until="networkidle")
        expect(page.locator("[data-set-error]")).to_be_visible()
        page.locator('[data-session-id="01"] input').check()
        expect(page.locator("[data-set-error]")).not_to_be_visible()
        page.locator("[data-set-name]").fill('<img src=x onerror="window.injected=true">')
        page.locator("[data-set-intro]").fill("<script>window.injected=true</script>")
        page.locator("[data-set-create]").click()
        page.locator("[data-set-open]").click()
        page.wait_for_url("**/session-set/?**")
        expect(page.locator("[data-set-title]")).to_have_text('<img src=x onerror="window.injected=true">')
        assert page.locator("[data-set-title] img").count() == 0
        assert not page.evaluate("Boolean(window.injected)")
        assert_layout(page)
        page.close()

        context = browser.new_context(java_script_enabled=False)
        page = context.new_page()
        for route in ["build-set/", "session-set/"]:
            page.goto(urljoin(BASE, route), wait_until="networkidle")
            expect(page.locator("[data-set-loading]")).to_be_visible()
            expect(page.locator("[data-set-loading] a")).to_be_visible()
        context.close()
        browser.close()

    print(json.dumps({"result": "passed", "flows": "selection, filters, ordering, reload, share, edit, invalid links, text safety, no-JS"}))


if __name__ == "__main__":
    run()
