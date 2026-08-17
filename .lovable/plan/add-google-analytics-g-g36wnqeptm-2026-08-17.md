# Add Google Analytics (G-G36WNQEPTM)

Track page visits on the site, including page changes as visitors move between Home, Categories, Search, About and Contact.

## What gets added

1. **Analytics loader** — a small module (`src/lib/analytics.ts`) that:
   - Loads the Google gtag.js script for `G-G36WNQEPTM` once, in the browser only.
   - Sets up `gtag('config', ...)` with manual page-view sending, so single-page navigations aren't double-counted.
   - Exports a `trackPageView(path)` helper.
2. **Root wiring** — in `src/routes/__root.tsx`, initialise analytics after hydration and send a page view on every route change (subscribing to the router's navigation events). This keeps the site's static GitHub Pages build working, since everything runs client-side.

## Technical notes

- The measurement ID is a public/publishable value, hardcoded in the analytics module (no secret or backend needed) so the static Pages export keeps working.
- Script is injected client-side only (guarded against SSR/prerender) so the prerendered HTML stays unchanged and no analytics calls fire during build.
- No changes to catalogue data, layout, or styling.

## Verification

- Run the normal build and the `GITHUB_PAGES=1` static build to confirm both still pass.
- Check in the preview that the gtag script loads and a page-view event fires on navigation.
