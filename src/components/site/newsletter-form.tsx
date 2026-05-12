"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";

type NewsletterFormProps = {
  locale: Locale;
  compact?: boolean;
};

const copy = {
  en: {
    title: "Get new essays by email",
    description:
      "Low-volume updates about data engineering, architecture and useful experiments.",
    placeholder: "your@email.com",
    button: "Subscribe",
    loading: "Submitting...",
    success: "Thanks. Please check your inbox for confirmation.",
    alreadySubscribed: "You're already on the list.",
    error: "Subscription failed. Please try again later.",
  },
  ru: {
    title: "Новые статьи на почту",
    description:
      "Редкие письма про data engineering, архитектуру и полезные инженерные эксперименты.",
    placeholder: "your@email.com",
    button: "Подписаться",
    loading: "Отправляем...",
    success: "Готово. Проверьте почту и подтвердите подписку.",
    alreadySubscribed: "Этот адрес уже подписан.",
    error: "Не удалось оформить подписку. Попробуйте позже.",
  },
} as const;

export function NewsletterForm({
  locale,
  compact = false,
}: NewsletterFormProps) {
  const text = copy[locale];
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        alreadySubscribed?: boolean;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error ?? text.error);
      }

      setStatus("success");
      setEmail("");
      setMessage(
        payload.alreadySubscribed ? text.alreadySubscribed : text.success
      );
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : text.error);
    }
  }

  return (
    <section className={`surface-card ${compact ? "p-5" : "p-6 sm:p-8"}`}>
      <div className={compact ? "" : "max-w-2xl"}>
        <p className="eyebrow">{text.title}</p>
        <p className="mt-3 text-sm leading-7 text-[--fg-muted] sm:text-base">
          {text.description}
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <label className="sr-only" htmlFor="newsletter-email">
          Email
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={text.placeholder}
          className="input-base"
        />
        <button
          type="submit"
          className="button-primary"
          disabled={status === "loading"}
        >
          {status === "loading" ? text.loading : text.button}
        </button>
      </form>

      {message ? (
        <p
          className={`mt-3 text-sm ${
            status === "error" ? "text-[--danger]" : "text-[--fg-muted]"
          }`}
        >
          {message}
        </p>
      ) : null}
    </section>
  );
}
