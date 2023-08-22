import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import type { MochaRating } from "./types";

const exampleRatings: MochaRating[] = [
  {
    id: "d363b759-c092-4347-b787-c6e6f76275e1",
    locationName: "Anchorhead",
    date: "",
    size: 10,
    temp: "hot",
    milk: "oat",
    score: 2,
    notes: "",
  },
  {
    id: "b10eadd4-7d1a-41c5-90bf-7ae42df643ee",
    locationName: "Realfine",
    date: "",
    size: 12,
    temp: "iced",
    milk: "oat",
    score: 0,
    notes: "",
  },
  {
    id: "9749d384-aa2a-4f27-85f2-36d89d28e2ec",
    locationName: "Tailwind Cafe",
    date: "",
    size: 12,
    temp: "hot",
    milk: "oat",
    score: 2,
    notes: "",
  },
  {
    id: "a5f2277a-32a6-44a5-b7ad-8c83971f8e52",
    locationName: "Analog",
    date: "",
    size: 12,
    temp: "iced",
    milk: "oat",
    score: 1,
    notes: "",
  },
  {
    id: "4b2e4ccb-3fa3-46ff-8bfb-6ca098c8c441",
    locationName: "Eltana",
    date: "",
    size: 12,
    temp: "hot",
    milk: "whole",
    score: 2,
    notes: "",
  },
  {
    id: "df8e9f14-082e-4916-b7c1-d564596b09b0",
    locationName: "Dough Joy",
    date: "",
    size: 12,
    temp: "hot",
    milk: "oat",
    score: 2,
    notes: "",
  },
  {
    id: "7932336c-68b2-432a-9f2d-249674f07f19",
    locationName: "Espresso Vivace",
    date: "",
    size: 12,
    temp: "iced",
    milk: "whole",
    score: 1,
    notes: "",
  },
  {
    id: "e17f9ef6-4f9f-443a-955e-b6f700f50593",
    locationName: "Caffe Vita",
    date: "",
    size: 12,
    temp: "iced",
    milk: "oat",
    score: 0,
    notes: "",
  },
];

export const RatingsContext = createContext({
  ratings: [],
  addRating: (value: MochaRating) => {},
  updateRating: (id: string, value: MochaRating) => {},
  dangerousClearAllRatings: () => {},
  dangerousLoadExampleRatings: () => {},
});

export const RatingsProvider = ({ children }: PropsWithChildren) => {
  const { getItem, setItem } = useAsyncStorage("ratings");

  const [ratings, setRatings] = useState<MochaRating[]>();

  const addRating = (value: MochaRating) => {
    setRatings((prev) => [{ ...value, id: uuidv4() }, ...prev]);
  };

  const updateRating = (id: string, value: MochaRating) => {
    setRatings((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          return value;
        }
        return r;
      })
    );
  };

  const dangerousLoadExampleRatings = () => {
    setRatings(exampleRatings);
  };

  const dangerousClearAllRatings = () => {
    setRatings([]);
  };

  useEffect(() => {
    const getRatings = async () => {
      console.log("getting ratings");
      try {
        const jsonValue = await getItem();
        console.log(jsonValue);
        setRatings(jsonValue !== null ? JSON.parse(jsonValue) : []);
      } catch (e) {
        console.log("problem getting", e);
      }
    };

    const update = async () => {
      console.log("updating ratings");
      try {
        const jsonValue = JSON.stringify(ratings);
        console.log(jsonValue);
        await setItem(jsonValue);
      } catch (e) {
        console.log("problem updating", e);
      }
    };

    if (!ratings) {
      getRatings();
    } else {
      update();
    }
  }, [ratings]);

  return (
    <RatingsContext.Provider
      value={{
        ratings,
        addRating,
        updateRating,
        dangerousClearAllRatings,
        dangerousLoadExampleRatings,
      }}
    >
      {children}
    </RatingsContext.Provider>
  );
};
