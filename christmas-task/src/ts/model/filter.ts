import { Color, Shape, Size, Order } from "./enums";
import { FilteredColors } from "./filteredColors";
import { FilteredShapes } from "./filteredShapes";

export type Filter = {
  str?: string,
  countFrom?: number,
  countTo?: number,
  yearFrom?: number,
  yearTo?: number
  shape?: FilteredShapes,
  color?: FilteredColors,
  size?: Size[],
  onlyFavorites?: boolean,
  order?: Order
}