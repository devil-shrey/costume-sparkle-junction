import catalogue from "./catalogue.json";

/**
 * Everything editable (categories, costume names, images, shop details) lives in
 * `src/data/catalogue.json`. Images are referenced by filename; drop the file in
 * `src/assets/` and name it in the JSON — no code change needed.
 */

const assetModules = import.meta.glob("../assets/*.{jpg,jpeg,png,webp,svg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const assetsByFilename: Record<string, string> = Object.fromEntries(
  Object.entries(assetModules).map(([path, url]) => [path.split("/").pop() as string, url]),
);

const FALLBACK_IMAGE = Object.values(assetsByFilename)[0] ?? "";

function resolveImage(filename?: string, fallback: string = FALLBACK_IMAGE): string {
  if (!filename) return fallback;
  return assetsByFilename[filename] ?? fallback;
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
      image: resolveImage(item.image, categoryImage),
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
