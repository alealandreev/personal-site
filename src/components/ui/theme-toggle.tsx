"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="h-9 w-9 rounded-full border border-[--border]"
      />
    );
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[--border] bg-[--surface] font-mono text-xs text-[--fg-muted] shadow-[var(--shadow-card)] transition-colors hover:border-[--accent] hover:text-[--accent]"
    >
      {resolvedTheme === "dark" ? "☀" : "◑"}
    </button>
  );
}
