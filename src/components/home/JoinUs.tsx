import Image from "next/image";
import { IconFacebook, IconInstagram, IconTiktok } from "@/components/icons";

const socials = [
  {
    label: "Facebook",
    handle: "@lysdelamadoneagro",
    href: "https://www.facebook.com/lysdelamadoneagro",
    icon: IconFacebook,
    badgeClass: "bg-[#1877F2]",
    tileClass: "bg-feuille",
    image: "/images/social-facebook.jpg",
  },
  {
    label: "Instagram",
    handle: "@lysdelamadoneagro",
    href: "https://www.instagram.com/lysdelamadoneagro",
    icon: IconInstagram,
    badgeClass: "bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    tileClass: "",
    image: "/images/lien_insta.jpg",
  },
  {
    label: "TikTok",
    handle: "@lysdelamadoneagro",
    href: "https://www.tiktok.com/@lysdelamadoneagro",
    icon: IconTiktok,
    badgeClass: "bg-black",
    tileClass: "bg-tomate",
    image: "/images/social-tiktok.png",
  },
];

type Social = (typeof socials)[number];

function SocialTile({ social, aspect = "aspect-square" }: { social: Social; aspect?: string }) {
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex ${aspect} flex-col justify-end overflow-hidden rounded-3xl p-5 text-white ${social.tileClass}`}
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
          className={`flex h-10 w-10 items-center justify-center rounded-full text-white ${social.badgeClass}`}
        >
          <social.icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-base font-semibold">{social.label}</p>
          <p className="text-sm text-white/80">{social.handle}</p>
        </div>
      </div>
    </a>
  );
}

export default function JoinUs() {
  const instagram = socials.find((s) => s.label === "Instagram")!;

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

      {/* Mobile : une seule image + icones */}
      <div className="mt-10 sm:hidden">
        <SocialTile social={instagram} aspect="aspect-[16/10]" />
        <div className="mt-5 flex items-center justify-center gap-4">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className={`flex h-12 w-12 items-center justify-center rounded-full text-white ${social.badgeClass}`}
            >
              <social.icon className="h-6 w-6" />
            </a>
          ))}
        </div>
      </div>

      {/* Desktop / tablette : les trois tuiles */}
      <div className="mt-10 hidden gap-5 sm:grid sm:grid-cols-3">
        {socials.map((social) => (
          <SocialTile key={social.label} social={social} />
        ))}
      </div>
    </section>
  );
}
