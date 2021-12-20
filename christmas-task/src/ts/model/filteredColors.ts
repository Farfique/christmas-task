import { Color } from "./enums";

export type FilteredColors = {
  -readonly [Property in keyof typeof Color]: boolean
}