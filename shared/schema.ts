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
export type Waitlist = typeof waitlist.$inferSelect;

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
  preview: text("preview").notNull(), // URL to preview image
  link: text("link").notNull(), // URL to project
  studentName: text("student_name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProjectGroupSchema = createInsertSchema(projectGroups)
  .pick({
    name: true,
    description: true,
  })
  .extend({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().optional(),
  });

export const insertProjectSchema = createInsertSchema(projects)
  .pick({
    groupId: true,
    title: true,
    description: true,
    preview: true,
    link: true,
    studentName: true,
  })
  .extend({
    title: z.string().min(2, "Title must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    preview: z.string().url("Preview must be a valid URL"),
    link: z.string().url("Link must be a valid URL"),
    studentName: z.string().min(2, "Student name must be at least 2 characters"),
  });

export type InsertProjectGroup = z.infer<typeof insertProjectGroupSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type ProjectGroup = typeof projectGroups.$inferSelect;
export type Project = typeof projects.$inferSelect;