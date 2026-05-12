import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { headers } from "next/headers";
import { normalizeLocale } from "@/lib/i18n";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://persistentengineer.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "persistentengineer.com",
  description:
    "Lead Data Engineer focused on data platforms, distributed systems and applied AI tooling.",
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-site-locale") ?? undefined;
  const htmlLang = normalizeLocale(locale);

  return (
    <html
      lang={htmlLang}
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
