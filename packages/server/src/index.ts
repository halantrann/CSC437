// src/index.ts

import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import dishes from "./routes/dishes";
import auth, { authenticateUser } from "./routes/auth";
import fs from "node:fs/promises";
import path from "path";

connect("melonbowl");
const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

// Serve static files
app.use(express.static(staticDir));

// Middleware to parse JSON bodies
app.use(express.json());

// Public routes (no authentication required)
app.use("/auth", auth);

// Protected routes (authentication required)
app.use("/api/dishes", authenticateUser, dishes); 

// SPA Routes: /app/...
app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});