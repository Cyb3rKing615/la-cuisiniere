import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Politique de confidentialité | La Cuisinière",
  description:
    "Politique de confidentialité de La Cuisinière — page en cours de finalisation.",
};

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

      <p className="mt-8 text-base text-foreground/80">
        Cette page est en cours de finalisation. Elle détaillera notamment
        qui nous sommes (raison sociale, RCCM, IFU), quelles données
        personnelles nous collectons et pourquoi, la base légale de ces
        traitements, leur durée de conservation, vos droits au regard du
        Code du numérique béninois (loi n°2017-20) et la manière de les
        exercer, ainsi que les coordonnées du responsable de traitement.
      </p>
      <p className="mt-4 text-base text-foreground/80">
        Pour toute question en attendant, vous pouvez nous contacter via
        notre page{" "}
        <Link href="/contact" className="underline hover:no-underline">
          Contact
        </Link>
        . Pour la gestion de votre consentement aux cookies, consultez notre
        page{" "}
        <Link href="/cookies" className="underline hover:no-underline">
          Cookies
        </Link>
        .
      </p>
    </div>
  );
}
