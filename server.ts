import express from "express";
import { createServer } from "http";
import { createServer as createViteServer } from "vite";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { projectGroups, projects, waitlist } from "./schema";
import { insertWaitlistSchema } from "./schema";
import { ZodError } from "zod";

const app = express();
app.use(express.json());

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

app.post("/api/waitlist", async (req, res) => {
  try {
    const entry = insertWaitlistSchema.parse(req.body);
    const result = await db.insert(waitlist).values(entry).returning();
    res.status(201).json(result[0]);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    throw error;
  }
});

app.get("/api/groups/:groupId/projects", async (req, res) => {
  const result = await db
    .select()
    .from(projects)
    .where(eq(projects.groupId, Number(req.params.groupId)));
  res.json(result);
});

async function startServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  app.use(vite.middlewares);

  const port = 5000; // Fixed port as per Replit requirements
  const server = createServer(app);

  server.on('error', (error: any) => {
    console.error('Server startup error:', error);
    process.exit(1);
  });

  server.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer().catch(console.error);