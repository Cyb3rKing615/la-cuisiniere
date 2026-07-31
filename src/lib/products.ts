// Données statiques en attendant le branchement de l'API Notion (base "Produits").
// Champs alignés sur le schéma Notion : Nom, Slug, Catégorie, Poids/Format,
// Points clés, Photo packshot, Description courte, Statut.
//
// Catalogue officiel confirmé (document de présentation de l'entreprise,
// produits homologués ABSSA) : Purée de tomates, Tomates pelées, Sauce tomate
// assaisonnée, Sauce bolognaise, Confiture de tomate aux fruits.
// La "Sauce Barbecue" (Boite-barbecue.jpg) ne fait pas partie de ce catalogue
// officiel et n'est donc pas publiée tant que ce n'est pas clarifié avec la
// cliente. La "Confiture de tomate aux fruits" n'a pas encore de packshot et
// n'est donc pas non plus publiée — à ajouter dès que la photo est fournie.
export type CookingMethod = {
  label: string;
  steps: string[];
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  weight: string;
  keyPoints: string[];
  packshot: string;
  cookingMethods: CookingMethod[];
};

const defaultCookingMethods: CookingMethod[] = [
  {
    label: "Au micro-ondes",
    steps: [
      "Versez le contenu dans un plat adapté au micro-ondes.",
      "Couvrez et chauffez 2 à 3 minutes à puissance moyenne.",
      "Mélangez et servez aussitôt.",
    ],
  },
  {
    label: "À la casserole",
    steps: [
      "Versez le contenu dans une casserole à feu doux.",
      "Laissez chauffer 5 minutes en remuant régulièrement.",
      "Ajustez l'assaisonnement selon votre goût et servez chaud.",
    ],
  },
];

export const products: Product[] = [
  {
    slug: "puree-de-tomate",
    name: "Purée de Tomates",
    category: "Purées",
    tagline: "La tomate, concentrée en saveur, prête à l'emploi.",
    description:
      "La tomate béninoise concentrée, pour donner du goût à toutes vos préparations en un geste.",
    weight: "1000 g / 500 g / 350 g",
    keyPoints: [
      "100% tomates locales",
      "Sans conservateurs",
      "Fait à Cotonou",
    ],
    packshot: "/images/Boite-puree-1.jpg",
    cookingMethods: defaultCookingMethods,
  },
  {
    slug: "tomate-pelee",
    name: "Tomates Pelées",
    category: "Bases culinaires",
    tagline: "La tomate telle qu'elle est, prête à cuisiner.",
    description:
      "Des tomates béninoises pelées, la base idéale pour cuisiner vos sauces et plats maison.",
    weight: "500 g",
    keyPoints: [
      "100% tomates locales",
      "Sans conservateurs",
      "Fait à Cotonou",
    ],
    packshot: "/images/Boite-pele.jpg",
    cookingMethods: defaultCookingMethods,
  },
  {
    slug: "sauce-tomate",
    name: "Sauce Tomate Assaisonnée",
    category: "Sauces",
    tagline: "La base de vos plats, prête en un geste.",
    description:
      "Une sauce tomate assaisonnée préparée à Cotonou à partir de tomates locales, pour cuisiner simple toute l'année.",
    weight: "500 g",
    keyPoints: [
      "100% tomates locales",
      "Sans conservateurs",
      "Fait à Cotonou",
    ],
    packshot: "/images/Boite-sauce-1.jpg",
    cookingMethods: defaultCookingMethods,
  },
  {
    slug: "bolognaise",
    name: "Sauce Bolognaise",
    category: "Plats préparés",
    tagline: "Le repas de la semaine, prêt en quelques minutes.",
    description:
      "Une sauce bolognaise généreuse à base de tomates locales, prête en quelques minutes pour toute la famille.",
    weight: "250 g",
    keyPoints: [
      "100% tomates locales",
      "Sans conservateurs",
      "Fait à Cotonou",
    ],
    packshot: "/images/Boite-bolognaise.jpg",
    cookingMethods: defaultCookingMethods,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
