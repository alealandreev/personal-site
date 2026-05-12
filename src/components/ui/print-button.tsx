"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      style={{
        border: "1px solid var(--border)",
        color: "var(--fg-muted)",
        fontFamily: "var(--font-mono)",
        borderRadius: "4px",
        background: "transparent",
        cursor: "pointer",
      }}
      className="px-3 py-1.5 text-xs transition-colors hover:border-[--accent] hover:text-[--accent]"
    >
      Print
    </button>
  );
}
