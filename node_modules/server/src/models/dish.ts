// src/models/dish.ts

export interface DishElement  {
  name?: string;
  imgSrc?: string;
  mealType?: string;
  cuisine?: string;
  taste?: string;
  calories?: string;
  prepTime?: string;
  cookTime?: string;
  ingredients?: string[];
  instructions?: string[];
}