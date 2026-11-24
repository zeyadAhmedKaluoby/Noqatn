<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Noqatni — Invitation Template Design Guide

Noqatni (نقطني) makes interactive invitation pages for weddings (زفاف), engagements (خطوبة), birthdays (عيد ميلاد), sebou (سبوع) and aqiqah (عقيقة). A guest opens a link on their phone, taps to open the invitation, hears music, reads the details, then RSVPs, leaves a message or sends a gift (نقطة). Every template should feel like a **small handmade object being opened**, not a web page with a colour swap.

Read `Frontend.md` (product plan) and `Backend.md` before larger changes. This section covers how templates must **look and behave**.

## 1. Non-negotiables

- **Arabic first, RTL.** `<html lang="ar" dir="rtl">`. Use logical properties only: `ms-/me-/ps-/pe-/start-/end-`, never `ml-/mr-/left-/right-` for layout. Mirror directional decoration (arrows, swooshes, hands); do not mirror text, rings, faces or logos.
- **Design for mobile first.** Design at 360–430px wide and `min-h-svh`. Desktop shows the same phone-width column centred on a themed stage (`--stage`), not a stretched layout.
- **The details must be readable without motion or sound.** Names, date, time, venue, map link and RSVP must stay readable with `prefers-reduced-motion: reduce`, with audio blocked, and with images not loaded.
- **Music starts only from the open tap** (`onOpen` → `startSong`). Never autoplay. There must always be a visible mute control.
- **One open action.** The cover must say clearly what to tap ("افتح الدعوة" / "اضغط لفتح الدعوة"), with a touch target of at least 44×44px.
- **Contrast:** body text needs at least 4.5:1 against its background. Gold on ivory usually fails. Use gold for ornaments and `--ink`/`--muted` for text.

## 2. Template anatomy

Each template has three acts:

1. **Cover (closed):** a full-screen object such as an envelope, wax seal, door, gate, ring box, gift box or poster. It shows the kicker (`EVENT_TYPES[type].kicker`), the names and the date. The rest is held back.
2. **Reveal (opening, about 1.2–2.5s):** one memorable physical motion, like a seal breaking, doors parting, a lid lifting, a ribbon untying or candles lighting. If it runs longer than about 2.5s, add a skip option.
3. **Story (open):** a vertical scroll in this order: names → invitation wording → date/time (+ countdown, add to calendar) → schedule → venue + map → photo (optional) → RSVP → messages → gifts → a short closing line or دعاء.

The page is locked (`is-locked` on html/body) while the cover is showing and unlocked once the story is open. `useStoryPhase` from the story kit does this, plus the reduced-motion skip and the scroll reveal (section 3b).

## 3. Where things live

| Concern | File |
|---|---|
| Template key union | `src/lib/types.ts` → `TemplateKey` |
| Template metadata, palette, event types | `src/lib/templates.ts` → `TEMPLATES`, `OpeningKind` |
| Cover component registry | `src/components/invitation/openings.tsx` → `invitationTemplates` |
| Mini phone preview art (gallery and wizard) | `src/components/invitation/theme-art.tsx` (`kind ===` branches + stage/face colours) |
| Generic covers | `src/components/invitation/theme-openings.tsx` |
| Story kit (hooks, shared blocks, dark-form tone) | `src/components/invitation/story-kit/` |
| Story registry (template key → story component and wrapper) | `story-kit/registry.tsx` → `STORY_REGISTRY` |
| Full bespoke stories | `*-story.tsx`: new ones use the kit (promise, balloons, zaffa); older ones (rose, wax, classic, navy, bab) are being moved over |
| Shared story driven by data | `shared-story.tsx` + `src/lib/story-demos.ts` (`STORY_DEMOS`) |
| Decorations | `decor.tsx` (`Petals`, `Sparkles`, `Confetti`) |
| Theme CSS | `src/app/globals.css`, `ma3zoom-stories.css`, `shared-story.css` |
| Assets | `public/themes/<template>/` (webp preferred), audio in `public/audio/` |

### Adding a template (checklist)

1. Add the key to `TemplateKey` in `types.ts`.
2. Add a `TemplateDef` to `TEMPLATES` with an Arabic `name`, a one-line Arabic `brief` that describes palette and motion, `eventTypes`, `opening`, `decoration`, and all ten colours.
3. If the cover is new, add an `OpeningKind`, build the cover, and register it in `invitationTemplates`.
4. Add a `theme-art.tsx` branch so the gallery thumbnail is a faithful miniature of the real cover. Never use a generic placeholder.
5. Choose the story: reuse `SharedStory` through `STORY_DEMOS` when the cover is the only thing that is new, and write a bespoke `*-story.tsx` on the story kit (section 3b) only when the scroll itself has a distinct art direction. Register it in `STORY_REGISTRY`; do not add another `if (template.key === …)` branch to `InvitationView`.
6. Scope CSS under a template class (for example `.gift-burst …`), prefix keyframes with the template name, and add a `prefers-reduced-motion` block.
7. Check it at 375px in `/create` (preview) and `/invite/[slug]`, using long names, a single name, an empty optional photo, music off, and reduced motion.

### 3b. Story kit

New story templates are built on `src/components/invitation/story-kit/`, so the lifecycle and the shared sections are written once. A kit story is about its own cover, reveal and art; it does not re-implement the lock, the timers, the countdown or the forms.

```tsx
const { phase, root, level, still, cover } = useStoryPhase({ event, prefix: "zf", openMs: ZAFFA_OPEN_MS, onOpen });

<div ref={root} className={`zf ${still ? "is-still" : ""}`}>
  <button {...cover("نوّر الشمعدان وافتح الدعوة")}>…your cover…</button>
  …
  <Countdown prefix="zf" target={target} todayText="الليلة ليلة الفرح" />
  <FormSection prefix="zf" eyebrow="تأكيد الحضور" title="تشرفونا؟" hint="…"><RsvpForm … /></FormSection>
  <VenueActions prefix="zf" event={event} mapLabel="…" calendarLabel="…" />
  <StoryFooter prefix="zf" />
</div>
```

- **Prefix convention.** Pick a short prefix (`zf`, `gb`, `pr`). The kit renders `{prefix}-cover`, `-reveal`, `-count`, `-section`, `-title`, `-form`, `-actions`, `-btn`, `-footer`, and your CSS styles them. Cover state classes are `is-go` and `is-gone`; a revealed block gets `is-in`.
- **Copy stays in the template.** Every block takes its text as props, so each template keeps its own voice and can pass Arabic and English.
- **`onOpen(quick)`** fires on the tap; `quick` is true for reduced motion and `animationLevel: "NONE"`, and the story then opens at once. The registry's `ctaDelay` should return 0 for `quick`.
- **Dark templates:** add `story-dark` to the root class and set `--story-line`, `--story-field-bg`, `--story-field-ink`, `--story-accent` and `--story-focus` on the root. The shared forms then become readable. See `balloons-story.css`.
- **Typography roles, not font names.** Story CSS uses `var(--tf-ar-script)` (names), `--tf-ar-display` (headings and numerals), `--tf-ar-verse` (verses and duaa), `--tf-body` and `--tf-latin-script`. To change a template's fonts, set `fonts: { … }` on its `TemplateDef` in `templates.ts`; do not hard-code `var(--font-…)` in story CSS.
- **Not yet on the kit:** `rose-story`, `wax-story`, `classic-story`, `navy-story`, `bab-story` and `shared-story` have their own lifecycle code. They render through the registry, and moving them over is planned.

## 4. Colour tokens

Every template defines these ten tokens. They are exposed as CSS variables through `themeVars()`:

| Token | Role |
|---|---|
| `bg` | page paper |
| `card` | raised surfaces (cards, forms), a little lighter or darker than `bg` |
| `stage` | desktop backdrop and the area around the phone column |
| `ink` | primary text, names |
| `muted` | secondary text, labels (must still pass 4.5:1 on `bg`) |
| `gold` | ornaments, rules, monograms, the hero accent (decorative, not body text) |
| `accent` | a second accent, such as leaves, ribbons or a secondary icon colour |
| `petal` | colour of the falling decoration |
| `button` / `buttonText` | primary call to action (open, RSVP submit) |

Use `var(--…)` inside shared components. Hard-coded hex values are fine **inside bespoke art and SVG** only.

## 5. Typography

Fonts are loaded in `src/app/layout.tsx`. Use the CSS variables and do not add new Google fonts without a reason.

| Variable | Use |
|---|---|
| `--font-ruqaa` (Aref Ruqaa) | Arabic names on romantic and wedding covers, the hero name moment |
| `--font-messiri` (El Messiri) | Arabic display headings, a modern and elegant feel |
| `--font-amiri` (Amiri) | Quranic verses, دعاء, classic formal wording |
| `--font-poster` (Rakkas) | bold poster or party titles (birthday, poster-dance) |
| `--font-alexandria` / `--font-cairo` | body, labels, forms, numbers |
| `--font-pinyon` / `--font-script` | Latin script accents only ("Save the Date", "&") |
| `--font-cormorant` | Latin serif for English names and dates |

Rules: use at most **two families per screen** plus one accent. Arabic names are the hero, so give them space (`leading-none` to `leading-tight`, 2.25–3.5rem on the cover). Do not letter-space connected Arabic script. Use `tracking-[0.3em+]` only on short kickers. Format dates and times with `formatArabicDate` / `formatTime` / `formatNumber` from `src/lib/format.ts`.

## 6. Art direction by occasion

### Wedding (زفاف): timeless, ceremonial, emotional
- **Mood:** a family heirloom, quiet luxury, a sense of blessing.
- **Palettes:** ivory, champagne and antique gold · emerald and gold · navy and cream · blush and dusty rose · sage and cream · lavender mist.
- **Covers:** wax seals, envelopes, carved or mashrabiya doors, garden arches, castle gates, framed verses (بسم الله, ﴿وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم…﴾ in Amiri).
- **Ornaments:** thin gold rules, monogram initials ("ز & س"), botanical line art, soft paper grain, blurred colour glows in the corners.
- **Motion:** slow (600–1200ms, ease-out), few petals, a short shimmer once and not on a loop.
- **Avoid:** confetti, saturated primaries, cartoon art, rounded "app" UI chrome.
- **Reference bespoke story:** `zaffa-candles` (`zaffa-story.tsx` + `zaffa-story.css`): a brass candelabra whose seven candles light in sequence, a brass arch that draws itself, and programme items that each light a candle on scroll.

### Wedding family (doors and envelopes)

`garden-gate` (`wg`), `mashrabiya-door` (`wm`), `moon-door` (`wn`), `lavender-window` (`wl`), `elegant-floral` (`we`), `watercolor-seal` (`ww`) and `bismillah-seal` (`wb`) share **one elegant story body**: `wedding/wedding-story.tsx` + `wedding/wedding.css`, prefix `wd`. A variant in `wedding/wedding-variants.tsx` picks the cover **mechanism** and supplies art, ornament, verse and a few lines of copy; the root class supplies the palette.

- **Doors** (`mechanism: "doors"`): a scene SVG sits behind two leaves; each leaf is drawn once and mirrored in CSS, and swings with `rotateY` under `perspective` on the portal; then the portal zooms forward. Add a door variant with a `Leaf` and a `Scene` in `wedding/wedding-art.tsx`.
- **Envelope** (`mechanism: "envelope"`): the seal splits into two halves, the flap turns back with `scaleY` about its top edge (outer flap fades as it turns edge-on, a lining copy behind fades in), and the card rises. Extras: falling petals (`we`), a watercolour wash (`ww`), a gold sweep over بسم الله (`wb`).
- The body has a three-part date (weekday, large day, month and year), an arched venue card, a timeline with diamond nodes and a double-framed note. `moon-door` is dark and turns on `story-dark` with `dark: true`.
- **Pitfall:** `border-radius: 999px …/ 46%` flattens an arch, because oversized radii are scaled down together. Use percentages (`50% 50% … / 34% 34% …`).
- **Pitfall:** an SVG arc whose radius is smaller than half its chord is silently enlarged; a crescent drawn that way has zero area.

### Engagement (خطوبة): intimate, warm, promising
- **Mood:** softer and younger than a wedding, a first step. The emphasis is on "the two of them".
- **Palettes:** rose gold and blush · champagne and pearl · warm terracotta and cream · deep burgundy and soft pink for evening events.
- **Motifs:** two rings (دبلتين) that interlock, a velvet ring box, a ribbon or bow, entwined initials, a single rose, a "يوم قراءة الفاتحة" verse option.
- **Motion:** rings sliding together, the ring box lid lifting with a soft sparkle (`Sparkles`), a heart drawn as a single SVG stroke. Light and quick (400–900ms).
- **Existing:** three bespoke stories, each with its own signature:
  - `promise-ribbon` (burgundy night, a satin bow that unties): `promise-story.tsx`.
  - `ring-box` (blush and rose gold, prefix `rb`): `ringbox-story.tsx` + `ringbox-art.tsx` + `ringbox-story.css`. The lid opens by animating `scaleY` about its hinge: the outer velvet lid fades out as it turns edge-on while an inner-lining copy behind the box fades in, the rings rise, a glint crosses the diamond, and the hero is a two-ring monogram with the couple's initials.
  - `romantic-engagement` (cream linen and terracotta, prefix `po`): `polaroid-story.tsx` + `polaroid-story.css`. The guest shakes a blank polaroid and the photo develops (a CSS filter transition from blurred and desaturated; with no photo it falls back to a two-ring drawing). Snapshot cards, a film-strip countdown.
  - Cover and hero miniatures for all of them are in `theme-art.tsx`.
- **Gap to fill:** a "promise" calligraphy stroke drawn on open, and a daytime garden engagement in sage and blush.

### Birthday (عيد ميلاد): joyful, playful, personal
- **Two directions, chosen by the honoree:**
  - **Kids:** bright but **coordinated** palettes (3 main colours plus a neutral ink, never a rainbow mess). Balloons, candles, gift boxes, stickers, a large age number, chunky Rakkas titles, rounded shapes.
  - **Adult / milestone (18, 30, 40, 50…):** black, champagne and gold; a jewel tone with cream; a disco or neon night. A large numeral as the hero, an elegant serif, one burst of confetti and then calm.
- **Motifs:** candles that light on open, a gift lid popping, balloons rising, the age number drawn in, a photo of the honoree in a playful frame (`InvitePhoto`).
- **Motion:** one celebratory **burst** (`Confetti`, under 2s), then a calm page. A small bounce or wobble on stickers is fine. Nothing should loop behind the text.
- **Existing:** `birthday-candles`, `birthday-confetti`, `gift-burst` (all three in the festive family below), `golden-balloons` (the reference adult/milestone story: `balloons-story.tsx` + `balloons-story.css`, dark theme with form overrides).
- **Gap to fill:** a cake-cutting cover, a bright kids version of the balloon pop, and themed kids versions (space, garden, princess or superhero colour schemes without copyrighted characters).

### Festive family (birthday and sebou party templates)

`birthday-candles` (prefix `bc`), `birthday-confetti` (`bf`), `gift-burst` (`gx`) and `sebou-festival` (`sf`) share **one story body**: `festive/festive-story.tsx` + `festive/festive.css`, with prefix `pt`. A *variant* in `festive/festive-variants.tsx` supplies the cover art, hero decoration, Arabic copy and `openMs`; the root class (`bc`/`bf`/`gx`/`sf`) supplies the palette and the cover animation in `festive.css`.

- **Signatures:** candles go out with smoke and a confetti burst; six balloons pop one by one with rings; the gift's ribbon unties, the lid flies off and a card rises; the sieve shakes and the sweets spill.
- **Add a fifth variant** by adding a key to `FESTIVE`, a cover component in `festive-art.tsx`, a palette block and cover keyframes in `festive.css`, and a `festive("<key>")` entry in `STORY_REGISTRY`. Do not copy the body.
- The style is playful but readable: thick ink outlines, hard offset shadows, one bright accent per card. The three birthday templates use the poster font (Rakkas) for names and headings through `fonts` on their `TemplateDef`; times and dates stay in the body font because Rakkas numerals are hard to read.
- The photo, if present, becomes a taped sticker. Names are never split per letter: that breaks Arabic joining.

### Sebou and Aqiqah
Lanterns, olive branches, the baby's name as the hero, and gentle colour. The same rules apply.

- **`sebou-lanterns`** (`sebou-story.tsx` + `sebou-art.tsx` + `sebou-story.css`, prefix `sb`): a navy night cover where the guest strikes the mortar (الهون); the pestle hits three times, sound rings ripple out, the lanterns light one by one and sugared sweets scatter, then the page opens onto warm cream. Programme items each light a small lantern on scroll.
- **`aqiqah-olive`** (`aqiqah-story.tsx` + `olive-art.tsx` + `aqiqah-story.css`, prefix `aq`): a branch whose folded leaves unfold on tap, then an olive wreath draws itself around the baby's name. Calm and thankful: sage, olive green, soft brass.
- Both are on the story kit and registered in `STORY_REGISTRY`. `sebou-festival` is the brighter, daytime sebou in the festive family above.

## 7. Motion rules

- Prefer CSS keyframes and transitions (existing names include `fall`, `sway`, `draw`, `rise`, `flap`, `twinkle`, `flicker`, `bob`) and SVG `stroke-dashoffset` drawing. Do not add Framer Motion or GSAP for something CSS can do.
- Animate only `transform` and `opacity` (plus `filter`/`clip-path` sparingly). Never animate layout properties.
- Stagger story lines on entry (`d1`, `d2`… delay classes) at 80–150ms steps.
- Decorations hold 12–24 particles on mobile, run behind content with `pointer-events-none` and `aria-hidden`, and pause when `document.hidden`.
- Every template stylesheet needs a `@media (prefers-reduced-motion: reduce)` block that disables loops and shows the final state at once.
- `design.animationLevel` (`NONE` | `SUBTLE` | `FULL`) must actually change the output: NONE has no decoration, SUBTLE has a reveal only, FULL has the reveal plus decoration.

## 8. Imagery and assets

- Original or properly licensed art only. Use no copyrighted characters, brand logos, or designs traced from competitors' templates.
- Prefer inline SVG for ornaments (crisp, themeable with `currentColor` / `var(--gold)`). Use raster only for painterly art. Export it as `.webp`, keep it under 200KB, size it for 2× at 430px, and place it in `public/themes/<template>/`.
- Decorative images get `alt=""`. The honoree photo gets a meaningful alt.
- Videos (like `classic/stamp.mp4`) must be `muted playsInline` and have a poster frame, with a static fallback when the video cannot load.

## 9. Content and copy

- Default wording is warm Egyptian/Arabic invitation phrasing. Keep it short and human, for example "يسعدنا حضوركم لمشاركتنا فرحتنا".
- Names come from `event.details.honoreeNames`. Handle **one name**, **two names**, and **long names** (wrap them gracefully and never truncate a name).
- English copy is available through `inviteCopy` / `InviteLangButton`. Templates must not break when the language toggles.

## 10. Quality bar (check before calling a template done)

- [ ] The cover alone looks good enough for someone to screenshot and post.
- [ ] The reveal has one clear signature motion that matches the occasion.
- [ ] The gallery thumbnail in `theme-art.tsx` matches the real cover.
- [ ] It looks right at 360px and 430px, and on desktop over `--stage`.
- [ ] The layout is correct in RTL, with no `left`/`right` leaks.
- [ ] Text contrast passes, gold is not used for body text, and touch targets are at least 44px.
- [ ] It works with reduced motion, music off or blocked, the photo missing, a single name and a long name.
- [ ] RSVP, message and gift forms are styled with the template tokens and do not show default browser styling.
- [ ] CSS is scoped and keyframes are prefixed, so other templates are not affected.
- [ ] `npm run lint` and `npm run build` pass.
