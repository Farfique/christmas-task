import { Size } from "./enums";

export type FilteredSizes = {
  -readonly [Property in keyof typeof Size]: boolean
}