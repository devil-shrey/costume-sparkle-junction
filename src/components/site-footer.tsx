import { Link } from "@tanstack/react-router";
import { categories, shop, WHATSAPP_LINK } from "@/data/costumes";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t-4 border-primary bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="font-display text-xl text-primary">Costume Junctions</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Your neighbourhood costume rental store — thousands of outfits for festivals, plays,
            fancy dress competitions and theme parties.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">
                Contact Us
              </Link>
            </li>
            <li>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="hover:text-primary">
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg">Categories</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  to="/category/$slug"
                  params={{ slug: cat.slug }}
                  className="hover:text-primary"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg">Reach Us</h3>
          <address className="mt-3 space-y-2 text-sm not-italic text-muted-foreground">
            <p>{shop.address}</p>
            <p>
              <a href={`tel:${shop.phone.replace(/\s/g, "")}`} className="hover:text-primary">
                {shop.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${shop.email}`} className="hover:text-primary">
                {shop.email}
              </a>
            </p>
            <p>{shop.hours}</p>
          </address>
        </div>
      </div>

      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} thecostumejunctions.in · All rights reserved
      </div>
    </footer>
  );
}
