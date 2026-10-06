---
name: SCHLEIFE
description: One magenta ribbon on velvet black, wound round a needle, carrying a tattooist's work down the page and tying a bow on the booking button.
colors:
  negro: "#000000"
  magenta: "#c50457"
  papel: "#ffffff"
  tinta: "#0b0a0b"
  texto: "#f4f0f1"
  texto-2: "#b9adb2"
  texto-campo-2: "#ffe3ee"
  texto-papel-2: "#5c5357"
typography:
  display:
    fontFamily: "Schleife Fraktur, UnifrakturMaguntia, serif"
    fontSize: "clamp(4.4rem, 2.2rem + 6.4vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "0.005em"
  headline:
    fontFamily: "Schleife Fraktur, UnifrakturMaguntia, serif"
    fontSize: "calc(clamp(50px, 5.6vw, 84px) * 0.98)"
    fontWeight: 400
    lineHeight: "calc(clamp(50px, 5.6vw, 84px) * 1.06)"
    letterSpacing: "0.005em"
  title:
    fontFamily: "Schleife Texto, Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.45rem, 1rem + 1.35vw, 2.15rem)"
    fontWeight: 520
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  title-piece:
    fontFamily: "Schleife Texto, Archivo, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 620
    lineHeight: 1.25
  body-lead:
    fontFamily: "Schleife Texto, Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1rem + 0.4vw, 1.3125rem)"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Schleife Texto, Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 0.98rem + 0.25vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Schleife Texto, Archivo, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 560
    letterSpacing: "0.11em"
    fontFeature: "\"tnum\", \"lnum\""
    fontVariation: "\"wdth\" 82"
  button:
    fontFamily: "Schleife Texto, Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 650
    lineHeight: 1.1
    letterSpacing: "0.015em"
    fontVariation: "\"wdth\" 88"
  wordmark:
    fontFamily: "Schleife Romana, Cinzel, serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    letterSpacing: "0.26em"
  ribbon-lettering:
    fontFamily: "Schleife Romana, Cinzel, serif"
    fontSize: "calc(clamp(50px, 5.6vw, 84px) * 0.4)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.24em"
  numeral:
    fontFamily: "Schleife Romana, Cinzel, serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1
    fontFeature: "\"lnum\""
rounded:
  none: "0px"
spacing:
  ribbon: "clamp(50px, 5.6vw, 84px)"
  page-edge: "clamp(18px, 5vw, 72px)"
  header: "64px"
  section-top: "clamp(96px, 13vw, 190px)"
  section-bottom: "clamp(80px, 10vw, 150px)"
  section-head: "clamp(48px, 7vw, 104px)"
  piece-gap: "clamp(56px, 8vw, 128px)"
  touch: "44px"
components:
  button-primary:
    backgroundColor: "{colors.magenta}"
    textColor: "{colors.papel}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0.8em 1.9em"
    height: "52px"
  button-primary-active:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.magenta}"
  button-field:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.magenta}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0.9em 2.3em"
    height: "60px"
  button-field-active:
    backgroundColor: "{colors.magenta}"
    textColor: "{colors.papel}"
  button-large:
    backgroundColor: "{colors.magenta}"
    textColor: "{colors.papel}"
    rounded: "{rounded.none}"
    padding: "0.9em 2.3em"
    height: "60px"
  button-header:
    backgroundColor: "{colors.magenta}"
    textColor: "{colors.papel}"
    rounded: "{rounded.none}"
    padding: "0.55em 1.45em"
    height: "44px"
  banner-word:
    textColor: "{colors.papel}"
    typography: "{typography.headline}"
    height: "{spacing.ribbon}"
  banner-word-field:
    textColor: "{colors.magenta}"
    typography: "{typography.headline}"
    height: "{spacing.ribbon}"
  piece-meta:
    textColor: "{colors.texto-2}"
    typography: "{typography.label}"
  section-paper:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    padding: "clamp(96px, 13vw, 190px) 0 clamp(80px, 10vw, 150px)"
  section-field:
    backgroundColor: "{colors.magenta}"
    textColor: "{colors.papel}"
    padding: "clamp(96px, 13vw, 190px) 0 clamp(80px, 10vw, 150px)"
---

# Design System: SCHLEIFE

## Overview

**Creative North Star: "The Ribbon Round the Needle"**

The whole system is one object taken from her logo: an S drawn as a ribbon wound round a vertical needle (*Schleife* is German for bow). On the page that ribbon is literal. It leaves the needle's eye in the first viewport, winds behind and in front of her work, flattens into a traditional tattoo banner behind every section word, and ties itself into a bow over the last booking button. Everything else holds still so the ribbon and her photographs carry the page.

The ground is velvet black, taken from the backdrop of her own photos, so the work appears to sit in the same space it was shot in. Her exact logo magenta is the only colour with a voice. Paper white appears only where her drawings live, and one section is drenched in magenta, where the ribbon turns white exactly as it does in the logo. States change technique, not tint: dotwork on hover, an inverted field on press, a dotted stencil line for focus. Type runs from billboard Fraktur down to footnote-sized tabular labels, and the practical copy stays in a plain grotesk.

The world refuses the dark-studio default: no grunge texture, no masonry Instagram grid, no neon accent, no clip-art iconography.

**Key Characteristics:**
- One continuous SVG ribbon, generated from the layout, is the signature and the only decoration.
- Flat colour only. Depth comes from the ribbon passing in front of and behind content, never from shadows.
- Three grounds with fixed jobs: black for photographs, paper for drawings, magenta field for booking.
- Square corners everywhere. The one non-rectangular silhouette is the swallowtail ribbon end.
- One authored motion: the ribbon unwinding with the scroll and tying the bow. Reduced motion shows it whole and still.

## Colors

A monochrome stage (velvet black, paper white) carrying one exact brand magenta, with warm-tinted greys for secondary text.

### Primary
- **Logo Magenta** (`magenta`): the exact magenta of her logo. It is the ribbon's front face on black and on paper, the fill of every primary button, the ground of the booking section (the field), text selection, and the scrollbar thumb. Never lightened, darkened or tinted. White text on it passes AA (about 6:1).

### Neutral
- **Velvet Black** (`negro`): the page ground, the header once scrolled (solid after 12px), the phone menu, and the footer. It matches her photo backdrop, so photographs need no frame.
- **Drawing Paper** (`papel`): the ground of the Diseños section and the backing of her drawings, the white ribbon and white button on the field, and button text. It never appears as a panel or card on black.
- **Paper Ink** (`tinta`): body text and banner words on paper.
- **Bone** (`texto`): body text on black; quoted captions in her own words.
- **Ash** (`texto-2`): secondary text on black: intro lines, piece meta, footer, figure notes.
- **Blush on Field** (`texto-campo-2`): secondary text on the magenta field (about 5:1). Only there.
- **Graphite on Paper** (`texto-papel-2`): secondary text and drawing captions on paper.

### Named Rules
**The One Magenta Rule.** Magenta is the brand colour at its exact value or it is absent. Shade comes from black hatching and highlight from white, never from a derived tint of the magenta.

**The Three Grounds Rule.** Black holds photographs, paper holds drawings, the magenta field holds booking. A new section takes the ground of what it shows. Paper does not become a card on black.

## Typography

**Display Font:** Schleife Fraktur (UnifrakturMaguntia, self-hosted), with serif fallback
**Wordmark Font:** Schleife Romana (Cinzel, self-hosted, 400 to 700), with serif fallback
**Body Font:** Schleife Texto (Archivo variable, weight 100 to 900, width 62% to 125%, roman and italic, self-hosted), with system-ui fallback

**Character:** Fraktur is the blackletter of her Instagram highlights and is used only for words that sit on a banner or for her name. Spaced Roman capitals come from her logo lockup and mark the studio name. Archivo does every practical job; its width axis narrows labels and buttons instead of switching family.

### Hierarchy
- **Display** (Fraktur 400, clamp(4.4rem, 2.2rem + 6.4vw, 6rem), 0.98): her name, "Leonor", in the hero only. On phones it is clamp(3.9rem, 17vw, 5rem); on short landscape screens 3.3rem.
- **Headline / Banner word** (Fraktur 400, 0.98 × ribbon width, line height 1.06 × ribbon width): the section names ("Tattoos", "Diseños", "Leonor", "Cita"), each set on a flat stretch of ribbon. The size comes from the ribbon width, so type and ribbon scale together. The full-screen phone menu also uses Fraktur, at clamp(2.8rem, 13vw, 4rem).
- **Title** (Archivo 520, clamp(1.45rem, 1rem + 1.35vw, 2.15rem), 1.15, -0.01em): the plain lines around her name in the hero ("Tatuajes de", "en Gran Canaria").
- **Title Piece** (Archivo 620, 1.1875rem, 1.25; 1.125rem under 900px): the name of each tattoo under its photo.
- **Lead** (Archivo 400, clamp(1.125rem, 1rem + 0.4vw, 1.3125rem), 1.45, max 34ch): section intros and the booking steps. The "Soy Leonor" opening goes larger, clamp(1.3rem, 1rem + 1vw, 1.75rem) at weight 480.
- **Body** (Archivo 400, clamp(1.0625rem, 0.98rem + 0.25vw, 1.125rem), 1.55): running copy, 30 to 46ch per block.
- **Label** (Archivo 560, 0.8125rem, width 82, 0.11em tracking, uppercase, tabular lining figures): piece meta (style · zone · date as `28·09·2026`) and drawing captions. Small uppercase subheads such as "Estilos" use the same treatment at 0.875rem and 600.
- **Wordmark** (Cinzel 500, 0.9375rem, 0.26em, uppercase): SCHLEIFE next to the monogram in the header and footer.
- **Ribbon lettering** (Cinzel 600, 0.4 × ribbon width, 0.24em, uppercase, white): SCHLEIFE carried on the ribbon's flat front panel in the hero.
- **Numeral** (Cinzel 600, 1.5rem, lining): the booking step numbers.

### Named Rules
**The Banner Word Rule.** Fraktur only appears on a banner (section names, the phone menu) or as her name. It is never used for sentences, buttons or labels.

**The Ribbon-Sized Type Rule.** Banner words are sized from the ribbon width (`spacing.ribbon`), never on their own scale. Change the ribbon and the banners follow.

**The Plain Register Rule.** Anything practical (steps, captions, buttons, navigation) is set in Archivo. Facts such as dates and steps use tabular lining figures.

## Layout

Full-bleed sections, all edge to edge, with the page edge as the only gutter (`spacing.page-edge`, 18px to 72px). The header is fixed at 64px and transparent over the hero. It turns solid velvet black after 12px of scroll, and anchors scroll with a 64px offset.

**Section rhythm.** Hero (black) → Tattoos (black) → Diseños (paper) → Leonor (black) → Cita (magenta field) → footer (black). Sections are padded clamp(96px, 13vw, 190px) on top and clamp(80px, 10vw, 150px) at the bottom, with the banner word clamp(48px, 7vw, 104px) above its content. Grounds change at full width with no dividers; the ground change is the divider.

**Hero.** Two columns (1fr : 1.15fr). The copy sits left, vertically centred. The tiger arm photo stands right, full height under the header (max 980px), cut out of its backdrop so the ribbon can pass behind it.

**Gallery.** From 900px up: two staggered columns with a central channel 2.1 × ribbon wide where the ribbon runs. Pieces alternate columns, and each spans two grid rows from its own row, so neighbours offset by half a step. Each piece has its own width (62% to 100% of its column) and aligns inward or outward. Under 900px: one column. Some pieces bleed to the screen edge and keep their captions at the page edge. Pieces where the ribbon crosses reserve 2.4 × ribbon of clear space below. This is not a masonry grid.

**Diseños.** Three drawings bottom-aligned on a 1 : 1.22 : 1 grid. Under 900px they become a horizontal scroll-snap row (each card min(78%, 420px)), which is focusable and scrollable only when it actually overflows.

**Leonor.** Two equal columns with photo and text. Under 900px they stack, and the photo bleeds to the screen edges.

**Cita.** A centred 44rem column: numbered steps on a 2.6rem numeral gutter, then the bow and the button.

**Breakpoints.**
- 900px: desktop gallery, header navigation, side-by-side Leonor. Below it: hamburger menu and single column.
- Phone hero: below 900px *and* narrower than 4:3, or anything under 640px. The arm goes on top (sized so the button stays inside the first screen from 320×640 up, never wider than the screen), with the copy below.
- Short landscape (height ≤ 520px and wider than 4:3): compressed hero type; the footnote line is hidden.
- Under 360px: the header wordmark text is hidden and the monogram stays.

Every interactive target is at least 44px tall.

## Elevation & Depth

Flat. There are no soft or offset shadows, no blur, and no stacked cards. Depth comes from the ribbon alone. It is drawn in two SVG layers, one behind the content (z 1) and one in front (z 3), with photos at z 2 and text at z 4. The ribbon visibly wraps round the work, and text always stays above it.

**The Field Gap Rule.** Where two white or magenta things overlap on the magenta field, they are separated by a gap of field colour, as in her monogram, never by an outline or a shadow. The knot carries a magenta stroke painted under its fill. The last button wears a zero-blur 3px magenta halo on all four sides (four `drop-shadow` offsets of 3px in the field colour), so the ribbon passing behind it reads as cut.

**The Ink Outline Rule.** A black ink outline (1.3px, round joins) on the ribbon appears only over paper, where flat magenta against white needs a drawn edge. It never appears on black or on the field.

## Shapes

Every box is square (0 radius): buttons, photos, sections, menu. The one recurring silhouette is the **swallowtail**, the cut end of a ribbon. Buttons are clipped as a band with a 13px V-notch cut into both ends, and the bow's two tails end the same way. Needles are white slivers with a long eye near the top and a fine point. The knot is an hourglass, taller than wide, pinched in the middle with curved shoulders.

**The Swallowtail Rule.** A shape that is not a rectangle is a piece of ribbon: swallowtail ends, never rounded pills.

## Components

### Buttons
A piece of ribbon you can press.
- **Shape:** a band with swallowtail notches at both ends (13px), square corners (`rounded.none`).
- **Primary:** magenta band, white Archivo 650 at width 88. Standard is 52px tall with 0.8em × 1.9em padding. Large is 60px with 0.9em × 2.3em at 1.1875rem. Header is 44px with 0.55em × 1.45em (42px under 900px).
- **On the field:** white band, magenta text (`button-field`).
- **Hover:** a dotwork fill fades in over the band (0.25s): 1px dots on a 5px grid, black at 50% on magenta, magenta at 42% on white. Colour does not change.
- **Active:** inverted. The band takes the text colour and the text takes the band colour, with no dots.
- **Focus:** the global dotted stencil line (2px dotted currentColor, 5px offset; white on the field).
- **Bow button:** the last button on the field carries the field-gap halo and, when the bow finishes tying, swings once like a tag on a ribbon (1.4s: -3° and up 6px, then 1.6°, then rest).

### Links
- Dotted underline (1.5px, offset 0.28em) that turns solid on hover. Navigation links have no underline at rest and a dotted underline on hover or when they are the current section. Arrow links ("Ver en Instagram") pair Archivo 550 text with an inline SVG arrow at 1em.

### Navigation
- **Desktop (≥ 900px):** monogram (38px) + Cinzel wordmark left, four anchors (Archivo 550, 0.97rem), "Escríbeme" header button right.
- **Phone:** the anchors collapse into a text-and-icon menu button. It opens a full-screen velvet black sheet with the anchors in large Fraktur and the primary button underneath.

### Banner (signature)
The section name on a flat stretch of ribbon. The word is Fraktur at ribbon height. The ribbon script lays its flat front panel behind the word, after which the word turns white (magenta on the field). Without the script, the banner falls back to a flat magenta block with white type (a white block with magenta type on the field), so the page reads as finished without JavaScript.

### The Ribbon (signature)
One continuous band generated in SVG from the live layout. It leaves the needle's eye in the hero, winds round the tiger arm, crosses the gallery channel, sweeps across the paper section, lies behind each banner word and ends in a bow over the last button.
- **Width:** `spacing.ribbon` (clamp(50px, 5.6vw, 84px)), the same value that sizes the banner type.
- **Front face:** flat exact magenta on black and on paper. On the field, flat white.
- **Reverse face:** shaded only by 45° hatching with a line pitch of width/15 (3.6 to 5.6px). On black and paper the lines are black at 0.34 × pitch over magenta. On the field they are magenta at 0.3 × pitch over white. No gradients and no tints.
- **On paper:** a black ink outline is added (see the Ink Outline Rule).
- **Bow:** two loops, two swallowtail tails and the hourglass knot. Inside the knot's turns, the hatched reverse shows through.
- **Lettering:** SCHLEIFE in Cinzel rides the hero's flat front panel, fading in (0.9s) once there is room.

### Photo with caption
Her work, revealed rather than loaded.
- A pre-blurred tiny placeholder (inline base64 WebP) fills the photo's exact box from the first frame on its ground (black, or white for drawings).
- The full image fades in (1.15s, cubic-bezier(.22,.61,.36,1)) while settling from scale 1.045 to 1 (1.8s, `ease`). The placeholder fades out after 0.9s.
- The caption follows 0.18s later, rising 12px.
- Caption parts: piece title (`title-piece`), her own caption quoted in italic Bone, then the meta list in `label` (style · zone · date), then "Ver en Instagram". Max width 44ch.
- With reduced motion, everything appears at rest at once.

### Booking steps
Three numbered lines on the field. The numerals are Cinzel, right-aligned in a 2.6rem gutter. Each line opens with a bold Archivo phrase (680) and continues in plain lead text.

## Do's and Don'ts

### Do:
- **Do** use the logo magenta at its exact value (`colors.magenta`) for the ribbon front, primary buttons and the booking field.
- **Do** shade the ribbon's reverse with 45° hatching only: black on magenta, magenta on white.
- **Do** separate overlapping shapes on the magenta field with a field-colour gap, as her monogram does.
- **Do** size banner words from the ribbon width, so type and ribbon move together.
- **Do** change state by technique: dotwork on hover, inversion on press, a 2px dotted line 5px off for focus.
- **Do** give every photo a blurred placeholder in its exact box and reveal it with the fade-and-settle.
- **Do** make reduced motion a finished state: the full ribbon and the tied bow, drawn and still.
- **Do** keep every target at least 44px tall, and keep the first booking button inside the first phone screen from 320×640 up.

### Don't:
- **Don't** tint, lighten or gradient the magenta. Shading is hatching, never a derived tone.
- **Don't** put Fraktur on sentences, buttons or labels. It belongs to banner words, the phone menu and her name.
- **Don't** add soft or offset shadows, blur or rounded corners. The only halo is the zero-blur field-colour gap.
- **Don't** draw the ink outline on the ribbon anywhere but over paper.
- **Don't** use paper white as a card on black. Paper is a full section, for drawings.
- **Don't** add grunge texture, a masonry grid, a neon accent or stock clip-art. Her own drawings, skull girl included, are the only illustrations.
- **Don't** add a second authored animation. The ribbon unwinding and the bow tying are the moment; everything else is a quiet reveal.
