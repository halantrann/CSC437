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

router.post("/", (req: Request, res: Response) => {
	const newDish = req.body;

	Dishes.create(newDish)
		.then((dish: DishElement) => res.status(201).json(dish))
		.catch((err) => res.status(500).send(err));
});

router.put("/:name", (req: Request, res: Response) => {
	const { name } = req.params;
	const newDish = req.body;

	Dishes.update(name, newDish)
		.then((dish: DishElement) => res.json(dish))
		.catch((err) => res.status(404).end());
});

router.delete("/:name", (req: Request, res: Response) => {
	const { name } = req.params;

	Dishes.remove(name)
		.then(() => res.status(204).end())
		.catch((err) => res.status(404).send(err));
});

export default router;
