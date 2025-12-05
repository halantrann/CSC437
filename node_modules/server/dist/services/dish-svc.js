"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var dish_svc_exports = {};
__export(dish_svc_exports, {
  default: () => dish_svc_default,
  deleteRecipe: () => deleteRecipe
});
module.exports = __toCommonJS(dish_svc_exports);
var import_mongoose = require("mongoose");
const DishSchema = new import_mongoose.Schema(
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
    instructions: [String]
  },
  { collection: "mb_dish" }
);
const DishModel = (0, import_mongoose.model)(
  "DishModel",
  DishSchema
);
function index() {
  return DishModel.find();
}
function get(name) {
  return DishModel.find({ name }).then((list) => list[0]).catch((err) => {
    throw `${name} Not Found`;
  });
}
function create(json) {
  const d = new DishModel(json);
  return d.save();
}
function update(name, dish) {
  return DishModel.findOneAndUpdate({ name }, dish, { new: true }).then((updated) => {
    if (!updated) throw `${name} Not Found`;
    else return updated;
  });
}
function remove(name) {
  return DishModel.findOneAndDelete({ name }).then((deleted) => {
    if (!deleted) throw `${name} Not Removed`;
  });
}
function getById(id) {
  return DishModel.findById(id).then((doc) => {
    if (!doc) {
      throw new Error(`Dish with ID ${id} not found`);
    }
    return doc;
  });
}
function updateById(id, dish) {
  return DishModel.findByIdAndUpdate(id, dish, { new: true }).then((updated) => {
    if (!updated) throw new Error(`Dish with ID ${id} not found`);
    return updated;
  });
}
function removeById(id) {
  return DishModel.findByIdAndDelete(id).then((deleted) => {
    if (!deleted) throw new Error(`Dish with ID ${id} not found`);
  });
}
function deleteRecipe(name) {
  return fetch(`/api/recipes/${name}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to delete recipe: ${response.statusText}`);
    }
    return response.json();
  });
}
var dish_svc_default = { index, get, getById, create, update, updateById, remove, removeById };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deleteRecipe
});
