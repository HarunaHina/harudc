import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  pronouns: text(),
  description: text(),
  track: text(),
  facebook: text(),
  instagram: text(),
  tiktok: text(),
  color_one: text(),
  color_two: text(),
  color_three: text()
});
