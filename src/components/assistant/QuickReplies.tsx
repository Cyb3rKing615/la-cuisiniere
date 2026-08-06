import Link from "next/link";

export type QuickReplyOption = {
  label: string;
  href?: string;
  external?: boolean;
  onClick?: () => void;
};

export default function QuickReplies({ options }: { options: QuickReplyOption[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const className =
          "rounded-full border border-feuille/30 bg-white px-4 py-2 text-sm font-semibold text-feuille transition-colors hover:bg-feuille hover:text-white";

        if (option.href && option.external) {
          return (
            <a
              key={option.label}
              href={option.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={option.onClick}
              className={className}
            >
              {option.label}
            </a>
          );
        }

        if (option.href) {
          return (
            <Link
              key={option.label}
              href={option.href}
              onClick={option.onClick}
              className={className}
            >
              {option.label}
            </Link>
          );
        }

        return (
          <button key={option.label} type="button" onClick={option.onClick} className={className}>
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
