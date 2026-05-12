import { NextRequest } from "next/server";
import { createHash } from "crypto";

const rateLimit = new Map<string, number>();

function hashIp(ip: string): string {
  const salt = process.env.IP_SALT || "";
  return createHash("sha256").update(ip + salt).digest("hex").slice(0, 16);
}

export async function POST(req: NextRequest) {
  try {
    const { slug } = await req.json() as { slug: string };

    if (!slug || typeof slug !== "string") {
      return Response.json({ error: "Invalid slug" }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    const ipHash = hashIp(ip);
    const rateLimitKey = `${ipHash}:${slug}`;
    const now = Date.now();
    const lastSeen = rateLimit.get(rateLimitKey) ?? 0;

    if (now - lastSeen < 86_400_000) {
      return Response.json({ counted: false });
    }

    rateLimit.set(rateLimitKey, now);

    // TODO: wire up Neon DB
    // const { db } = await import("@/lib/db/client");
    // await db.insert(views).values({ slug, ipHash });

    return Response.json({ counted: true });
  } catch (err) {
    console.error("[views] error:", err instanceof Error ? err.message : err);
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return Response.json({ error: "Missing slug" }, { status: 400 });
  return Response.json({ count: 0, slug });
}
