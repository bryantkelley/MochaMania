export const Milks = [
  "almond",
  "breve",
  // "cashew",
  "coconut",
  "condensed",
  // "corn",
  // "evaporated",
  // "goat",
  // "hazelnut",
  "hemp",
  "macadamia",
  "oat",
  // "pea",
  // "potato",
  // "rice",
  // "skim",
  "soy",
  "whole",
] as const;

export type Milk = (typeof Milks)[number];

export const DrinkSizes = [6, 8, 10, 12, 16, 20, 24, 32] as const;
export type DrinkSize = (typeof DrinkSizes)[number];

export const DrinkTemps = ["iced", "hot"] as const;
export type DrinkTemp = (typeof DrinkTemps)[number];

export type MochaRating = {
  id?: string;
  locationName: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  date: string; // ISO
  size: DrinkSize | (number & {});
  milk: Milk | (string & {});
  temp: DrinkTemp;
  notes: string;
  score: 0 | 1 | 2;
};

export type StackParamList = {
  MainView: undefined;
  AddRating: undefined;
  DetailView: { rating: MochaRating };
  EditRating: { rating: MochaRating };
};
