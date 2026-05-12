import { NextRequest } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = schema.parse(body);

    const apiKey = process.env.BUTTONDOWN_API_KEY;
    if (!apiKey) {
      console.warn("[newsletter] BUTTONDOWN_API_KEY not set");
      return Response.json({ error: "Newsletter not configured" }, { status: 503 });
    }

    const res = await fetch("https://api.buttondown.email/v1/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, tags: ["website"] }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      const code = (data as Record<string, unknown>).code;

      // Already subscribed
      if (res.status === 400 && code === "email_already_exists") {
        return Response.json({ success: true, alreadySubscribed: true });
      }

      console.error("[newsletter] Buttondown error:", data);
      return Response.json({ error: "Subscription failed" }, { status: 502 });
    }

    return Response.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json(
        { error: err.issues[0]?.message ?? "Validation error" },
        { status: 400 }
      );
    }
    if (err instanceof Error) console.error("[newsletter] error:", err.message); else console.error("[newsletter] unknown error");
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}
