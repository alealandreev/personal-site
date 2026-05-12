import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://persistentengineer.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aleksandr Andreev — Lead Data Engineer",
    template: "%s · Aleksandr Andreev",
  },
  description:
    "Lead Data Engineer with 9+ years building petabyte-scale data platforms. " +
    "Spark, Kafka, Airflow, dbt, Apache Iceberg. Open to senior+ roles in AU/NZ/EU/US.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Aleksandr Andreev",
    title: "Aleksandr Andreev — Lead Data Engineer",
    description:
      "Lead Data Engineer with 9+ years building petabyte-scale data platforms.",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@alealandreev",
    title: "Aleksandr Andreev — Lead Data Engineer",
    description: "Lead Data Engineer. Spark, Kafka, Iceberg, dbt.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: SITE_URL,
    types: { "application/rss+xml": `${SITE_URL}/rss.xml` },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
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
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
