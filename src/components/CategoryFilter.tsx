import Link from "next/link";

export default function CategoryFilter({
  basePath,
  categories,
  active,
}: {
  basePath: string;
  categories: string[];
  active?: string;
}) {
  if (categories.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Link
        href={basePath}
        className={`rounded-full border-2 px-6 py-2.5 text-base font-semibold transition-colors ${
          !active
            ? "border-feuille bg-feuille text-white"
            : "border-feuille/40 text-feuille hover:border-feuille"
        }`}
      >
        Toutes
      </Link>
      {categories.map((category) => (
        <Link
          key={category}
          href={`${basePath}?categorie=${encodeURIComponent(category)}`}
          className={`rounded-full border-2 px-6 py-2.5 text-base font-semibold transition-colors ${
            active === category
              ? "border-feuille bg-feuille text-white"
              : "border-feuille/40 text-feuille hover:border-feuille"
          }`}
        >
          {category}
        </Link>
      ))}
    </div>
  );
}
