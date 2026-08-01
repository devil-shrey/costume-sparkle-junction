import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/data/costumes";

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Costume Junctions on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-whatsapp px-4 py-3 font-semibold text-whatsapp-foreground shadow-soft transition-transform hover:scale-105"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp Us</span>
    </a>
  );
}
