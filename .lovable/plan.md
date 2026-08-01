# Move catalogue content into a single JSON file

Today the categories, costume names and image references live inside a TypeScript file (`src/data/costumes.ts`). The goal: one JSON file that anyone can edit to add or change categories and costumes, with no code changes.

## What changes

- New `src/data/catalogue.json` holds everything editable:
  - shop contact details (WhatsApp number, phone, email, address) so the footer/buttons stay in sync
  - list of categories: `slug`, `name`, `tagline`, `image`
  - each costume: `name` and an optional `image` of its own (falls back to the category image when omitted)
- Images are referenced by filename, e.g. `"image": "cat-kids.jpg"`. Files stay in `src/assets/`. Drop a new photo in that folder, name it in the JSON, and it appears — no import statements to write.
- `src/data/costumes.ts` becomes a thin loader: it reads the JSON, resolves image filenames to real bundled assets, and keeps exporting the same `categories`, `allCostumes`, `getCategory`, `searchCostumes`, `WHATSAPP_LINK` values. All pages and components keep working untouched.
- Per-costume images become supported (currently every costume in a category shares one photo), so future real photos can be added one at a time in the JSON.

## Technical notes

- Image resolution uses Vite's `import.meta.glob('@/assets/*.{jpg,png,webp}', { eager: true, import: 'default' })` to build a filename to URL map at build time. A missing/unknown filename falls back to the category image, then to a placeholder, so a typo never breaks the build.
- JSON is imported statically, so it is type-checked against the existing `Category`/`Costume` types and prerendered with the rest of the site.
- No behaviour, layout, or styling changes; routes and SEO metadata stay as they are.
