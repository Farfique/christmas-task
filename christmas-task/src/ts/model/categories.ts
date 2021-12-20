import { FilterCategoriesNames } from "./enums";

export type FilterCategories = {
  -readonly [Property in keyof typeof FilterCategoriesNames]: boolean
}