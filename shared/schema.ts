import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const etymologyRequests = pgTable("etymology_requests", {
  id: serial("id").primaryKey(),
  word: text("word").notNull(),
  story: text("story").notNull(),
  timestamp: text("timestamp").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertEtymologyRequestSchema = createInsertSchema(etymologyRequests).pick({
  word: true,
  story: true,
  timestamp: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertEtymologyRequest = z.infer<typeof insertEtymologyRequestSchema>;
export type EtymologyRequest = typeof etymologyRequests.$inferSelect;

export interface EtymologyResponse {
  word: string;
  etymology: string;
}
