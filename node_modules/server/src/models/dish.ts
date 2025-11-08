// src/models/dish.ts

export interface DishElement {
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
  link?: string;        //  recipe page links
  time?: string;        // total time display
}

export type Dish = DishElement; // alias to use either name 