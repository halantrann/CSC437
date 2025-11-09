// src/index.ts

import Dishes from "./services/dish-svc";
import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import dishes from "./routes/dishes";
import auth from "./routes/auth";

connect("melonbowl");
const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));
// Middleware:
app.use(express.json());

app.use("/api/dishes", dishes);
app.use("/auth", auth);

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get("/dishes/:name", (req: Request, res: Response) => {
  const { name } = req.params;

  Dishes.get(name).then((data) => {
    if (data) res
      .set("Content-Type", "application/json")
      .send(JSON.stringify(data));
    else res
      .status(404).send();
  });
});