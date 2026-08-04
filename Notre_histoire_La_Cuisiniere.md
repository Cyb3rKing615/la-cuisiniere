# Page "Notre histoire" — La Cuisinière

Contenu prêt à intégrer tel quel dans la page. Basé exclusivement sur le
document officiel de présentation de l'entreprise (Lys de la Madone Agro) —
aucune donnée inventée. Structure pensée en alternance texte/image, dans
l'esprit de la page "Histoire de la marque" de Panzani (cf.
`reference-panzani/40-histoire-marque-hero.png`,
`41-histoire-marque-timeline-1910.png`, `42-histoire-marque-timeline-1949.png`),
mais adaptée à un contenu plus court et sans ligne du temps à rallonge.

---

## Section 1 — Hero / titre de page

**Titre :**
> Notre histoire

**Sous-titre :**
> Depuis 2020, nous transformons la tomate béninoise pour soutenir nos
> producteurs et nourrir vos familles, toute l'année.

*Image suggérée : `heros1-carrousel-culturetomate.webp` ou une photo de
l'atelier/production si disponible.*

---

## Section 2 — L'origine (bloc texte + image)

**Titre de section :**
> D'où vient La Cuisinière

**Texte :**
> Lys de la Madone Agro est née d'une conviction simple : trop de tomates
> cultivées localement se perdent après la récolte, faute de débouché. Depuis
> 2020, nous transformons cette production en conserves de qualité, sous la
> marque La Cuisinière — pour que rien ne se perde, et que chaque foyer
> profite du goût de la tomate béninoise, toute l'année.
>
> Ce projet est né d'une volonté forte de soutenir les planteurs et de
> réduire le gaspillage alimentaire, en valorisant en particulier la
> production locale de tomates.

*Image suggérée : photo de champ ou de tomates fraîches (à défaut, une image
produit en attendant une vraie photo terrain).*

---

## Section 3 — Notre vision

**Titre de section :**
> Notre vision

**Texte :**
> Devenir une référence de la transformation agroalimentaire au Bénin et
> dans la sous-région, en valorisant les produits locaux pour contribuer à
> la sécurité alimentaire et au développement économique.
>
> Nous encourageons aussi les agriculteurs à adopter une agriculture
> biologique, pour un développement durable de la filière.

---

## Section 4 — Notre mission

**Titre de section :**
> Notre mission

**Texte :**
> Mettre à la disposition des consommateurs des produits de qualité,
> respectant les normes de l'alimentation, à des prix accessibles.

---

## Section 5 — Nos valeurs (3 blocs, style icônes — cf. section "3 avantages"
de la spec principale)

**Titre de section :**
> Ce qui nous guide

| Valeur | Texte |
|---|---|
| **Qualité et authenticité** | Fraîcheur et goût naturel, sans artifices, dans le respect des normes d'hygiène et de qualité. |
| **Innovation** | Une maîtrise constante de la transformation, pour des produits savoureux et toujours constants. |
| **Ancrage social** | Le soutien aux agriculteurs et maraîchers, et la création d'emplois pour les jeunes et les femmes. |

---

## Section 6 — Nos engagements concrets (liste courte, format bandeau ou puces)

**Titre de section :**
> Nos engagements

- Réduire les pertes post-récoltes des maraîchers
- Contribuer à une alimentation saine des ménages
- Soutenir une production biologique et durable
- Élargir l'accès à nos produits, du marché local au marché sous-régional

---

## Section 7 — Réassurance / confiance (bandeau court, pas une section longue)

**Texte :**
> Nos produits sont homologués par l'ABSSA (Agence Béninoise de Sécurité
> Sanitaire des Aliments) et disposent des autorisations de mise sur le
> marché béninois.

*Afficher le logo `logo_abssa.jpg` à côté de ce texte.*

---

## Notes d'implémentation pour Claude Code

- Aucune donnée chiffrée n'est inventée ici (pas de nombre d'agriculteurs, de
  tonnage, etc.) — le document officiel n'en fournit pas. Ne pas en ajouter.
- Le ton reste simple et chaleureux (cohérent avec `Storytelling_La_Cuisiniere.md`),
  même si le contenu source est plus institutionnel : les sections 2 et 7
  peuvent rester proches du texte officiel, mais éviter un ton de brochure
  d'entreprise sur l'ensemble de la page.
- Cette page peut réutiliser directement les blocs "3 avantages" en Section 5
  avec le même composant que celui prévu pour la page "Nos produits" (voir
  `SPEC_SITE_LA_CUISINIERE.md`, section 6), pour garder une cohérence visuelle.
- Les segments clients et canaux de distribution (ménages, supermarchés,
  restaurants, hôtels, marché sous-régional) ne sont **pas** repris sur cette
  page — ils sont réservés à un usage futur (page Contact / B2B), voir la
  note correspondante dans `SPEC_SITE_LA_CUISINIERE.md`.
