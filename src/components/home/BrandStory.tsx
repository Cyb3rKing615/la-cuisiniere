import Image from "next/image";
import Link from "next/link";

export default function BrandStory() {
  return (
    <section className="bg-tomate text-creme">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="font-display text-4xl leading-tight sm:text-5xl">
            La tomate béninoise mérite d&apos;être sur toutes les tables,
            toute l&apos;année.
          </h2>
          <p className="mt-6 text-white/90">
            Ici, à Cotonou, nous transformons les tomates cultivées
            localement en sauces prêtes à l&apos;emploi — pour que chaque
            foyer puisse retrouver ce goût, même en dehors de la saison.
            Parce qu&apos;une bonne sauce tomate ne devrait jamais dépendre
            du calendrier.
          </p>
          <p className="mt-4 text-white/90">
            Derrière chaque pot de La Cuisinière, il y a un agriculteur
            béninois dont nous transformons la récolte plutôt que de la
            laisser se perdre. Choisir La Cuisinière, c&apos;est choisir de
            soutenir une chaîne locale, du champ à votre assiette.
          </p>
          <Link
            href="/notre-histoire"
            className="mt-8 inline-block rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wide text-tomate hover:bg-creme"
          >
            Découvrir notre histoire
          </Link>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-sm">
          <Image
            src="/images/Boite-sauce-1.jpg"
            alt="Sauce Tomate La Cuisinière"
            fill
            className="rounded-3xl object-cover shadow-2xl"
            sizes="(min-width: 1024px) 24rem, 80vw"
          />
        </div>
      </div>
    </section>
  );
}
