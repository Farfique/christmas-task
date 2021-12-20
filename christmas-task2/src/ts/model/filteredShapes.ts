import { Shape } from "./enums";

export type FilteredShapes = {
  -readonly [Property in keyof typeof Shape]: boolean
};