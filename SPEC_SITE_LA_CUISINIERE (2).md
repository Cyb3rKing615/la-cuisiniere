# Spécification de développement — Site La Cuisinière

**Instruction pour Claude Code : avant de construire chaque page, ouvre et regarde
la ou les captures d'écran référencées dans le dossier `reference-panzani/`. Ce
document décrit leur structure en texte, mais l'image reste la référence visuelle
exacte à reproduire (mise en page, hiérarchie, espacement, style des cartes et
boutons). Le contenu (textes, produits, quantité d'éléments) est en revanche
propre à La Cuisinière et ne doit PAS copier celui de Panzani.**

---

## 0. Contexte et objectif

Le site de référence est **panzani.fr**. L'objectif est de reproduire son
architecture front-end (structure de page, navigation, composants visuels)
pour la marque béninoise **La Cuisinière**, en l'adaptant à une gamme plus
réduite de produits et sans les pages qui n'ont pas de sens pour La Cuisinière
(pas de gamme de pâtes, pas de filière blé français, etc.).

Le back-office de contenu est **Notion** (pas de CMS ni base de données
classique). Voir section 8 pour les identifiants des bases déjà créées.

Aucun paiement n'est intégré. Chaque appel à l'action redirige vers WhatsApp
ou Gozem (voir section 7).

## 1. Stack technique

- **Next.js (App Router) + Tailwind CSS**
- Contenu (produits, recettes) récupéré via l'**API Notion officielle**
- Toutes les images passent par le composant `next/image` (redimensionnement,
  formats modernes, lazy loading automatique)
- Déploiement sur **Vercel**
- Pas de base de données relationnelle (Neon/Prisma non nécessaires pour ce
  projet — le contenu structuré vit dans Notion)

## 2. Assets disponibles

Dossier `nos-images/` — à utiliser en priorité pour tout le contenu visuel
en dur (hero, packshots, logos). Les photos de plats cuisinés supplémentaires
et les photos de recettes viendront de Notion au fur et à mesure.

| Fichier | Usage prévu |
|---|---|
| `heros1-carrousel-culturetomate.webp` / `heros2-carrousel-culturetomate.jpg` | Slide héros n°1 — thème origine/culture de la tomate |
| `heros1-carrousel-zerospesticide.jpg` / `heros2-carousel-zerospesticide.jpg` | Slide héros n°2 — thème qualité/naturel |
| `heros1-carrousel-nosrecettes.jpg` / `heros2-carrousel-nosrecettes.jpg` | Slide héros n°3 — thème recettes |
| `Boite-puree-1.jpg`, `puree.png` | Packshots Purée de tomates (1000g/500g/350g) |
| `Boite-pele.jpg`, `tomate_pelee.png` | Packshots Tomates pelées (500g) |
| `Boite-sauce-1.jpg`, `sauce_tomate.jpg` | Packshots Sauce tomate assaisonnée (500g) |
| `Boite-bolognaise.jpg`, `bolognaise.png`, `bolognaise--png.png` | Packshots Sauce bolognaise (250g) |
| *(photo à obtenir)* | Confiture de tomate aux fruits (200g) — 5e produit officiel, pas encore de packshot fourni |
| `Boite-barbecue.jpg` | ⚠️ Produit absent du catalogue officiel de l'entreprise (voir encadré ci-dessous) — ne pas publier de fiche produit tant que ce n'est pas clarifié |
| `logo_abssa.jpg`, `logo_benibiz.jpg` | **`logo_abssa.jpg` a une vraie signification** : logo de l'ABSSA (Agence Béninoise de Sécurité Sanitaire des Aliments), organisme qui homologue les produits. À afficher comme badge de confiance sur les fiches produit et/ou en footer, pas comme simple "logo partenaire". |
| `moisduconsommonslocal.png` | Badge campagne "consommons local" — à utiliser dans la section engagement/origine |
| `lien_insta.jpg` | Visuel lié au compte Instagram (bouton/lien réseaux sociaux) |

**✅ Catalogue officiel confirmé** (document de présentation de l'entreprise,
produits homologués ABSSA avec autorisation de mise sur le marché béninois) :

1. Purée de tomates — 1000g / 500g / 350g
2. Tomates pelées — 500g
3. Sauce tomate assaisonnée — 500g
4. Sauce bolognaise — 250g
5. Confiture de tomate aux fruits — 200g

**⚠️ Point encore à clarifier** : l'image `Boite-barbecue.jpg` fournie dans les
visuels ne correspond à aucun produit de cette liste officielle. Ne pas créer
de fiche produit "Barbecue" tant que ce n'est pas confirmé avec Madame
Gouhizoun — il s'agit probablement d'un produit test, abandonné, ou d'un
oubli du document. Il manque en revanche un packshot pour la "Confiture de
tomate aux fruits", à obtenir avant de construire sa fiche.

**Éléments de réassurance à intégrer dans le design** (issus du même
document) : homologation ABSSA, production biologique, longue conservation —
à afficher en badges ou mentions courtes sur les fiches produit, dans la
lignée de ce qui existe déjà pour le Nutri-Score sur les fiches Panzani.

**Segments clients de l'entreprise** (à garder en tête pour le contenu et la
page Contact) : ménages, mais aussi supermarchés, restaurants et hôtels.
Canaux de distribution existants : vente directe aux ménages, alimentations
et grandes surfaces, restaurants/hôtels, marché sous-régional. Le site reste
centré sur le parcours "ménage/particulier" au lancement (WhatsApp, Gozem) ;
un point de contact distinct pour les professionnels (supermarchés,
restaurants, hôtels) pourra être ajouté plus tard sur la page Contact si le
client le souhaite — ne pas l'oublier ni le complexifier au lancement.

## 3. Navigation globale (header)

Référence : `12-nos-sauces-hub-categories.png`, `17-menu-deroulant-nos-produits.png`

Structure Panzani : **Nos savoureuses pâtes ▾ | Nos savoureuses sauces ▾ | Nos
recettes & conseils ▾ | Nos engagements ▾** + recherche + menu burger.

**Adaptation La Cuisinière** (on retire ce qui n'a pas de sens — pas de gamme
pâtes) :

```
[Logo La Cuisinière]   Nos produits ▾   Recettes ▾   Notre histoire   Où nous trouver   Contact
```

- **Nos produits ▾** (menu déroulant, cf. `17-menu-deroulant-nos-produits.png`) :
  liste des produits actifs, tirée de la base Notion "Produits" (statut = Publié)
- **Recettes ▾** : liens vers "Toutes nos recettes" + éventuelles catégories si
  le volume le justifie plus tard (au lancement, un seul lien suffit)

## 4. Page d'accueil

Références : `01-accueil-hero-carrousel-1.png`, `02-accueil-hero-carrousel-2.png`,
`03-accueil-decouvrez-gammes.png`, `05-accueil-texte-marque.png`,
`06-accueil-du-champ-a-lassiette.png`, `08-accueil-nos-idees-recettes.png`,
`09-accueil-cartes-recettes.png`, `10-accueil-rejoignez-nous-reseaux.png`

Structure de la page, dans l'ordre :

1. **Hero carrousel plein écran** (3 slides, rotation automatique) — reproduire
   exactement la mise en page Panzani : image plein cadre + titre + court texte
   + CTA. Utiliser les 3 thèmes déjà fournis (culture tomate, qualité naturelle,
   recettes) avec les images `heros1/heros2-carrousel-*`.
2. **Section "Découvrez nos produits"** — grille/carrousel des produits phares
   (cf. `03-accueil-decouvrez-gammes.png`), chaque carte = packshot + nom +
   lien vers la fiche produit. Données : base Notion "Produits".
3. **Section texte de marque** ("Depuis toujours...", cf.
   `05-accueil-texte-marque.png`) — utiliser le texte "Notre histoire" déjà
   rédigé (voir `Storytelling_La_Cuisiniere.md`, section 3).
4. **Section "Du champ à l'assiette"** (cf. `06-accueil-du-champ-a-lassiette.png`)
   — reprendre le visuel de bandeau plein largeur avec titre + CTA
   "Découvrir", thème origine locale/agriculteurs.
5. **Section "Nos idées recettes"** (cf. `08-accueil-nos-idees-recettes.png`,
   `09-accueil-cartes-recettes.png`) — grille de cartes recettes (photo,
   difficulté, temps), données depuis la base Notion "Recettes" (3-4 recettes
   les plus récentes, statut = Publié).
6. **Section "Rejoignez-nous" / réseaux sociaux** (cf.
   `10-accueil-rejoignez-nous-reseaux.png`) — bandeau avec liens Facebook,
   Instagram, TikTok.
7. **Footer** (voir section 6).

## 5. Page produit (fiche individuelle)

Références (issues des captures fournies précédemment dans la conversation,
format "Sauce Arrabbiata") — reproduire cette structure à l'identique :

1. Fil d'ariane : `Accueil | Nos produits | [Nom du produit]`
2. Deux colonnes : à gauche l'image packshot (grande, fond neutre), à droite :
   - Catégorie en petit texte au-dessus du titre
   - Titre du produit (grand, typographie marque)
   - Description courte
   - Poids/format
3. Section **"Du champ à l'assiette"** — liste à puces avec icônes (reprendre
   le contenu de la propriété "Points clés" + le corps de la fiche Notion)
4. Section **"Mode de cuisson"** — sous-sections par méthode (ex : Au
   micro-ondes / À la casserole), étapes numérotées avec icônes rondes vertes
   comme sur la référence
5. Section **"Recettes avec ce produit"** — **remplace** la section Panzani
   "Association & remplacement" (qui proposait des pâtes complémentaires ;
   La Cuisinière n'a pas d'équivalent produit complémentaire, donc on relie
   directement aux recettes via le champ Notion "Recettes liées")

Données : base Notion "Produits" (voir section 8 pour l'ID).

## 6. Page catégorie / liste produits

Références : `33-categorie-sauce-hero-breadcrumb.png`,
`34-categorie-sauce-grille-produits.png`, `35-categorie-sauce-intro-visuel.png`,
`36-categorie-sauce-3-avantages.png`, `37-categorie-sauce-associations-ideales.png`,
`38-categorie-sauce-carousel-recettes.png`, `39-categorie-sauce-explication-gamme.png`

**Adaptation** : vu le nombre réduit de produits (5, à confirmer), une seule
page "Nos produits" peut suffire au lancement plutôt qu'une page par
catégorie — reprendre cette structure pour LA page produits globale :

1. Fil d'ariane + titre + texte d'intro (cf. `33-...`)
2. Grille de toutes les fiches produits (cf. `34-...`)
3. Section "3 bonnes raisons de choisir La Cuisinière" (cf.
   `36-categorie-sauce-3-avantages.png`) — reprendre les 3 blocs à icône, ex :
   "100% tomates locales", "Sans conservateurs", "Fait à Cotonou" (voir
   `Storytelling_La_Cuisiniere.md`)
4. Section carrousel de recettes liées (cf. `38-...`)
5. Paragraphe explicatif de la gamme (cf. `39-...`)

## 7. Pages Recettes

**Liste des recettes** — référence `18-recettes-listing-hero.png`,
`19-recettes-categorie-cartes-1.png`, `20-recettes-categorie-intro-texte.png` :
grille de cartes (photo, titre, difficulté, temps), données Notion "Recettes"
(statut = Publié).

**Fiche recette individuelle** — reproduire le format déjà analysé dans la
conversation (capture "Spaghetti à la bolognaise végétarienne") :
1. Deux colonnes : photo du plat à gauche (grande), à droite : difficulté +
   temps, titre, boutons "Partager la recette" / "Imprimer"
2. Section "Les produits qu'il vous faut" — cartes des produits liés (relation
   Notion vers "Produits")
3. Section "Ingrédients" avec compteur de personnes en **texte fixe** ("Pour 4
   personnes") au lancement — **pas** de calcul dynamique (voir décision prise
   en amont : complexité de structuration des données non justifiée au
   lancement)
4. Section "Préparation" — étapes numérotées avec pastilles rondes vertes,
   identique au style Panzani

## 8. Intégration Notion

Deux bases déjà créées et reliées entre elles :

- **Base "Produits"** — data source ID : `e8e0b6c3-051f-4ec4-8740-701995db4c0f`
  Propriétés : Nom, Slug, Catégorie, Poids/Format, Points clés, Photo packshot,
  Photo plat fini, Description courte, Prix, Statut (Brouillon/Publié),
  Recettes liées (relation)
- **Base "Recettes"** — data source ID : `78736905-b3b1-4319-8a4b-f0799c060bed`
  Propriétés : Titre, Slug, Difficulté, Temps de préparation (min), Nombre de
  personnes, Photo principale, Produit(s) lié(s) (relation), Statut

Le site ne doit récupérer que les entrées avec **Statut = Publié**. Une clé
d'API Notion (intégration) devra être créée et partagée avec ces deux bases
avant le développement de la connexion (étape encore à faire côté agence).

## 9. Ce qu'on NE reproduit PAS de Panzani

- Pas de gamme de pâtes, ni de section "Filière Blé Responsable Français"
- Pas de multiples pages "Nos engagements" détaillées par sujet — un contenu
  condensé sur la page d'accueil et/ou une seule page "Nos engagements"
  suffit, avec le contenu déjà rédigé (vision : tomates locales toute l'année
  + soutien aux agriculteurs)
- Pas de calculateur d'ingrédients dynamique (voir section 7)
- Pas de paiement en ligne — chaque CTA "Commander" redirige vers WhatsApp
  Business ou la boutique Gozem
- La page "Histoire de la marque" (`40-42`) inspire uniquement la mise en
  page (photo + texte en alternance, ligne du temps) ; le contenu est celui
  déjà rédigé dans `Storytelling_La_Cuisiniere.md`, pas l'histoire de
  Giovanni Panzani

## 10. Contenu texte prêt à l'emploi

Voir le fichier `Storytelling_La_Cuisiniere.md` livré séparément : taglines,
titres héros, texte "Notre histoire", bios réseaux sociaux, CTA, signature de
footer — à utiliser tel quel dans les composants correspondants plutôt que
d'inventer un nouveau texte.

## 11. Ordre de développement conseillé

1. Structure globale : layout, navigation, footer
2. Page d'accueil (statique d'abord, sans Notion)
3. Page "Nos produits" + fiche produit individuelle (avec données Notion)
4. Page "Recettes" + fiche recette individuelle (avec données Notion)
5. Page "Notre histoire" / "Nos engagements"
6. Connexion complète Notion (si pas déjà fait aux étapes 3-4) + tests avec
   les vraies fiches déjà créées (Sauce Tomate, Purée, Bolognaise)
