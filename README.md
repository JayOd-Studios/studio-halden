# Studio Halden — sample architecture portfolio

A self-contained sample portfolio for an architecture practice: a quiet hero, a
six-project index, a pointer-following preview on desktop, project sheets in a
native dialog, studio statement, process and contact. It is a **portfolio
template** — the practice is fictional, and the drawings are illustrative.

- Sector: Portfolio / architecture practice
- Stack: static HTML, CSS and vanilla JS. No build step, no webfonts, no CDN, no photography (the facades are drawn in CSS).
- Run: `python3 -m http.server 3000` in this folder.
- Files: `index.html`, `styles.css`, `main.js`.

## The brand, as written

| Item | Value |
| --- | --- |
| Name | Studio Halden |
| One-liner | Buildings that hold their silence. |
| Audience | Private clients with a site, and municipalities commissioning small public buildings. |
| Tone | Unhurried, exact, allergic to adjectives. Says "we" rarely and "the site" often. |
| Palette | Bone `#EDEADF`, ink `#15150F`, muted `#6C6A5E`, olive `#3F4436` |
| Type | Helvetica Neue in UI; Iowan Old Style / Palatino for display |
| Shape | Square plates, 1px rules, no shadows except the dialog backdrop |

### Screen inventory

1. **Header** — serif wordmark with a small "Architecture · Oslo" line, four section links.
2. **Hero** — practice statement, drawn church facade, coordinates.
3. **Selected works** — index of six projects (number, name, type, place, year); rows open project sheets; hover preview on desktop.
4. **The studio** — interior plate, statement, four facts (founded, people, studios, awards).
5. **Process** — four numbered stages in four columns.
6. **Contact** — email, two addresses and the kind of work taken.
7. **Project dialog** — title, meta, brief, five facts, honest "illustrative" footnote.

### Sample projects

| # | Project | Type | Place | Year | Area |
| --- | --- | --- | --- | --- | --- |
| 01 | Church in Voise | Cultural | Voise | 2019 | 420 m² |
| 02 | House on the Hill | Residential | Ålesund | 2022 | 210 m² |
| 03 | Atelier Nord | Workspace | Oslo | 2024 | 860 m² |
| 04 | Library at Eid | Public | Eid | 2021 | 1,450 m² |
| 05 | Pavilion for a Fjord | Installation | Geiranger | 2023 | 60 m² |
| 06 | Halden Tower | Adaptive reuse | Oslo | 2026 | 3,200 m² |

Studio facts: founded 2014, seven people, Oslo and Ålesund, Norsk Arkitekturpris 2021 and Treprisen 2024.

## What to show it for

Pitch this at architects, photographers and design studios: it demonstrates
restrained editorial layout, an index that stays legible on a phone, a native
`<dialog>` project sheet with keyboard support, a hover state that degrades away
on touch and under reduced motion, and artwork that does not pretend to be a
rendering.

## Make it yours

- Projects: add an object to `projects` in `main.js` with `title`, `meta`, `copy`, `plate` (`p1`–`p6`) and `facts`; then add a matching `<button data-project="id">` row.
- Photography: replace each `.plate` with `<img>` (keep the aspect-ratio and `object-fit: cover`). The dialog plate reuses the same classes.
- Brand: the wordmark, `.mark-sub`, the palette tokens and the footer disclosure.
- Dialog: it uses `showModal()`, so Escape and focus return come for free; do not swap it for a `<div>` without reimplementing both.

## Limits

No CMS, no routing per project, no image pipeline, no contact form (email only).
The hover preview is desktop-only by design, and all drawings are CSS — swap
them before showing this to a real architecture client.
