
import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const waitlist = pgTable("waitlist", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  company: text("company"),
  joinedAt: timestamp("joined_at").defaultNow(),
});

export const projectGroups = pgTable("project_groups", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  groupId: serial("group_id").references(() => projectGroups.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  preview: text("preview").notNull(),
  link: text("link").notNull(),
  studentName: text("student_name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertWaitlistSchema = createInsertSchema(waitlist)
  .pick({
    email: true,
    name: true,
    company: true,
  })
  .extend({
    email: z.string().email("Please enter a valid email address"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    company: z.string().optional(),
  });

export type InsertWaitlist = z.infer<typeof insertWaitlistSchema>;
export type Project = typeof projects.$inferSelect;
export type ProjectGroup = typeof projectGroups.$inferSelect;
