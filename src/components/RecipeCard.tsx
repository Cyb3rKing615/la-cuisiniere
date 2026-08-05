import Image from "next/image";
import Link from "next/link";
import type { NotionRecipe } from "@/lib/notion";

export default function RecipeCard({ recipe }: { recipe: NotionRecipe }) {
  const meta = [
    recipe.difficulty,
    recipe.prepTimeMinutes ? `${recipe.prepTimeMinutes} min` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <Link
      href={`/recettes/${recipe.slug}`}
      className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] bg-creme-deep">
        {recipe.photo && (
          <Image
            src={recipe.photo}
            alt={recipe.title}
            fill
            unoptimized
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg leading-snug text-foreground">
          {recipe.title}
        </h3>
        {meta && (
          <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-feuille">
            {meta}
          </p>
        )}
      </div>
    </Link>
  );
}
