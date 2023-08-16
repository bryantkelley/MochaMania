export type Milk =
  | "almond"
  | "breve"
  | "cashew"
  | "corn"
  | "coconut"
  | "condensed"
  | "evaporated"
  | "goat"
  | "hazelnut"
  | "hemp"
  | "macadamia"
  | "pea"
  | "potato"
  | "oat"
  | "rice"
  | "skim"
  | "soy"
  | "whole";

export type DrinkSizes = 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32;

export type DrinkTemps = "iced" | "hot" | "extra hot";

export type MochaRating = {
  locationName: string;
  coordinate?: {
    latitude: number;
    longitude: number;
  };
  date: string; // ISO
  size?: DrinkSizes;
  milk?: Milk | (string & {});
  temp?: DrinkTemps;
  notes?: string;
  score: 0 | 1 | 2;
};
