"use client";

export default function RecipeActions({ title }: { title: string }) {
  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: window.location.href });
      } catch {
        // annulé par l'utilisateur, rien à faire
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Lien copié !");
    }
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={share}
        className="rounded-full border-2 border-feuille px-6 py-3.5 text-base font-bold uppercase tracking-wide text-feuille hover:bg-feuille hover:text-white"
      >
        Partager la recette
      </button>
      <button
        onClick={() => window.print()}
        className="rounded-full border-2 border-feuille px-6 py-3.5 text-base font-bold uppercase tracking-wide text-feuille hover:bg-feuille hover:text-white"
      >
        Imprimer
      </button>
    </div>
  );
}
