"use client";

import Image from "next/image";
import Link from "next/link";
import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

type Slide = {
  tabLabel: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  imageLeft: string;
  imageRight: string;
};

const slides: Slide[] = [
  {
    tabLabel: "Origine locale",
    title: "D'un champ béninois à votre table.",
    subtitle:
      "La Cuisinière transforme la tomate locale en sauces et purées prêtes à l'emploi — pour cuisiner simple, toute l'année, tout en soutenant les producteurs d'ici.",
    ctaLabel: "Découvrir nos produits",
    ctaHref: "/nos-produits",
    imageLeft: "/images/heros1-carrousel-culturetomate.webp",
    imageRight: "/images/heros2-carrousel-culturetomate.jpg",
  },
  {
    tabLabel: "100% naturel",
    title: "Une tomate 100% naturelle, sans conservateurs.",
    subtitle:
      "Des sauces préparées simplement, à partir de tomates béninoises sélectionnées avec soin, pour un goût qui ne dépend jamais du calendrier.",
    ctaLabel: "Découvrir notre histoire",
    ctaHref: "/notre-histoire",
    imageLeft: "/images/heros1-carrousel-zerospesticide.jpg",
    imageRight: "/images/heros2-carousel-zerospesticide.jpg",
  },
  {
    tabLabel: "Nos recettes",
    title: "Nos idées recettes, prêtes à cuisiner.",
    subtitle:
      "Des recettes simples et gourmandes, pensées pour nos sauces et purées — pour cuisiner local, toute l'année.",
    ctaLabel: "Découvrir nos recettes",
    ctaHref: "/recettes",
    imageLeft: "/images/heros1-carrousel-nosrecettes.jpg",
    imageRight: "/images/heros2-carrousel-nosrecettes.jpg",
  },
];

const AUTOPLAY_MS = 3500;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [playing, index]);

  const slide = slides[index];

  function goTo(nextIndex: number) {
    setIndex((nextIndex + slides.length) % slides.length);
  }

  return (
    <section className="relative -mt-28 h-[640px] max-h-[90vh] w-full overflow-hidden bg-feuille-dark text-white">
      <div className="absolute inset-0 flex">
        <div className="relative h-full w-1/2">
          <Image
            src={slide.imageLeft}
            alt=""
            fill
            priority={index === 0}
            className="object-cover"
            sizes="50vw"
          />
        </div>
        <div className="relative h-full w-1/2">
          <Image
            src={slide.imageRight}
            alt=""
            fill
            priority={index === 0}
            className="object-cover"
            sizes="50vw"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/50 to-transparent" />

      <button
        aria-label="Diapositive précédente"
        onClick={() => goTo(index - 1)}
        className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-xl hover:bg-white/30 sm:left-6"
      >
        ←
      </button>
      <button
        aria-label="Diapositive suivante"
        onClick={() => goTo(index + 1)}
        className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-xl hover:bg-white/30 sm:right-6"
      >
        →
      </button>

      <div className="relative z-10 flex h-full max-w-2xl flex-col justify-center gap-6 px-6 sm:px-12">
        <h1 className="font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
          {slide.title}
        </h1>
        <p className="max-w-xl text-base text-white/90 sm:text-lg">
          {slide.subtitle}
        </p>
        <Link
          href={slide.ctaHref}
          className="w-fit rounded-full bg-tomate px-8 py-4 text-base font-bold uppercase tracking-wide hover:bg-tomate-dark"
        >
          {slide.ctaLabel}
        </Link>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-6 px-6 pb-5 text-sm font-semibold uppercase tracking-wide sm:px-12">
        {slides.map((s, i) => (
          <button
            key={s.tabLabel}
            onClick={() => goTo(i)}
            className={`flex flex-col items-start gap-2 pb-1 transition-colors ${
              i === index ? "text-jaune" : "text-white/60 hover:text-white"
            }`}
          >
            {s.tabLabel}
            <span className="h-1.5 w-14 overflow-hidden rounded-full bg-white/25 sm:w-20">
              {i === index && (
                <span
                  key={index}
                  className="block h-full rounded-full bg-tomate"
                  style={{
                    animation: `carousel-progress ${AUTOPLAY_MS}ms linear forwards`,
                    animationPlayState: playing ? "running" : "paused",
                  }}
                />
              )}
            </span>
          </button>
        ))}
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Mettre en pause" : "Lancer la lecture"}
          className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/20 normal-case hover:bg-white/30"
        >
          {playing ? (
            <Pause className="h-3.5 w-3.5 fill-current" />
          ) : (
            <Play className="h-3.5 w-3.5 fill-current" />
          )}
        </button>
      </div>
    </section>
  );
}
