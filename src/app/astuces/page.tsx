import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import CategoryFilter from "@/components/CategoryFilter";
import TipCard from "@/components/TipCard";
import { getPublishedTips } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Nos astuces | La Cuisinière",
  description:
    "Cuisson, conservation, nutrition : nos conseils pratiques pour bien utiliser vos produits La Cuisinière.",
};

export default async function AstucesPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}) {
  const { categorie } = await searchParams;
  const tips = await getPublishedTips();
  const categories = Array.from(
    new Set(tips.map((t) => t.category).filter((c): c is string => !!c)),
  ).sort();
  const visible = categorie ? tips.filter((t) => t.category === categorie) : tips;

  return (
    <>
      <section className="relative -mt-28 flex h-[380px] items-end overflow-hidden">
        <Image
          src="/images/heros1-carrousel-zerospesticide.jpg"
          alt="Astuces cuisine La Cuisinière"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
        <div className="relative z-10 w-full px-6 pb-10 sm:px-12">
          <Breadcrumb
            items={[{ label: "Accueil", href: "/" }, { label: "Nos astuces" }]}
          />
          <h1 className="mt-4 font-display text-5xl text-white sm:text-6xl">
            Nos astuces
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <CategoryFilter
          basePath="/astuces"
          categories={categories}
          active={categorie}
        />

        {visible.length === 0 ? (
          <p className="mt-16 text-center text-foreground/60">
            {tips.length === 0
              ? "Nos premières astuces arrivent bientôt."
              : "Aucune astuce dans cette catégorie pour le moment."}
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((tip) => (
              <TipCard key={tip.slug} tip={tip} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
