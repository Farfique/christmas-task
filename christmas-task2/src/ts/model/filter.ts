import { Color, Shape, Size, Order } from "./enums";
import { FilteredColors } from "./filteredColors";
import { FilteredShapes } from "./filteredShapes";
import { FilteredSizes } from "./filteredSizes";

export type Filter = {
  str?: string,
  countFrom?: number,
  countTo?: number,
  yearFrom?: number,
  yearTo?: number
  shape?: FilteredShapes,
  color?: FilteredColors,
  size?: FilteredSizes,
  onlyFavorites?: boolean,
  order?: Order
}