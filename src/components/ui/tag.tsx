import Link from "next/link";

interface TagProps {
  tag: string;
  href?: boolean;
}

export function Tag({ tag, href = true }: TagProps) {
  const content = (
    <span
      style={{
        border: "1px solid var(--border)",
        color: "var(--fg-muted)",
        fontFamily: "var(--font-mono)",
        borderRadius: "3px",
        fontSize: "0.7rem",
        padding: "0.1em 0.5em",
        transition: "border-color 0.15s ease, color 0.15s ease",
      }}
      className="inline-block hover:border-[--accent] hover:text-[--accent]"
    >
      {tag}
    </span>
  );

  if (!href) return content;

  return <Link href={`/tags/${tag}`}>{content}</Link>;
}
