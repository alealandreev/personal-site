"use client";

export function PrintButton({ label = "Print" }: { label?: string }) {
  return (
    <button
      onClick={() => window.print()}
      className="button-secondary cursor-pointer"
    >
      {label}
    </button>
  );
}
