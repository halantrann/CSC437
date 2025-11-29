// packages/server/src/models/index.ts

export interface Recipe {
  _id?: string;
  name: string;
  imgSrc: string;
  imgAlt?: string;
  mealType: string;
  cuisine: string;
  taste: string;
  calories: string;
  prepTime: string;
  cookTime: string;
  ingredients: string[];
  instructions: string[];
}