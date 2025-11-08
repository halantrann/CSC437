// src/services/dish-svc.ts

import { Schema, model } from "mongoose";
import { Dish, DishElement } from "../models/dish";

const DishSchema = new Schema<DishElement>(
  {
    name: { type: String, required: true, trim: true },
    imgSrc: { type: String, required: true, trim: true },
    mealType: { type: String, required: true, trim: true },
    cuisine: { type: String, required: true, trim: true },
    taste: { type: String, required: true, trim: true },
    calories: { type: String, required: true, trim: true },
    prepTime: { type: String, required: true, trim: true },
    cookTime: { type: String, required: true, trim: true },
    ingredients: [String],
    instructions: [String],
  },
  { collection: "mb_dish" }
);

const DishModel = model<DishElement>(
  "DishModel",
  DishSchema
);

// Return all dishes
function index(): Promise<DishElement[]> {
  return DishModel.find();
}

// Get one dish by name 
function get(name: String): Promise<DishElement> {
  return DishModel.find({ name })
    .then((list) => list[0])
    .catch((err) => {
      throw `${name} Not Found`;
    });
}

function create(json: DishElement): Promise<DishElement> {
  const d = new DishModel(json);
  return d.save();
}

function update(name: String, dish: DishElement):
  Promise<DishElement> {
  return DishModel.findOneAndUpdate({ name }, dish, { new: true }).then((updated) => {
    if (!updated) throw `${name} Not Found`;
    else return updated as Dish;
  });
}

function remove(name: String): Promise<void> {
  return DishModel.findOneAndDelete({ name }).then((deleted) => {
    if (!deleted) throw `${name} Not Removed`;
  });
}

export default { index, get, create, update, remove };