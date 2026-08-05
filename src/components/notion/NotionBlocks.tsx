import Image from "next/image";
import type { BlockObjectResponse } from "@notionhq/client";

type RichText = Extract<
  BlockObjectResponse,
  { type: "paragraph" }
>["paragraph"]["rich_text"];

const CALLOUT_BG: Record<string, string> = {
  gray_background: "bg-gray-100",
  brown_background: "bg-amber-100",
  orange_background: "bg-orange-100",
  yellow_background: "bg-jaune/20",
  green_background: "bg-feuille/15",
  blue_background: "bg-blue-100",
  purple_background: "bg-purple-100",
  pink_background: "bg-pink-100",
  red_background: "bg-tomate/10",
  default: "bg-creme-deep",
};

function RichText({ segments }: { segments: RichText }) {
  return (
    <>
      {segments.map((segment, i) => {
        let node: React.ReactNode = segment.plain_text;
        if (segment.annotations.code) {
          node = (
            <code className="rounded bg-creme-deep px-1.5 py-0.5 text-[0.9em]">
              {node}
            </code>
          );
        }
        if (segment.annotations.bold) node = <strong>{node}</strong>;
        if (segment.annotations.italic) node = <em>{node}</em>;
        if (segment.annotations.strikethrough) node = <s>{node}</s>;
        if (segment.annotations.underline) node = <u>{node}</u>;
        if (segment.href) {
          node = (
            <a
              href={segment.href}
              className="text-feuille underline hover:text-feuille-dark"
              target={segment.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
            >
              {node}
            </a>
          );
        }
        return <span key={i}>{node}</span>;
      })}
    </>
  );
}

export default function NotionBlocks({
  blocks,
}: {
  blocks: BlockObjectResponse[];
}) {
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];

    if (block.type === "bulleted_list_item") {
      const items: BlockObjectResponse[] = [];
      while (i < blocks.length && blocks[i].type === "bulleted_list_item") {
        items.push(blocks[i]);
        i++;
      }
      elements.push(
        <ul key={block.id} className="my-4 space-y-2">
          {items.map((item) => {
            if (item.type !== "bulleted_list_item") return null;
            return (
              <li key={item.id} className="flex items-start gap-3">
                <span
                  className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-feuille text-[10px] text-white"
                  aria-hidden
                >
                  ✓
                </span>
                <span className="text-lg text-foreground/80">
                  <RichText segments={item.bulleted_list_item.rich_text} />
                </span>
              </li>
            );
          })}
        </ul>,
      );
      continue;
    }

    if (block.type === "numbered_list_item") {
      const items: BlockObjectResponse[] = [];
      while (i < blocks.length && blocks[i].type === "numbered_list_item") {
        items.push(blocks[i]);
        i++;
      }
      elements.push(
        <ol key={block.id} className="my-4 space-y-3">
          {items.map((item, idx) => {
            if (item.type !== "numbered_list_item") return null;
            return (
              <li key={item.id} className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-feuille text-base font-bold text-white">
                  {idx + 1}
                </span>
                <span className="text-lg text-foreground/80">
                  <RichText segments={item.numbered_list_item.rich_text} />
                </span>
              </li>
            );
          })}
        </ol>,
      );
      continue;
    }

    switch (block.type) {
      case "heading_2":
        elements.push(
          <h2
            key={block.id}
            className="mb-4 mt-10 font-display text-2xl text-feuille sm:text-3xl"
          >
            <RichText segments={block.heading_2.rich_text} />
          </h2>,
        );
        break;
      case "heading_3":
        elements.push(
          <h3 key={block.id} className="mb-2 mt-6 font-display text-xl text-tomate">
            <RichText segments={block.heading_3.rich_text} />
          </h3>,
        );
        break;
      case "paragraph":
        if (block.paragraph.rich_text.length > 0) {
          elements.push(
            <p key={block.id} className="mb-4 text-lg leading-relaxed text-foreground/80">
              <RichText segments={block.paragraph.rich_text} />
            </p>,
          );
        }
        break;
      case "quote":
        elements.push(
          <blockquote
            key={block.id}
            className="my-4 border-l-4 border-feuille pl-4 text-lg italic text-foreground/70"
          >
            <RichText segments={block.quote.rich_text} />
          </blockquote>,
        );
        break;
      case "callout": {
        const bg = CALLOUT_BG[block.callout.color] ?? CALLOUT_BG.default;
        const icon =
          block.callout.icon?.type === "emoji" ? block.callout.icon.emoji : "💡";
        elements.push(
          <div
            key={block.id}
            className={`my-6 flex gap-3 rounded-2xl p-5 ${bg}`}
          >
            <span aria-hidden className="text-xl">
              {icon}
            </span>
            <span className="text-lg text-foreground/80">
              <RichText segments={block.callout.rich_text} />
            </span>
          </div>,
        );
        break;
      }
      case "image": {
        const src =
          block.image.type === "external"
            ? block.image.external.url
            : block.image.file.url;
        const caption = block.image.caption
          .map((c) => c.plain_text)
          .join("");
        elements.push(
          <figure key={block.id} className="my-6">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
              <Image
                src={src}
                alt={caption || ""}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 700px, 100vw"
                unoptimized
              />
            </div>
            {caption && (
              <figcaption className="mt-2 text-center text-base text-foreground/50">
                {caption}
              </figcaption>
            )}
          </figure>,
        );
        break;
      }
      case "divider":
        elements.push(<hr key={block.id} className="my-8 border-black/10" />);
        break;
      default:
        break;
    }
    i++;
  }

  return <div>{elements}</div>;
}
