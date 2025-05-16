import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertProjectGroupSchema, insertProjectSchema, insertWaitlistSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express) {
  app.post("/api/waitlist", async (req, res) => {
    try {
      const entry = insertWaitlistSchema.parse(req.body);
      const isRegistered = await storage.isEmailRegistered(entry.email);
      if (isRegistered) {
        return res.status(400).json({ 
          message: "This email is already registered" 
        });
      }
      const result = await storage.addToWaitlist(entry);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: error.errors[0].message 
        });
      }
      throw error;
    }
  });

  // Get all project groups
  app.get("/api/groups", async (_req, res) => {
    const groups = await storage.getProjectGroups();
    res.json(groups);
  });

  // Get a specific project group
  app.get("/api/groups/:id", async (req, res) => {
    const group = await storage.getProjectGroup(Number(req.params.id));
    if (!group) {
      return res.status(404).json({ message: "Project group not found" });
    }
    res.json(group);
  });

  // Create a new project group
  app.post("/api/groups", async (req, res) => {
    try {
      const group = insertProjectGroupSchema.parse(req.body);
      const result = await storage.createProjectGroup(group);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      throw error;
    }
  });

  // Update the projects route handler
  app.get("/api/groups/:groupId/projects", async (req, res) => {
    const groupId = Number(req.params.groupId);
    console.log(`Fetching projects for group ${groupId}`);
    const projects = await storage.getProjects(groupId);
    console.log(`Found ${projects.length} projects:`, projects);
    res.json(projects);
  });

  // Get a specific project
  app.get("/api/projects/:id", async (req, res) => {
    const project = await storage.getProject(Number(req.params.id));
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  });

  // Create a new project
  app.post("/api/projects", async (req, res) => {
    try {
      const project = insertProjectSchema.parse(req.body);
      const result = await storage.createProject(project);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      throw error;
    }
  });

  return createServer(app);
}