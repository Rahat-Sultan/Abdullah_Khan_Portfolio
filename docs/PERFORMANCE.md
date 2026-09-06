# Performance

- Server Components for static resume-backed sections
- Client islands: theme, header menu, loader, starfield, project cards, contact form
- Canvas starfield capped (~160 particles), DPR max 2, no particle library bundle
- Pause/reset card slideshows off-screen (`IntersectionObserver`)
- `next/font` with `display: swap`
- Images (when uploaded): Next.js `<Image>` + reasonable sizes; don’t ship original camera files to the card
- Dynamic-import starfield later if Lighthouse JS is heavy
- Home featured projects: only 3 most recently updated rows
