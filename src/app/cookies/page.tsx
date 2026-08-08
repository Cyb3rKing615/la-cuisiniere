import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import CookieStatus from "@/components/cookies/CookieStatus";

export const metadata: Metadata = {
  title: "Cookies | La Cuisinière",
  description:
    "Comment La Cuisinière utilise les cookies et Google Analytics, et comment modifier votre choix à tout moment.",
};

const cookiesTable = [
  {
    name: "Cookies techniques",
    issuer: "La Cuisinière",
    purpose:
      "Fonctionnement de base du site (mémorisation de votre choix cookies, sécurité)",
    duration: "Session ou 12 mois",
    consent: "Non — nécessaires au fonctionnement du site",
  },
  {
    name: "_ga, _ga_* (Google Analytics)",
    issuer: "Google",
    purpose:
      "Mesure d'audience : nombre de visiteurs, pages consultées, provenance",
    duration: "14 mois",
    consent: "Oui",
  },
];

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[{ label: "Accueil", href: "/" }, { label: "Cookies" }]}
      />
      <h1 className="mt-4 font-display text-5xl text-foreground">Cookies</h1>

      <div className="mt-8">
        <CookieStatus />
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-feuille-dark">
          Qu&apos;est-ce qu&apos;un cookie&nbsp;?
        </h2>
        <p className="mt-3 text-base text-foreground/80">
          Un cookie est un petit fichier déposé sur votre appareil lors de
          votre visite, qui permet de retenir certaines informations vous
          concernant (par exemple, que vous avez déjà visité le site).
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-feuille-dark">
          Les cookies que nous utilisons
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-2 border-feuille/20 text-foreground/50">
                <th className="py-3 pr-4 font-semibold uppercase tracking-wide">
                  Cookie
                </th>
                <th className="py-3 pr-4 font-semibold uppercase tracking-wide">
                  Émis par
                </th>
                <th className="py-3 pr-4 font-semibold uppercase tracking-wide">
                  Finalité
                </th>
                <th className="py-3 pr-4 font-semibold uppercase tracking-wide">
                  Durée
                </th>
                <th className="py-3 font-semibold uppercase tracking-wide">
                  Consentement requis
                </th>
              </tr>
            </thead>
            <tbody>
              {cookiesTable.map((row) => (
                <tr key={row.name} className="border-b border-black/5 align-top">
                  <td className="py-3 pr-4 font-semibold text-foreground">
                    {row.name}
                  </td>
                  <td className="py-3 pr-4 text-foreground/80">{row.issuer}</td>
                  <td className="py-3 pr-4 text-foreground/80">{row.purpose}</td>
                  <td className="py-3 pr-4 text-foreground/80">{row.duration}</td>
                  <td className="py-3 text-foreground/80">{row.consent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-feuille-dark">
          Pourquoi nous mesurons l&apos;audience
        </h2>
        <p className="mt-3 text-base text-foreground/80">
          Ces informations nous aident à comprendre quelles pages et quels
          contenus intéressent nos visiteurs, afin d&apos;améliorer le site.
          Nous n&apos;utilisons pas ces données à des fins de publicité
          ciblée.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-feuille-dark">
          Transfert de données hors du Bénin
        </h2>
        <p className="mt-3 text-base text-foreground/80">
          Google Analytics étant un service de la société Google, les
          données collectées peuvent être traitées sur des serveurs situés
          hors du Bénin. Google s&apos;engage à traiter ces données
          conformément à sa propre politique de confidentialité, consultable
          sur{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            policies.google.com/privacy
          </a>
          .
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-feuille-dark">
          Vos droits
        </h2>
        <p className="mt-3 text-base text-foreground/80">
          Conformément au Code du numérique béninois, vous disposez d&apos;un
          droit d&apos;accès, de rectification, d&apos;opposition et de
          suppression concernant vos données. Vous pouvez exercer ces droits
          en nous contactant via notre page{" "}
          <Link href="/contact" className="underline hover:no-underline">
            Contact
          </Link>
          .
        </p>
        <p className="mt-3 text-base text-foreground/80">
          Vous pouvez retirer votre consentement au suivi Google Analytics à
          tout moment, en modifiant votre choix ci-dessus.
        </p>
      </section>
    </div>
  );
}
