import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const views = pgTable("views", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull(),
  ts: timestamp("ts").notNull().defaultNow(),
  ipHash: text("ip_hash"),
  country: text("country"),
});

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").notNull().defaultNow(),
  source: text("source").default("website"),
});
