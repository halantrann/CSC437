// /src/routes/dishes.ts

import express, { Request, Response } from "express";
import { DishElement } from "../models/dish"; 

import Dishes from "../services/dish-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
	Dishes.index()
		.then((list: DishElement[]) => res.json(list))
	.catch((err) => res.status(500).send(err));
});

router.get("/:name", (req: Request, res: Response) => {
	const { name } = req.params;

	Dishes.get(name)
	.then((dish: DishElement) => res.json(dish))
	.catch((err) => res.status(404).send(err));
});

export default router;
