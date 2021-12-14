import { Color, Shape, Size, Order } from "./enums";

export type Filter = {
  str?: string,
  countFrom?: number,
  countTo?: number,
  yearFrom?: number,
  yearTo?: number
  shape?: Shape[],
  color?: Color[],
  size?: Size[],
  onlyFavorites?: boolean,
  order?: Order
}