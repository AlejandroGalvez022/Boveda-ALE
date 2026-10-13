---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["villas.html","villa.html","contact.html"]
---

## Scope

Home page of the «Isla Blanca» Framer template (holiday villa rentals, Balearics demo). Mode: Persuade. Sibling pages built in the same world: villas.html (listing), villa.html (detail), contact.html (booking request).

## Audience, job, action

Template buyer (owner/manager of luxury holiday villas with pools, or the studio building for them) judging the Marketplace preview; inside it, a traveller choosing a villa. Action: step into a villa, then send a booking request. The buyer must think «my villas will look like this — luxurious, warm, bookable».

## Proof and content

Six fictional Balearic villas (Ibiza, Formentera, Mallorca, Menorca) with real Unsplash photography (assets/photos, credits and provenance in assets/photos/CREDITS.md). Sample facts and season prices are demo content, never claims. No testimonials.

## Constraints

Plain flex/grid HTML/CSS importable with HTML to Framer; English; no Booking/Airbnb search UI, no black-and-gold luxury, no cold grey minimalism; one authored movement only. Content is never hidden waiting for an animation.

## User direction after the first build (13-oct)

«Más espectacular, me parece súper fácil»: the user asked for award-level work and chose two moves: stepping in through the arch, and everything full screen and full width, on all four pages. Calibrated against Awwwards hospitality winners (Faith Ibiza HM Sep-2026: arch that opens to full screen; White Desert SOTD Sep-2026: one giant word edge to edge; Tengile SOTD Oct-2026: huge display type over full-bleed imagery). His standing taste: full-screen sections, full width, one dominant brand colour in full, a slow floating capsule menu, wide text (about 40em), no template ornaments.

## Direction contract

THESIS: You step into the house. The site opens on a whitewashed Balearic wall at noon with one villa seen through an arched opening; scrolling opens the arch until the house fills the screen, the pool waiting at its foot. It refuses the drone-photo-plus-date-bar default and any boxed, centred layout.

OWN-WORLD: Cool lime-wash white (#F6F6F1, never cream) with a crisp blue-violet pergola shadow; Ibiza indigo (#1E3F8F) as the one dominant full field (booking steps, booking tile, footer); bougainvillea (#C42B76) only for the single action; the pool is Lustre caustics under a stone coping. Young Serif at display scale (up to ~9rem, a 19vw wordmark in the footer), Hanken Grotesk for text, lining tabular figures. Ceramic name tiles, doorway-sized arches, a fixed credits strip, a three-cell season band, a floating capsule menu and capsule filter.

STORY: Visitor sees one real villa through a doorway, steps in by scrolling, understands «six whitewashed villas with private pools, rented by request», compares them screen by screen, and sends one request. Every section ends in one destination; the ask appears once per page.

FIRST VIEWPORT: Full-screen whitewash with a crisp pergola shadow on the right. «Six white houses» top-left and «by the Balearic sea.» bottom-right at ~7vw; between them a centred arch (~25vw × 47svh) holding Can Sal Blanca with its name tile at the base; a one-sentence lede at left, «€480 / 6 / 4» at right. Capsule menu with the bougainvillea «Request to book». Scrolling opens the arch to the full screen while the words part; the tile travels to the lower-left corner and «Step inside» appears.

FORM: «La cal de Ibiza», position 1 on the ordered list (chosen as the pick card), seed key 05a5d8bb; raised on user request with the full-screen arch entrance (Faith Ibiza) and edge-to-edge display scale (White Desert, Tengile). Raises carried: credits strip, light reserved for pool and booking, season band, figures in fixed places, villa deep links that prefill the booking request, no dead ends.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Memorable moment

Scrolling opens the arch until you are standing in the house, the name tile riding with you to the corner.

## Unresolved

Template name for the Marketplace (working name «Isla Blanca»); booking engine link vs request form as default; photo licence for a sold template; how the arch entrance is rebuilt in Framer (scroll transform or code component).
