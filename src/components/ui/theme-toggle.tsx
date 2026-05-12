"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="h-8 w-8 rounded-md"
        style={{ color: "var(--fg-muted)" }}
      />
    );
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
      style={{
        color: "var(--fg-muted)",
        fontFamily: "var(--font-mono)",
        border: "1px solid var(--border)",
        background: "transparent",
        borderRadius: "4px",
      }}
      className="flex h-7 w-7 items-center justify-center text-xs transition-colors hover:text-[--accent]"
    >
      {resolvedTheme === "dark" ? "☀" : "◑"}
    </button>
  );
}
