// Données statiques en attendant le branchement de l'API Notion (base "Recettes").
// Champs alignés sur le schéma Notion : Titre, Slug, Difficulté, Temps de
// préparation, Nombre de personnes, Photo principale, Produit(s) lié(s), Statut.
export type Recipe = {
  slug: string;
  title: string;
  difficulty: "Facile" | "Moyen" | "Difficile";
  prepTimeMinutes: number;
  servings: number;
  photo: string;
  relatedProductSlugs: string[];
};

export const recipes: Recipe[] = [
  {
    slug: "spaghetti-a-la-bolognaise",
    title: "Spaghetti à la bolognaise",
    difficulty: "Facile",
    prepTimeMinutes: 20,
    servings: 4,
    photo: "/images/bolognaise.png",
    relatedProductSlugs: ["bolognaise"],
  },
  {
    slug: "riz-sauce-tomate-maison",
    title: "Riz sauce tomate maison",
    difficulty: "Facile",
    prepTimeMinutes: 15,
    servings: 4,
    photo: "/images/sauce_tomate.jpg",
    relatedProductSlugs: ["sauce-tomate"],
  },
  {
    slug: "poulet-sauce-puree-de-tomate",
    title: "Poulet sauce purée de tomate",
    difficulty: "Facile",
    prepTimeMinutes: 25,
    servings: 4,
    photo: "/images/puree.png",
    relatedProductSlugs: ["puree-de-tomate"],
  },
  {
    slug: "ragout-de-legumes-tomate-pelee",
    title: "Ragoût de légumes, tomate pelée",
    difficulty: "Moyen",
    prepTimeMinutes: 30,
    servings: 4,
    photo: "/images/tomate_pelee.png",
    relatedProductSlugs: ["tomate-pelee"],
  },
];

export function getRecipeBySlug(slug: string) {
  return recipes.find((recipe) => recipe.slug === slug);
}
