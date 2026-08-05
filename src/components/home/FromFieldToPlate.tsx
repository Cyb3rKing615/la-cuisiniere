import Image from "next/image";
import Link from "next/link";

export default function FromFieldToPlate() {
  return (
    <section className="relative flex h-[440px] items-center overflow-hidden">
      <Image
        src="/images/heros1-carrousel-culturetomate.webp"
        alt="Récolte de tomates chez nos producteurs béninois"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl text-white">
          <h2 className="font-display text-4xl text-jaune sm:text-5xl">
            Du champ à l&apos;assiette
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Un geste pour nos producteurs, une tomate d&apos;ici dans chaque
            pot. Découvrez comment nous soutenons la filière locale, de la
            récolte à votre cuisine.
          </p>
          <Link
            href="/notre-histoire"
            className="mt-6 inline-block rounded-full bg-feuille px-8 py-4 text-base font-bold uppercase tracking-wide hover:bg-feuille-dark"
          >
            Découvrir
          </Link>
        </div>
      </div>
    </section>
  );
}
