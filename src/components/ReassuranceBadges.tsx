import Image from "next/image";
import { Leaf, Hourglass } from "lucide-react";

export default function ReassuranceBadges() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2 rounded-full border border-feuille/30 bg-white py-1.5 pl-1.5 pr-4">
        <div className="relative h-8 w-8 overflow-hidden rounded-full bg-white">
          <Image
            src="/images/logo_abssa.jpg"
            alt="Logo ABSSA"
            fill
            className="object-contain"
            sizes="32px"
          />
        </div>
        <span className="text-sm font-semibold text-foreground">
          Homologué ABSSA
        </span>
      </div>
      <div className="flex items-center gap-2 rounded-full border border-feuille/30 bg-white px-4 py-1.5">
        <Leaf className="h-4 w-4 text-feuille-dark" aria-hidden />
        <span className="text-sm font-semibold text-foreground">
          Production biologique
        </span>
      </div>
      <div className="flex items-center gap-2 rounded-full border border-feuille/30 bg-white px-4 py-1.5">
        <Hourglass className="h-4 w-4 text-feuille-dark" aria-hidden />
        <span className="text-sm font-semibold text-foreground">
          Longue conservation
        </span>
      </div>
    </div>
  );
}
