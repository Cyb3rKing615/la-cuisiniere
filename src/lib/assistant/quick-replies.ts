// Contenu scripté de l'assistant Barbara — Version 1 (sans appel IA).
// Voir Directive_Assistant_Conversationnel_La_Cuisiniere.md section 4.

export const ASSISTANT_NAME = "Barbara";

export const WHATSAPP_NUMBER = "22969983030";

export function whatsappHref(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WELCOME_MESSAGE =
  "Bonjour, je suis Barbara ! 🍅 Je peux t'aider à découvrir nos produits, nos coffrets, nos recettes ou nos points de vente. Que cherches-tu ?";

export const PRODUCTS_MENU_MESSAGE =
  "Voici nos produits — clique sur celui qui t'intéresse :";

export const BACK_TO_MAIN_MESSAGE = "Autre chose ?";

export const HUMAN_CONTACT_LABEL = "Parler à un humain";

export const HUMAN_CONTACT_WHATSAPP_MESSAGE =
  "Bonjour, je viens du site La Cuisinière et j'aimerais avoir plus d'informations.";
