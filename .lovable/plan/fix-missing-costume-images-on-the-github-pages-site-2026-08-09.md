# Fix missing costume images on the GitHub Pages site

The site loads on `thecostumejunctions.in`, but the costume photos don't appear.

## Most likely cause

Many image files carry spaces and mixed capitalisation in their names:

```text
src/assets/Accessories/bird wings.jpg
src/assets/Accessories/butterfly Wings.jpg
src/assets/Accessories/kathhakali mask.jpg
src/assets/Superhero Kids/Batman.jpg     <- folder name also has a space
```

Folder and file names with spaces survive into the published asset URLs. GitHub
Pages serves those inconsistently (encoded vs. raw space), which produces 404s
for exactly those images while the rest of the page renders fine. This is the
prime suspect, but it will be confirmed against the actual static build output
before the rename is made.

## Steps

1. **Confirm the failure mode.** Run the static build (`GITHUB_PAGES=1`), list the
   emitted image filenames in `dist/client`, and open a prerendered category page
   to read the real `<img src>` values. This tells us definitively whether the
   URLs contain spaces, whether the images were emitted at all, and whether any
   path is wrong for a root-domain deploy.
2. **Normalise asset names.** Rename the three asset folders and every image file
   to lowercase, hyphenated, space-free names (`accessories/bird-wings.jpg`,
   `superhero-kids/batman.jpg`, and so on).
3. **Update `catalogue.json`.** Point every `image` field at the new filenames.
   Costume display names stay human-readable and unchanged — only the file
   references change. Also tidy the display names that are currently raw file
   labels (`wings_`, `bedhiya`) into proper title case.
4. **Harden the image lookup.** `src/data/costumes.ts` currently resolves an image
   by the costume's *name* first and only falls back to the `image` field. Flip
   that so the explicit `image` filename wins, and make lookups
   case/space-insensitive so a future filename mismatch degrades to the category
   image instead of silently showing the wrong picture.
5. **Verify.** Re-run the static build and confirm every prerendered page
   references images that exist in `dist/client`, with no spaces in any URL.

## Technical notes

- Custom domain means the site is served from the domain root, so no Vite `base`
  change is needed; that is not the issue here.
- `.nojekyll` is already created by the workflow, so underscore-prefixed build
  directories are not being stripped.
- No layout, styling, or content changes — this is purely asset naming and the
  lookup that maps catalogue entries to bundled files.
