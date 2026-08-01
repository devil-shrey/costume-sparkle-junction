type Props = {
  name: string;
  image: string;
  caption?: string;
};

export function CostumeCard({ name, image, caption }: Props) {
  return (
    <figure className="group overflow-hidden rounded-2xl border-2 border-border bg-card shadow-soft transition-transform hover:-translate-y-1">
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          width={800}
          height={1000}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <figcaption className="px-3 py-3 text-center">
        <p className="font-display text-base text-card-foreground">{name}</p>
        {caption && <p className="text-xs text-muted-foreground">{caption}</p>}
      </figcaption>
    </figure>
  );
}
