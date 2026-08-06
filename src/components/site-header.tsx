import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ChevronDown, MapPin, Menu, Search, Sparkles, X } from "lucide-react";
import { categories, shop } from "@/data/costumes";

export function SiteHeader() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  function onSearch(e: FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setMenuOpen(false);
    navigate({ to: "/search", search: { q: query.trim() } });
  }

  return (
    <header className="sticky top-0 z-50 border-b-4 border-primary bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
          <span className="grid h-11 w-11 place-items-center rounded-full bg-festive-gradient text-primary-foreground shadow-glow">
            <Sparkles className="h-6 w-6" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-xl text-primary sm:text-2xl">
              Costume Junctions
            </span>
            <span className="block text-xs tracking-wide text-muted-foreground">
              {shop.domain}
            </span>
          </span>
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
          className="ml-auto rounded-md border border-border p-2 text-foreground md:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <nav
          className={`${menuOpen ? "flex" : "hidden"} order-last w-full flex-col gap-2 pb-2 md:order-none md:ml-auto md:flex md:w-auto md:flex-row md:items-center md:gap-5 md:pb-0`}
        >
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="font-semibold text-foreground transition-colors hover:text-primary"
            activeProps={{ className: "text-primary" }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>

          <div
            className="relative md:py-2"
            onMouseEnter={() => setCatOpen(true)}
            onMouseLeave={() => setCatOpen(false)}
          >
            <button
              type="button"
              onClick={() => setCatOpen((o) => !o)}
              className="flex items-center gap-1 font-semibold text-foreground transition-colors hover:text-primary"
            >
              Categories <ChevronDown className="h-4 w-4" />
            </button>
            {catOpen && (
              <ul className="z-50 mt-2 w-full rounded-xl border border-border bg-popover p-2 shadow-soft md:absolute md:left-0 md:top-full md:w-60">
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      to="/category/$slug"
                      params={{ slug: cat.slug }}
                      onClick={() => {
                        setCatOpen(false);
                        setMenuOpen(false);
                      }}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="font-semibold text-foreground transition-colors hover:text-primary"
            activeProps={{ className: "text-primary" }}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="font-semibold text-foreground transition-colors hover:text-primary"
            activeProps={{ className: "text-primary" }}
          >
            Contact Us
          </Link>

          <form onSubmit={onSearch} className="relative md:w-56">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="Search costumes..."
              aria-label="Search costumes"
              className="w-full rounded-full border-2 border-border bg-background py-2 pl-4 pr-10 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-1 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
