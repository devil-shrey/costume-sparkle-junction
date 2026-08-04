import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { getCategory, WHATSAPP_LINK } from "@/data/costumes";
import { CostumeCard } from "@/components/costume-card";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Category unavailable — Costume Junctions" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.category.name} Costumes on Rent — Costume Junctions`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.category.tagline },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.category.tagline },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8">
      <nav className="text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>{" "}
        / <span className="text-foreground">{category.name}</span>
      </nav>

      <header className="mt-4 rounded-3xl bg-festive-gradient px-6 py-8 text-primary-foreground shadow-soft">
        <h1 className="text-3xl md:text-4xl">{category.name} Costumes</h1>
        <p className="mt-2 max-w-2xl opacity-95">{category.tagline}</p>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex rounded-full bg-background px-5 py-2.5 font-semibold text-primary"
        >
          Check availability on WhatsApp
        </a>
      </header>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {category.costumes.map((item: { name: string; image: string }) => (
          <CostumeCard key={item.name} name={item.name} image={item.image} />
        ))}
      </div>
    </div>
  );
}
