import Image from "next/image";

const socials = [
  {
    label: "Facebook",
    handle: "@lysdelamadoneagro",
    href: "https://www.facebook.com/lysdelamadoneagro",
    badgeClass: "bg-[#1877F2]",
    tileClass: "bg-feuille",
  },
  {
    label: "Instagram",
    handle: "@lysdelamadoneagro",
    href: "https://www.instagram.com/lysdelamadoneagro",
    badgeClass: "bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    tileClass: "",
    image: "/images/lien_insta.jpg",
  },
  {
    label: "TikTok",
    handle: "@lysdelamadoneagro",
    href: "https://www.tiktok.com/@lysdelamadoneagro",
    badgeClass: "bg-black",
    tileClass: "bg-tomate",
  },
];

export default function JoinUs() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl text-feuille sm:text-5xl">
          Rejoignez-nous
        </h2>
        <p className="mt-4 text-lg text-foreground/70">
          Suivez La Cuisinière sur les réseaux pour nos recettes, nos coulisses
          et nos producteurs.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex aspect-square flex-col justify-end overflow-hidden rounded-3xl p-5 text-white ${social.tileClass}`}
          >
            {social.image && (
              <Image
                src={social.image}
                alt={social.label}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(min-width: 640px) 33vw, 100vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
            <div className="relative flex items-center gap-3">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full text-base font-bold ${social.badgeClass}`}
              >
                {social.label[0]}
              </span>
              <div>
                <p className="text-base font-semibold">{social.label}</p>
                <p className="text-sm text-white/80">{social.handle}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
