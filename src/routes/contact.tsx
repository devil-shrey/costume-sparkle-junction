import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { shop, WHATSAPP_LINK } from "@/data/costumes";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Costume Junctions" },
      {
        name: "description",
        content:
          "Call, email or WhatsApp Costume Junctions to check costume availability and book your rental.",
      },
      { property: "og:title", content: "Contact Costume Junctions" },
      {
        property: "og:description",
        content: "Reach us on WhatsApp, phone or visit our MG Road store.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-10">
      <h1 className="text-3xl text-primary md:text-4xl">Contact Us</h1>
      <p className="mt-2 text-muted-foreground">
        The fastest way to check availability is WhatsApp — send us the costume name and the date
        you need it.
      </p>

      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-semibold text-whatsapp-foreground shadow-soft"
      >
        <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
      </a>

      <ul className="mt-8 space-y-4">
        {[
          { icon: MapPin, label: shop.address },
          { icon: Phone, label: shop.phone, href: `tel:${shop.phone.replace(/\s/g, "")}` },
          { icon: Mail, label: shop.email, href: `mailto:${shop.email}` },
          { icon: Clock, label: shop.hours },
        ].map(({ icon: Icon, label, href }) => (
          <li
            key={label}
            className="flex items-center gap-3 rounded-2xl border-2 border-border bg-card p-4"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
              <Icon className="h-5 w-5" />
            </span>
            {href ? (
              <a href={href} className="font-medium hover:text-primary">
                {label}
              </a>
            ) : (
              <span className="font-medium">{label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
