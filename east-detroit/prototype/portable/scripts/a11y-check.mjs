// WCAG 2.2 AA check for My East Detroit.
// Builds nothing itself: run `npm run build` first, then `npm run check:a11y`.
// Serves dist/, opens every resident-facing screen in headless Chrome at desktop
// and 320px widths, runs axe-core with the WCAG A and AA rule sets, and adds the
// checks axe does not cover: horizontal overflow at 320px (reflow, 1.4.10),
// text spacing (1.4.12), target size (2.5.8), visible focus (2.4.7) and
// focus not hidden (2.4.11).
// Exits with code 1 when any screen fails.

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, resolve } from "node:path";
import { createRequire } from "node:module";
import puppeteer from "puppeteer-core";

const require = createRequire(import.meta.url);
const AXE_SOURCE = await readFile(require.resolve("axe-core/axe.min.js"), "utf8");
const DIST = resolve(process.argv[2] || "dist");
const CHROME = process.env.CHROME_PATH || "/usr/bin/google-chrome";
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const VIEWPORTS = [
  { name: "desktop", width: 1280, height: 900 },
  { name: "320px", width: 320, height: 800 },
];
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".png": "image/png" };

const server = createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = join(DIST, path);
  try {
    if (!(await stat(file)).isFile()) throw new Error();
  } catch {
    file = join(DIST, "index.html");
  }
  res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream" });
  res.end(await readFile(file));
});
await new Promise((ok) => server.listen(0, "127.0.0.1", ok));
const BASE = `http://127.0.0.1:${server.address().port}`;

// Each screen: a name, a start URL and optional steps that click to reach it.
const SCREENS = [
  { name: "Public homepage", url: "/" },
  { name: "Homepage search with no match", url: "/", run: async (p) => { await p.type("#home-search-input", "zzzz"); await p.click(".home-search-row button"); } },
  { name: "Sign in", url: "/", run: (p) => clickText(p, "button", "Sign in") },
  { name: "Sign in error", url: "/", run: async (p) => { await clickText(p, "button", "Sign in"); await p.$eval("#public-email", (el) => { el.value = ""; }); await p.type("#public-email", "nobody@example.com"); await clickText(p, "button", "Continue to account"); } },
  { name: "Portal home", url: "/", run: async (p) => { await clickText(p, "button", "Sign in"); await clickText(p, "button", "Continue to account"); } },
  ...["All services", "Licenses and permits", "My requests", "Account and privacy"].map((label) => ({
    name: `Portal: ${label}`, url: "/", run: async (p) => { await clickText(p, "button", "Sign in"); await clickText(p, "button", "Continue to account"); await clickText(p, ".primary-nav button", label); },
  })),
  ...["home", "birth", "school", "transit", "authority", "library", "license"].map((step) => ({
    name: `Walkthrough stop: ${step}`, url: `/?demo=1&step=${step}`,
  })),
];

async function clickText(page, selector, text) {
  if (selector.startsWith(".primary-nav")) {
    const menu = await page.$(".mobile-nav-btn");
    if (menu && (await menu.isVisible()) && (await menu.evaluate((el) => el.getAttribute("aria-expanded"))) !== "true") await menu.click();
  }
  const handles = [];
  for (const h of await page.$$(selector)) if (await h.isVisible()) handles.push(h);
  for (const h of handles) {
    const t = (await h.evaluate((el) => el.textContent || "")).trim();
    if (t === text || t.startsWith(text)) {
      await h.click();
      await new Promise((r) => setTimeout(r, 150));
      return;
    }
  }
  throw new Error(`No ${selector} with text "${text}"`);
}

// Checks axe-core leaves out.
function extraChecks() {
  const problems = [];
  const doc = document.documentElement;
  if (doc.scrollWidth > window.innerWidth + 1) {
    problems.push({ id: "reflow-1.4.10", help: `Page scrolls sideways: content is ${doc.scrollWidth}px wide in a ${window.innerWidth}px window`, nodes: [] });
  }
  const interactive = [...document.querySelectorAll("a[href], button, input, select, textarea, [tabindex]:not([tabindex='-1'])")]
    .filter((el) => el.offsetParent !== null && !el.closest("[hidden],[inert]") && getComputedStyle(el).visibility !== "hidden");
  const small = [];
  for (const el of interactive) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    const inline = getComputedStyle(el).display === "inline" && el.closest("p, li, td, span");
    if (inline || el.matches(".skip-link")) continue; // 2.5.8 exempts targets inside a sentence
    if (r.width < 24 || r.height < 24) small.push(`${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 40)}" ${Math.round(r.width)}x${Math.round(r.height)}`);
  }
  if (small.length) problems.push({ id: "target-size-2.5.8", help: "Targets smaller than 24 by 24 px", nodes: small });
  return { problems, focusables: interactive.length };
}

// 1.4.12 Text spacing: apply the WCAG spacing overrides and look for clipped text.
function textSpacingCheck() {
  const style = document.createElement("style");
  style.textContent = "*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}";
  document.head.appendChild(style);
  const clipped = [];
  for (const el of document.querySelectorAll("body *")) {
    if (el.closest(".visually-hidden") || el.matches(".visually-hidden, .skip-link") || !el.textContent.trim()) continue;
    const s = getComputedStyle(el);
    const clips = ["hidden", "clip"].includes(s.overflowX) || ["hidden", "clip"].includes(s.overflowY);
    if (clips && (el.scrollHeight > el.clientHeight + 2 || el.scrollWidth > el.clientWidth + 2)) clipped.push(`${el.tagName.toLowerCase()}.${el.className} "${el.textContent.trim().slice(0, 40)}"`);
  }
  style.remove();
  return clipped.length ? [{ id: "text-spacing-1.4.12", help: "Text is clipped when spacing is increased", nodes: clipped.slice(0, 6) }] : [];
}

// Tab through the page; every stop needs a visible focus style and must be on screen.
async function focusChecks(page, count) {
  const problems = [];
  const seen = new Set();
  await page.evaluate(() => { document.activeElement?.blur(); window.scrollTo(0, 0); });
  for (let i = 0; i < Math.min(count + 2, 80); i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      const label = `${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute("aria-label") || el.id || "").trim().slice(0, 40)}"`;
      const visible = (s.outlineStyle !== "none" && parseFloat(s.outlineWidth) >= 2) || s.boxShadow !== "none";
      const onScreen = r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth;
      const coveredBy = document.elementFromPoint(Math.min(Math.max(r.left + r.width / 2, 0), window.innerWidth - 1), Math.min(Math.max(r.top + r.height / 2, 0), window.innerHeight - 1));
      const hidden = onScreen && coveredBy && !el.contains(coveredBy) && !coveredBy.contains(el) && getComputedStyle(coveredBy).position === "fixed";
      return { label, visible, onScreen, hidden };
    });
    if (!info || seen.has(info.label + i)) continue;
    seen.add(info.label + i);
    if (!info.visible) problems.push({ id: "focus-visible-2.4.7", help: `No visible focus indicator on ${info.label}`, nodes: [] });
    if (!info.onScreen || info.hidden) problems.push({ id: "focus-not-obscured-2.4.11", help: `Focused ${info.label} is off screen or covered`, nodes: [] });
  }
  return problems;
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--no-sandbox", "--disable-gpu"] });
let failures = 0;
for (const vp of VIEWPORTS) {
  for (const screen of SCREENS) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(BASE + "/", { waitUntil: "networkidle0" });
    await page.evaluate(() => localStorage.clear());
    await page.goto(BASE + screen.url, { waitUntil: "networkidle0" });
    page.on("dialog", (d) => d.accept());
    if (screen.run) await screen.run(page);
    await new Promise((r) => setTimeout(r, 200));
    await page.addScriptTag({ content: AXE_SOURCE });
    const axe = await page.evaluate(async (tags) => {
      const res = await window.axe.run(document, { runOnly: { type: "tag", values: tags }, resultTypes: ["violations"] });
      return res.violations.map((v) => ({ id: v.id, help: v.help, impact: v.impact, nodes: v.nodes.slice(0, 6).map((n) => n.target.join(" ") + (n.failureSummary ? " | " + n.failureSummary.split("\n").slice(1).join(" ").slice(0, 160) : "")) }));
    }, TAGS);
    const extra = await page.evaluate(extraChecks);
    const focus = await focusChecks(page, extra.focusables);
    const spacing = await page.evaluate(textSpacingCheck);
    const all = [...axe, ...extra.problems, ...focus, ...spacing];
    if (all.length) {
      failures += all.length;
      console.log(`\nFAIL  ${screen.name} (${vp.name})`);
      for (const v of all) {
        console.log(`  - ${v.id}: ${v.help}`);
        for (const n of v.nodes) console.log(`      ${n}`);
      }
    } else {
      console.log(`pass  ${screen.name} (${vp.name})`);
    }
    await page.close();
  }
}
await browser.close();
server.close();
if (failures) {
  console.log(`\n${failures} accessibility problem(s). See ACCESSIBILITY.md.`);
  process.exit(1);
}
console.log("\nAll screens pass the automated WCAG 2.2 AA checks. Run the manual checks in ACCESSIBILITY.md too.");
