import { Client } from "@notionhq/client";
import type {
  PageObjectResponse,
  BlockObjectResponse,
} from "@notionhq/client";

export const notion = new Client({ auth: process.env.NOTION_API_KEY });

// IDs des data sources Notion (voir SPEC_SITE_LA_CUISINIERE.md section 8).
export const DATA_SOURCES = {
  produits: "e8e0b6c3-051f-4ec4-8740-701995db4c0f",
  recettes: "78736905-b3b1-4319-8a4b-f0799c060bed",
  astuces: "1bcc4073-23e0-431a-9aba-711761b3cd85",
  demandesPro: "4a61f7ab-1229-4497-a6d4-d4a8674385de",
} as const;

type Properties = PageObjectResponse["properties"];

function title(properties: Properties, name: string): string {
  const prop = properties[name];
  if (prop?.type !== "title") return "";
  return prop.title.map((t) => t.plain_text).join("");
}

function richText(properties: Properties, name: string): string {
  const prop = properties[name];
  if (prop?.type !== "rich_text") return "";
  return prop.rich_text.map((t) => t.plain_text).join("");
}

function select(properties: Properties, name: string): string | null {
  const prop = properties[name];
  if (prop?.type !== "select") return null;
  return prop.select?.name ?? null;
}

function numberProp(properties: Properties, name: string): number | null {
  const prop = properties[name];
  if (prop?.type !== "number") return null;
  return prop.number;
}

function files(properties: Properties, name: string): string[] {
  const prop = properties[name];
  if (prop?.type !== "files") return [];
  return prop.files.map((f) => (f.type === "external" ? f.external.url : f.file.url));
}

function relationIds(properties: Properties, name: string): string[] {
  const prop = properties[name];
  if (prop?.type !== "relation") return [];
  return prop.relation.map((r) => r.id);
}

function isFullPage(page: unknown): page is PageObjectResponse {
  return (
    typeof page === "object" &&
    page !== null &&
    "properties" in page &&
    "id" in page
  );
}

async function queryPublished(dataSourceId: string) {
  const results: PageObjectResponse[] = [];
  let cursor: string | undefined;
  do {
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      start_cursor: cursor,
      filter: {
        property: "Statut",
        select: { equals: "Publié" },
      },
    });
    results.push(...response.results.filter(isFullPage));
    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);
  return results;
}

async function queryOneBySlug(dataSourceId: string, slug: string) {
  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      and: [
        { property: "Slug", rich_text: { equals: slug } },
        { property: "Statut", select: { equals: "Publié" } },
      ],
    },
    page_size: 1,
  });
  const page = response.results.filter(isFullPage)[0];
  return page ?? null;
}

export async function getPageBlocks(pageId: string): Promise<BlockObjectResponse[]> {
  const blocks: BlockObjectResponse[] = [];
  let cursor: string | undefined;
  do {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
    });
    blocks.push(
      ...response.results.filter(
        (b): b is BlockObjectResponse => "type" in b,
      ),
    );
    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);
  return blocks;
}

// ---------- Produits ----------

export type NotionProduct = {
  id: string;
  name: string;
  category: string;
  description: string;
  weights: string[];
  keyPoints: string[];
  packshot: string | null;
  dishPhoto: string | null;
  slug: string;
  relatedRecipeIds: string[];
};

function mapProduct(page: PageObjectResponse): NotionProduct {
  const p = page.properties;
  const points = richText(p, "Points clés");
  const formats = richText(p, "Poids/Format");
  return {
    id: page.id,
    name: title(p, "Nom"),
    category: select(p, "Catégorie") ?? "",
    description: richText(p, "Description courte"),
    weights: formats
      ? formats.split("·").map((s) => s.trim()).filter(Boolean)
      : [],
    keyPoints: points
      ? points.split("·").map((s) => s.trim()).filter(Boolean)
      : [],
    packshot: files(p, "Photo packshot")[0] ?? null,
    dishPhoto: files(p, "Photo plat fini")[0] ?? null,
    slug: richText(p, "Slug"),
    relatedRecipeIds: relationIds(p, "Recettes liées"),
  };
}

export async function getPublishedProducts(): Promise<NotionProduct[]> {
  const pages = await queryPublished(DATA_SOURCES.produits);
  return pages.map(mapProduct);
}

export async function getProductBySlug(slug: string) {
  const page = await queryOneBySlug(DATA_SOURCES.produits, slug);
  if (!page) return null;
  const blocks = await getPageBlocks(page.id);
  return { product: mapProduct(page), blocks };
}

// ---------- Recettes ----------

export type NotionRecipe = {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  difficulty: string | null;
  prepTimeMinutes: number | null;
  servings: number | null;
  photo: string | null;
  relatedProductIds: string[];
  relatedTipIds: string[];
};

function mapRecipe(page: PageObjectResponse): NotionRecipe {
  const p = page.properties;
  return {
    id: page.id,
    title: title(p, "Titre"),
    slug: richText(p, "Slug"),
    category: select(p, "Catégorie"),
    difficulty: select(p, "Difficulté"),
    prepTimeMinutes: numberProp(p, "Temps de préparation (min)"),
    servings: numberProp(p, "Nombre de personnes"),
    photo: files(p, "Photo principale")[0] ?? null,
    relatedProductIds: relationIds(p, "Produit(s) lié(s)"),
    relatedTipIds: relationIds(p, "Astuces liées"),
  };
}

export async function getPublishedRecipes(): Promise<NotionRecipe[]> {
  const pages = await queryPublished(DATA_SOURCES.recettes);
  return pages.map(mapRecipe);
}

export async function getRecipeBySlug(slug: string) {
  const page = await queryOneBySlug(DATA_SOURCES.recettes, slug);
  if (!page) return null;
  const blocks = await getPageBlocks(page.id);
  return { recipe: mapRecipe(page), blocks };
}

// ---------- Astuces ----------

export type NotionTip = {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  excerpt: string;
  cover: string | null;
  relatedRecipeIds: string[];
};

function mapTip(page: PageObjectResponse): NotionTip {
  const p = page.properties;
  return {
    id: page.id,
    title: title(p, "Titre"),
    slug: richText(p, "Slug"),
    category: select(p, "Catégorie"),
    excerpt: richText(p, "Extrait"),
    cover: files(p, "Photo de couverture")[0] ?? null,
    relatedRecipeIds: relationIds(p, "Recettes liées"),
  };
}

export async function getPublishedTips(): Promise<NotionTip[]> {
  const pages = await queryPublished(DATA_SOURCES.astuces);
  return pages.map(mapTip);
}

export async function getTipBySlug(slug: string) {
  const page = await queryOneBySlug(DATA_SOURCES.astuces, slug);
  if (!page) return null;
  const blocks = await getPageBlocks(page.id);
  return { tip: mapTip(page), blocks };
}
