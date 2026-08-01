import mythological from "@/assets/cat-mythological.jpg";
import kids from "@/assets/cat-kids.jpg";
import royal from "@/assets/cat-royal.jpg";
import professions from "@/assets/cat-professions.jpg";
import animals from "@/assets/cat-animals.jpg";
import dance from "@/assets/cat-dance.jpg";

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
  costumes: { name: string }[];
};

export const categories: Category[] = [
  {
    slug: "mythological",
    name: "Mythological",
    tagline: "Gods, goddesses and epic characters for Janmashtami, Ramleela and school plays.",
    image: mythological,
    costumes: [
      { name: "Little Krishna" },
      { name: "Radha Rani" },
      { name: "Lord Rama" },
      { name: "Goddess Durga" },
      { name: "Hanuman Ji" },
      { name: "Lord Shiva" },
      { name: "Sita Maiya" },
      { name: "Narad Muni" },
    ],
  },
  {
    slug: "kids-fancy-dress",
    name: "Kids Fancy Dress",
    tagline: "Bright, comfy and camera-ready outfits for every fancy dress competition.",
    image: kids,
    costumes: [
      { name: "Superhero Cape Set" },
      { name: "Fairy Princess" },
      { name: "Happy Clown" },
      { name: "Space Astronaut" },
      { name: "Pirate Captain" },
      { name: "Magician Kid" },
      { name: "Rainbow Ballerina" },
      { name: "Little Chef Baker" },
    ],
  },
  {
    slug: "royal-historical",
    name: "Royal & Historical",
    tagline: "Maharaja sherwanis, queenly robes and regal turbans with full jewellery.",
    image: royal,
    costumes: [
      { name: "Maharaja Sherwani" },
      { name: "Rajput Queen" },
      { name: "Mughal Emperor" },
      { name: "Royal Guard" },
      { name: "Shivaji Maharaj" },
      { name: "Nawab of Awadh" },
      { name: "Court Dancer" },
      { name: "Rani Laxmibai" },
    ],
  },
  {
    slug: "professions",
    name: "Professions",
    tagline: "Doctor, police, chef, farmer and more — perfect for community helper themes.",
    image: professions,
    costumes: [
      { name: "Doctor Coat Set" },
      { name: "Police Officer" },
      { name: "Master Chef" },
      { name: "Indian Farmer" },
      { name: "Fire Fighter" },
      { name: "Air Hostess" },
      { name: "Army Soldier" },
      { name: "Postman" },
    ],
  },
  {
    slug: "animals-birds",
    name: "Animals & Birds",
    tagline: "Soft, playful animal suits sized for toddlers to teens.",
    image: animals,
    costumes: [
      { name: "Roaring Lion" },
      { name: "Dancing Peacock" },
      { name: "Baby Elephant" },
      { name: "Butterfly Wings" },
      { name: "Jungle Tiger" },
      { name: "Cheeky Monkey" },
      { name: "Parrot Suit" },
      { name: "Honey Bee" },
    ],
  },
  {
    slug: "dance-folk",
    name: "Dance & Folk",
    tagline: "Classical and folk costumes with matching jewellery and accessories.",
    image: dance,
    costumes: [
      { name: "Bharatanatyam Set" },
      { name: "Kathak Anarkali" },
      { name: "Garba Chaniya Choli" },
      { name: "Bhangra Kurta" },
      { name: "Kuchipudi Costume" },
      { name: "Lavani Nauvari" },
      { name: "Bihu Mekhela" },
      { name: "Odissi Costume" },
    ],
  },
];

export const allCostumes: Costume[] = categories.flatMap((c) =>
  c.costumes.map((item) => ({
    name: item.name,
    image: c.image,
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

export const WHATSAPP_NUMBER = "919876543210";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Costume Junctions! I would like to enquire about a costume on rent.",
)}`;
