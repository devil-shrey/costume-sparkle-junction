import catalogue from "./catalogue.json";

/**
 * Everything editable (categories, costume names, images, shop details) lives in
 * `src/data/catalogue.json`. Images are referenced by filename; drop the file in
 * `src/assets/` and name it in the JSON — no code change needed.
 */

const assetModules = import.meta.glob("../assets/**/*.{jpg,jpeg,png,webp,svg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const normalizeKey = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");

const assetEntries = Object.entries(assetModules).map(([path, url]) => {
  const fileName = path.split("/").pop() ?? path;
  const extensionIndex = fileName.lastIndexOf(".");
  const baseName = extensionIndex >= 0 ? fileName.slice(0, extensionIndex) : fileName;

  return { fileName, baseName, url };
});

const assetsByFilename: Record<string, string> = Object.fromEntries(
  assetEntries.map(({ fileName, url }) => [normalizeKey(fileName), url]),
);

const assetsByBaseName: Record<string, string> = Object.fromEntries(
  assetEntries.map(({ baseName, url }) => [normalizeKey(baseName), url]),
);

const FALLBACK_IMAGE = assetEntries[0]?.url ?? "";

function resolveImage(filename?: string, fallback: string = FALLBACK_IMAGE): string {
  if (!filename) return fallback;

  const normalized = filename.trim();
  if (!normalized) return fallback;

  const candidateName = normalizeKey(normalized.split("/").pop()?.split("\\").pop() ?? normalized);

  return assetsByFilename[candidateName] ?? assetsByBaseName[candidateName] ?? fallback;
}


export type Costume = {
  name: string;
  image: string;
  category: string;
  categorySlug: string;
};

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  costumes: { name: string; image: string }[];
};

type RawCategory = {
  slug: string;
  name: string;
  tagline: string;
  image?: string;
  costumes: { name: string; image?: string }[];
};

export const shop = catalogue.shop;

export const categories: Category[] = (catalogue.categories as RawCategory[]).map((cat) => {
  const categoryImage = resolveImage(cat.image);
  return {
    slug: cat.slug,
    name: cat.name,
    tagline: cat.tagline,
    image: categoryImage,
    costumes: cat.costumes.map((item) => ({
      name: item.name,
      image: resolveImage(item.image ?? item.name, categoryImage),
    })),
  };
});

export const allCostumes: Costume[] = categories.flatMap((c) =>
  c.costumes.map((item) => ({
    name: item.name,
    image: item.image,
    category: c.name,
    categorySlug: c.slug,
  })),
);

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function searchCostumes(query: string): Costume[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return allCostumes.filter(
    (c) => c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q),
  );
}

export const WHATSAPP_NUMBER = shop.whatsappNumber;
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  shop.whatsappMessage,
)}`;
