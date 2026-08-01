import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Costume Junctions" },
      {
        name: "description",
        content:
          "Costume Junctions has been renting festival, theatre and fancy dress costumes to families and schools for over 15 years.",
      },
      { property: "og:title", content: "About Costume Junctions" },
      {
        property: "og:description",
        content: "15+ years of costume rentals for festivals, schools and theatre groups.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-10">
      <h1 className="text-3xl text-primary md:text-4xl">About Costume Junctions</h1>
      <div className="mt-5 space-y-4 text-base leading-relaxed text-foreground">
        <p>
          Costume Junctions started in 2009 as a small tailoring corner that stitched Krishna
          dresses for a local school play. Fifteen years later we stock over 3,000 costumes across
          mythological, historical, folk dance, professions, animals and kids fancy dress themes.
        </p>
        <p>
          Every outfit is washed, ironed and packed with its accessories — crowns, jewellery,
          weapons, wigs and footwear — so you collect one bag and walk straight onto the stage.
        </p>
        <p>
          We work with schools, housing societies, theatre groups, dance academies and event
          planners across the city, and we ship pan-India for bulk bookings.
        </p>
      </div>

      <dl className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { k: "3,000+", v: "Costumes in stock" },
          { k: "15 years", v: "Serving the city" },
          { k: "All sizes", v: "Toddler to adult XXL" },
        ].map((s) => (
          <div key={s.k} className="rounded-2xl border-2 border-border bg-card p-5 text-center">
            <dt className="font-display text-2xl text-primary">{s.k}</dt>
            <dd className="text-sm text-muted-foreground">{s.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
