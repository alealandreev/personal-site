import type { ReactNode } from "react";

export function PageShell({
  children,
  wide = false,
}: {
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={`page-shell ${wide ? "page-shell-wide" : "page-shell-narrow"}`}
    >
      {children}
    </div>
  );
}

export function SectionTitle({
  children,
  subtitle,
}: {
  children: ReactNode;
  subtitle?: ReactNode;
}) {
  return (
    <div className="page-intro flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <h2 className="section-title">{children}</h2>
      {subtitle ? (
        <div className="max-w-md text-sm leading-6 text-[--fg-muted]">
          {subtitle}
        </div>
      ) : null}
    </div>
  );
}

export function InfoPill({ children }: { children: ReactNode }) {
  return <span className="pill">{children}</span>;
}
