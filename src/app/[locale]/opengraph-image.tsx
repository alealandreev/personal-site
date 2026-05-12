import { ImageResponse } from "next/og";
import { isLocale } from "@/lib/i18n";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function OpenGraphImage({ params }: Props) {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";
  const title =
    safeLocale === "ru"
      ? "Александр Андреев"
      : "Aleksandr Andreev";
  const subtitle =
    safeLocale === "ru"
      ? "Lead Data Engineer · streaming · lakehouse · AI tooling"
      : "Lead Data Engineer · streaming · lakehouse · AI tooling";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(135deg, #0b1220 0%, #14223f 45%, #1d78ff 100%)",
          color: "#edf2ff",
          padding: "72px",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            border: "1px solid rgba(237, 242, 255, 0.25)",
            borderRadius: 999,
            padding: "12px 22px",
            fontSize: 28,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          persistentengineer.com
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 74, fontWeight: 700 }}>{title}</div>
          <div style={{ fontSize: 34, color: "rgba(237, 242, 255, 0.82)" }}>
            {subtitle}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
