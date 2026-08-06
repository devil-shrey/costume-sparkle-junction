import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-costume-shop.jpg";
import { categories, WHATSAPP_LINK } from "@/data/costumes";
import { CostumeCard } from "@/components/costume-card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Costume Junctions — Costume Rentals for Every Occasion" },
      {
        name: "description",
        content:
          "Rent mythological, fancy dress, royal, folk dance and animal costumes at Costume Junctions. Browse by category and book on WhatsApp for any occasion.",
      },
      { property: "og:title", content: "Costume Junctions — Costume Rentals for Every Occasion" },
      {
        property: "og:description",
        content: "Thousands of costumes on rent for festivals, plays, parties and fancy dress competitions.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pt-8">
        <div className="overflow-hidden rounded-3xl border-4 border-primary bg-festive-gradient shadow-soft">
          <div className="grid items-center gap-6 md:grid-cols-2">
            <div className="p-8 text-primary-foreground md:p-10">
              <p className="inline-flex items-center gap-2 rounded-full bg-background/20 px-3 py-1 text-sm font-semibold">
                <CalendarDays className="h-4 w-4" /> Upcoming Festival
              </p>
              <h1 className="mt-4 text-4xl leading-tight md:text-5xl">
                Navratri &amp; Garba Nights are here!
              </h1>
              <p className="mt-3 max-w-md text-base opacity-95">
                Book your chaniya choli, kediyu and dandiya accessories early. Fresh stock, all
                sizes, ironed and ready — nine nights of colour sorted.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/category/$slug"
                  params={{ slug: "dance-folk" }}
                  className="inline-flex items-center gap-2 rounded-full bg-background px-5 py-3 font-semibold text-primary shadow-soft"
                >
                  Shop Festival Looks <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground px-5 py-3 font-semibold"
                >
                  Book on WhatsApp
                </a>
              </div>
            </div>
            <img
              src={festivalHero}
              alt="Navratri Garba celebration with colourful costumes"
              width={1600}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {categories.map((cat) => (
        <section key={cat.slug} className="mx-auto max-w-6xl px-4 pt-14">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-dashed border-border pb-3">
            <div>
              <h2 className="text-2xl text-primary md:text-3xl">{cat.name}</h2>
              <p className="text-sm text-muted-foreground">{cat.tagline}</p>
            </div>
            <Link
              to="/category/$slug"
              params={{ slug: cat.slug }}
              className="inline-flex items-center gap-1 font-semibold text-accent-foreground hover:text-primary"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
            {cat.costumes.slice(0, 4).map((item) => (
              <CostumeCard key={item.name} name={item.name} image={item.image} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
