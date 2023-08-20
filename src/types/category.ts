export type CategoryId =
  // | "coffee"
  // | "matcha"
  // | "food"
  // | "milktea"
  // | "drinks"
  // | "bread"
  // | "juice";
  | "meat"
  | "seafood"
  | "vegetable"
  | "hotpot";

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
}
