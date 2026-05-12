import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n";

interface TagProps {
  tag: string;
  href?: boolean;
  locale?: Locale;
}

export function Tag({ tag, href = true, locale = "en" }: TagProps) {
  const content = (
    <span className="pill text-[11px] hover:border-[--accent] hover:text-[--accent]">
      {tag}
    </span>
  );

  if (!href) return content;

  return <Link href={localePath(locale, `/tags/${tag}`)}>{content}</Link>;
}
