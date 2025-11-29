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

// ADDED: Get dish by ID (must come BEFORE /:name to match MongoDB IDs)
router.get("/:id", (req: Request, res: Response) => {
	const { id } = req.params;

	// Check if it looks like a MongoDB ID (24 hex characters)
	if (/^[0-9a-fA-F]{24}$/.test(id)) {
		Dishes.getById(id)
			.then((dish: DishElement) => {
				if (!dish) {
					res.status(404).json({ error: "Dish not found" });
				} else {
					res.json(dish);
				}
			})
			.catch((err) => res.status(500).json({ error: err.message }));
	} else {
		// If not an ID, treat it as a name
		Dishes.get(id)
			.then((dish: DishElement) => {
				if (!dish) {
					res.status(404).json({ error: "Dish not found" });
				} else {
					res.json(dish);
				}
			})
			.catch((err) => res.status(404).json({ error: err.message }));
	}
});

router.post("/", (req: Request, res: Response) => {
	const newDish = req.body;

	Dishes.create(newDish)
		.then((dish: DishElement) => res.status(201).json(dish))
		.catch((err) => res.status(500).send(err));
});

router.put("/:id", (req: Request, res: Response) => {
	const { id } = req.params;
	const newDish = req.body;

	// Check if it's a MongoDB ID or a name
	if (/^[0-9a-fA-F]{24}$/.test(id)) {
		// It's an ID
		Dishes.updateById(id, newDish)
			.then((dish: DishElement) => res.json(dish))
			.catch((err) => res.status(404).send(err));
	} else {
		// It's a name
		Dishes.update(id, newDish)
			.then((dish: DishElement) => res.json(dish))
			.catch((err) => res.status(404).send(err));
	}
});
router.delete("/:id", (req: Request, res: Response) => {
	const { id } = req.params;

	if (/^[0-9a-fA-F]{24}$/.test(id)) {
		Dishes.removeById(id)
			.then(() => res.status(204).end())
			.catch((err) => res.status(404).send(err));
	} else {
		Dishes.remove(id)
			.then(() => res.status(204).end())
			.catch((err) => res.status(404).send(err));
	}
});

export default router;