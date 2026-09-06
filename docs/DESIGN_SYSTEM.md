# Design system

## Personality

Premium digital-marketer site, not a neon gaming template. Glow is reserved for hero, cards, and primary CTAs.

## Dark (default)

- Deep wine/black (`#070308`)
- Red nebula accents (`#ff4d6d`, `#c81d4a`)
- Soft glass panels, thin rose borders
- Star particles in pale pink-white

## Light

- Lavender mist background (`#f4f0ff`)
- Violet/pink accents (`#7c3aed`, `#db2777`)
- Glittery pointer glow (cyan + pink wash in the canvas)
- Same layout; different tokens — not inverted dark mode

## Type

- Display: **Orbitron** (`--font-display`)
- Body: **Outfit** (`--font-body`)

## Theme toggle

Compact pill in the header. On hover/focus-within it **spreads** to reveal Dark / Light. On viewports ≤720px both options stay visible (no hover dependency).

## Motion

- Loader ~1.4s, skipped down to ~200ms when `prefers-reduced-motion`
- Project card glow + lift on hover
- Multi-image rotate only while the card is viewed; reset to slide 1 on leave or when the cycle ends
- Starfield pauses extra motion when reduced-motion is set
