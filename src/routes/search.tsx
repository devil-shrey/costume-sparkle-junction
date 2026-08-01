import { createFileRoute, Link } from "@tanstack/react-router";
import { searchCostumes } from "@/data/costumes";
import { CostumeCard } from "@/components/costume-card";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search["q"] === "string" ? (search["q"] as string) : "",
  }),
  head: () => ({
    meta: [
      { title: "Search Costumes — Costume Junctions" },
      {
        name: "description",
        content: "Search the Costume Junctions rental catalogue by costume or category name.",
      },
      { property: "og:title", content: "Search Costumes — Costume Junctions" },
      { property: "og:description", content: "Find the costume you need on rent." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const results = searchCostumes(q);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8">
      <h1 className="text-3xl text-primary">Search results</h1>
      <p className="mt-2 text-muted-foreground">
        {q ? (
          <>
            {results.length} costume{results.length === 1 ? "" : "s"} found for{" "}
            <span className="font-semibold text-foreground">“{q}”</span>
          </>
        ) : (
          "Type a costume or category name in the search box above."
        )}
      </p>

      {results.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {results.map((item) => (
            <CostumeCard
              key={`${item.categorySlug}-${item.name}`}
              name={item.name}
              image={item.image}
              caption={item.category}
            />
          ))}
        </div>
      ) : (
        q && (
          <div className="mt-10 rounded-2xl border-2 border-dashed border-border p-10 text-center">
            <p className="font-display text-lg">No costume matched that search.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different word, or{" "}
              <Link to="/" className="font-semibold text-primary">
                browse all categories
              </Link>
              .
            </p>
          </div>
        )
      )}
    </div>
  );
}
