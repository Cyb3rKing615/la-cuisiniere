# Directive de développement — Assistant conversationnel La Cuisinière

**À lire avec** `System_Prompt_Assistant_La_Cuisiniere.md` (le contenu que
l'assistant doit dire) et `SPEC_SITE_LA_CUISINIERE.md` (le reste du site).
Ce document décrit ce qu'il faut **construire** techniquement.

---

## 1. Objectif et phasage

Deux versions à construire, dans cet ordre — ne pas passer à la version 2
avant que la version 1 soit fonctionnelle et validée :

- **Version 1 (lancement, coût nul)** : assistant scripté à boutons de
  réponse rapide uniquement, pas d'appel à une IA.
- **Version 2 (amélioration, coût faible mais réel)** : ajout d'un champ de
  texte libre propulsé par l'API Claude (modèle `claude-haiku-4-5`), en plus
  des boutons de la version 1, qui restent visibles.

**Important** : la clé API Claude utilisée en Version 2 doit être celle du
compte du client (Lys de la Madone Agro), pas celle de l'agence — voir note
de gouvernance en section 7.

---

## 2. Architecture générale

```
[Mascotte visible en bas à droite du site, sur toutes les pages]
                    ↓ (clic)
        [Fenêtre de chat s'ouvre]
                    ↓
   [Boutons de réponse rapide]   +   [Champ de texte libre — Version 2 uniquement]
         (toujours actifs)                        ↓
                                    Requête → /api/chat (route Next.js)
                                                    ↓
                                    Construction du prompt système
                                    (texte fixe + données Notion à jour)
                                                    ↓
                                    Appel API Claude (streaming)
                                                    ↓
                                    Réponse affichée progressivement
```

---

## 3. Arborescence de fichiers à créer

```
/components/assistant/
  ChatBubbleButton.tsx      → bouton flottant mascotte (toujours visible)
  ChatWindow.tsx             → fenêtre de conversation (ouverture/fermeture)
  QuickReplies.tsx           → boutons de réponse rapide (Version 1 et 2)
  MessageBubble.tsx          → une bulle de message (utilisateur ou assistant)
  ChatInput.tsx               → champ de texte libre (Version 2 uniquement)

/app/api/chat/route.ts        → route API (Version 2 uniquement)

/lib/assistant/
  system-prompt.ts            → contenu de System_Prompt_Assistant_La_Cuisiniere.md,
                                 en constante exportée
  notion-context.ts           → récupère produits + recettes publiés depuis
                                 Notion, formate en texte pour le prompt
  quick-replies.ts            → liste des boutons de réponse rapide et leur
                                 réponse associée (Version 1)
```

---

## 4. Version 1 — Assistant scripté (à construire en premier)

Comportement :
- La mascotte (icône ronde, avatar défini dans le brief de design) reste
  visible en bas à droite sur toutes les pages, sans gêner la lecture.
- Au clic, la fenêtre de chat s'ouvre avec un message d'accueil fixe (repris
  du system prompt : ton chaleureux, se présente) et une liste de boutons de
  réponse rapide, par exemple :
  - "Voir nos produits" → lien vers /produits
  - "Découvrir une recette" → lien vers /recettes
  - "Où nous trouver" → lien vers /ou-nous-trouver
  - "Nous contacter" → lien WhatsApp
- Chaque bouton peut soit naviguer directement vers une page, soit afficher
  une réponse texte fixe suivie de nouveaux boutons (ex : "Voir nos
  produits" → liste des 5 produits en boutons, chacun renvoyant vers sa
  fiche).
- Aucun appel réseau vers une IA à cette étape — tout est codé en dur dans
  `quick-replies.ts`, ou généré depuis les mêmes données Notion que le reste
  du site (à privilégier pour rester à jour automatiquement).
- Toujours un bouton "Parler à un humain" visible, qui ouvre WhatsApp avec
  un message pré-rempli.

---

## 5. Version 2 — Ajout du champ libre propulsé par l'IA

**Uniquement une fois la Version 1 validée par le client.**

- Ajouter un champ de texte sous les boutons de réponse rapide (qui restent
  affichés — les deux coexistent).
- À l'envoi d'un message, appel à `/app/api/chat/route.ts`, qui :
  1. Récupère le contenu à jour de Notion via `notion-context.ts` (produits
     et recettes publiés) — mise en cache de quelques minutes pour éviter un
     appel Notion à chaque message.
  2. Construit le prompt système final = contenu de `system-prompt.ts` +
     bloc de données Notion inséré.
  3. Appelle l'API Claude avec streaming activé (`stream: true`), modèle
     `claude-haiku-4-5`.
  4. Renvoie la réponse en flux au front, affichée progressivement dans la
     bulle (effet de frappe).
- Gérer explicitement les erreurs : clé API absente, quota dépassé, appel
  échoué → afficher un message de repli du type "Je rencontre un souci
  technique, tu peux nous écrire directement sur WhatsApp" avec le lien,
  jamais un écran vide ou une erreur brute affichée au visiteur.
- La clé API (`ANTHROPIC_API_KEY`) est une variable d'environnement Vercel,
  jamais codée en dur, jamais exposée au client (uniquement lue côté route
  API serveur).

---

## 6. Comportement et accessibilité — dans les deux versions

- Mobile-first : la fenêtre de chat doit être pleinement utilisable sur un
  écran de téléphone, pas seulement en desktop (majorité du trafic attendu
  côté mobile).
- La fenêtre se ferme au clic en dehors ou sur un bouton de fermeture
  explicite (croix), jamais uniquement en cliquant ailleurs par accident.
- Le nombre de messages affichés reste raisonnable — pas d'historique
  interminable à charger ; une conversation qui se réinitialise à chaque
  nouvelle visite est acceptable pour ce cas d'usage.
- Contraste et taille de texte suffisants dans les bulles (accessibilité de
  base), cohérents avec le reste de la charte graphique du site.

---

## 7. Note de gouvernance (à ne pas oublier)

- Le coût d'utilisation de l'API Claude en Version 2 (faible mais réel — de
  l'ordre de 1 FCFA par échange avec Haiku 4.5) doit être supporté par le
  compte du client, pas par l'agence — la mission Novavox n'étant pas
  rémunérée financièrement. Le client doit créer son propre compte sur
  console.anthropic.com et fournir sa propre clé API.
- Les champs marqués `[à compléter]` dans `System_Prompt_Assistant_La_Cuisiniere.md`
  (prix, horaires, livraison, tutoiement/vouvoiement) doivent être remplis
  avec de vraies données avant la mise en production de la Version 2 —
  Claude Code ne doit jamais inventer ces valeurs pour "faire fonctionner"
  la démo.
