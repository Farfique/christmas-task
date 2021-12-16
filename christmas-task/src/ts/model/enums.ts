export enum Shape {
  Bell = "колокольчик",
  Ball = "шар",
  Cone = "шишка",
  Star = "звезда",
  Snowflake = "снежинка",
  Figurine = "фигурка"
}

export enum Size {
  Small = "маленький",
  Medium = "средний",
  Big = "большой"
}

export enum Color {
  White = "белый",
  Yellow = "жёлтый",
  Red = "красный",
  Blue = "голубой",
  Green = "зелёный"
}

export enum Order {
  TitleAsc = 'По названию (возр.)',
  TitleDesc = 'По названию (убыв.)',
  YearAsc = 'По году (возр.)',
  YearDesc = 'По году (убыв.)'
}

export enum FilterCategoriesNames {
  all = 'Все',
  year = 'Год приобретения',
  count = 'Количество экземпляров',
  //shape = 'Форма',
  //color = 'Цвет',
  //size = 'Размер',
  //onlyFavorites: 'Только любимые' 
}
