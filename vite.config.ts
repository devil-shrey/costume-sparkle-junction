// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import catalogue from "./src/data/catalogue.json" with { type: "json" };

// Set GITHUB_PAGES=1 to produce a fully static site (dist/client) for GitHub Pages.
const isStatic = process.env["GITHUB_PAGES"] === "1";

const staticPages = [
  "/",
  "/about",
  "/contact",
  "/search",
  ...catalogue.categories.map((c) => `/category/${c.slug}`),
];

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this. The static (GitHub Pages) build uses the default entry so
    // the prerenderer can boot its own preview server.
    ...(isStatic ? {} : { server: { entry: "server" } }),
    ...(isStatic
      ? {
          prerender: { enabled: true, crawlLinks: true, autoSubfolderIndex: true },
          pages: staticPages.map((path) => ({ path, prerender: { enabled: true } })),
        }
      : {}),
  },
  ...(isStatic ? { nitro: { preset: "static" as const } } : {}),
});
