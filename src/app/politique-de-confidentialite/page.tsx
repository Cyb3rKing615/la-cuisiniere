import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Politique de confidentialité | La Cuisinière",
  description:
    "Politique de confidentialité de Lys de la Madone Agro (La Cuisinière) : données collectées, finalités, durées de conservation et vos droits.",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl text-feuille-dark">{title}</h2>
      <div className="mt-3 space-y-3 text-base text-foreground/80">
        {children}
      </div>
    </section>
  );
}

export default function PolitiqueDeConfidentialitePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Politique de confidentialité" },
        ]}
      />
      <h1 className="mt-4 font-display text-5xl text-foreground">
        Politique de confidentialité
      </h1>
      <p className="mt-4 text-sm text-foreground/50">
        Dernière mise à jour : août 2026
      </p>

      <Section title="Qui sommes-nous">
        <p>
          Le site La Cuisinière est édité par <strong>Lys de la Madone
          Agro</strong>, immatriculée au Registre du Commerce et du Crédit
          Mobilier sous le n° RCCM RB/COT/21 A 67864, IFU 2200901480262,
          dont le siège est situé à Gondouana, Fidjrossè, Cotonou — fin
          goudron, commissariat de Fidjrossè puis première rue à gauche.
        </p>
        <p>
          Lys de la Madone Agro est responsable du traitement des données
          personnelles décrit ci-dessous.
        </p>
      </Section>

      <Section title="Quelles données nous collectons, et pourquoi">
        <p>
          <strong>Formulaire professionnel (page Professionnels)</strong>
          &nbsp;: lorsque vous remplissez ce formulaire, nous collectons le
          nom de votre entreprise, votre nom, votre type d&apos;activité,
          votre email et/ou téléphone, et le message que vous nous
          adressez. Ces informations nous servent uniquement à répondre à
          votre demande commerciale.
        </p>
        <p>
          <strong>Cookies et mesure d&apos;audience</strong>&nbsp;: avec
          votre consentement, nous utilisons Google Analytics pour mesurer
          la fréquentation du site. Le détail des cookies utilisés, leur
          durée de conservation et la façon de modifier votre choix sont
          décrits sur notre page{" "}
          <Link href="/cookies" className="underline hover:no-underline">
            Cookies
          </Link>
          .
        </p>
        <p>
          Nous ne collectons aucune autre donnée personnelle : le reste du
          site (catalogue produits, coffrets, recettes, points de vente)
          est consultable sans création de compte ni saisie
          d&apos;informations personnelles.
        </p>
      </Section>

      <Section title="Base légale des traitements">
        <p>
          Le traitement des demandes envoyées via le formulaire
          professionnel repose sur votre démarche volontaire de nous
          contacter, en vue de la conclusion ou de l&apos;exécution d&apos;une
          relation commerciale. Le dépôt de cookies de mesure d&apos;audience
          repose sur votre consentement, que vous pouvez retirer à tout
          moment.
        </p>
      </Section>

      <Section title="Durée de conservation">
        <p>
          Les demandes envoyées via le formulaire professionnel sont
          conservées le temps nécessaire à leur traitement, puis
          archivées ou supprimées une fois la demande traitée. Les cookies
          de mesure d&apos;audience sont conservés au maximum 14 mois (voir
          notre page{" "}
          <Link href="/cookies" className="underline hover:no-underline">
            Cookies
          </Link>
          ).
        </p>
      </Section>

      <Section title="Destinataires et transferts de données">
        <p>
          Les demandes du formulaire professionnel sont stockées dans
          notre outil de gestion interne, Notion, qui peut traiter ces
          données sur des serveurs situés hors du Bénin. Notre site est
          hébergé par Vercel, qui peut également traiter des données
          techniques de connexion hors du Bénin. Lorsque vous acceptez les
          cookies de mesure d&apos;audience, Google traite les données
          collectées dans les conditions décrites sur notre page{" "}
          <Link href="/cookies" className="underline hover:no-underline">
            Cookies
          </Link>
          . Nous ne vendons ni ne louons vos données à des tiers.
        </p>
      </Section>

      <Section title="Vos droits">
        <p>
          Conformément au Code du numérique béninois (loi n°2017-20) et
          aux pratiques recommandées par l&apos;Autorité de Protection des
          Données à caractère Personnel (APDP), vous disposez d&apos;un
          droit d&apos;accès, de rectification, d&apos;opposition et de
          suppression concernant vos données personnelles.
        </p>
        <p>
          Vous pouvez exercer ces droits en nous écrivant à{" "}
          <a
            href="mailto:lyslamadone@gmail.com"
            className="underline hover:no-underline"
          >
            lyslamadone@gmail.com
          </a>{" "}
          ou via notre page{" "}
          <Link href="/contact" className="underline hover:no-underline">
            Contact
          </Link>
          . Pour le suivi Google Analytics, vous pouvez retirer votre
          consentement à tout moment depuis notre page{" "}
          <Link href="/cookies" className="underline hover:no-underline">
            Cookies
          </Link>
          .
        </p>
      </Section>

      <Section title="Sécurité">
        <p>
          Nous prenons des mesures raisonnables pour protéger les données
          que vous nous transmettez contre l&apos;accès non autorisé, la
          perte ou la divulgation, notamment en limitant l&apos;accès à nos
          outils internes aux personnes qui en ont besoin.
        </p>
      </Section>

      <Section title="Modification de cette politique">
        <p>
          Cette politique peut être mise à jour, notamment pour refléter
          une évolution du site ou de la réglementation applicable. La
          date de dernière mise à jour figure en haut de cette page.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Pour toute question relative à cette politique ou à vos données
          personnelles&nbsp;: Lys de la Madone Agro, Gondouana, Fidjrossè,
          Cotonou —{" "}
          <a
            href="mailto:lyslamadone@gmail.com"
            className="underline hover:no-underline"
          >
            lyslamadone@gmail.com
          </a>{" "}
          — +229 69 98 30 30.
        </p>
      </Section>
    </div>
  );
}
