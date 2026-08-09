# GitHub Pages shows README.md instead of website

## Problem
The published GitHub Pages site is rendering the repository README.md instead of the built costume-rental site.

## Root cause
GitHub Pages is probably configured to deploy from a branch (e.g., `gh-pages` or `main` root) rather than from the GitHub Actions artifact. When the Pages source is set to a branch, GitHub looks for an `index.html` in that branch's root; if it doesn't find one, it falls back to rendering `README.md`.

## Plan
1. **Confirm GitHub Pages source setting** — Verify in the repo that **Settings → Pages → Source** is set to **GitHub Actions**, not a branch. If it is set to a branch, change it to GitHub Actions.
2. **Verify the workflow artifact is valid** — Check the latest workflow run for the `deploy-pages` job. Confirm the artifact uploaded by `actions/upload-pages-artifact` contains `dist/client/index.html` at the root.
3. **Check the custom domain DNS** — Since `public/CNAME` is `thecostumejunctions.in`, confirm the domain DNS points to GitHub Pages (A records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, or a `www` CNAME to `<user>.github.io`).
4. **Ensure no conflicting Pages branch** — If a `gh-pages` branch exists and is selected as the source, Pages will continue to serve that branch. Delete or deselect it.
5. **Force a redeploy after fixing the source** — Push a small change or re-run the workflow once the Pages source is set to GitHub Actions so the deploy job writes the new artifact.

## What we will not change
The build already outputs `dist/client/index.html` and the workflow copies it correctly. The issue is almost certainly GitHub-side configuration, not code.
