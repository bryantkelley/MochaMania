import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { MochaRating } from "./types";

export const RatingsContext = createContext({
  ratings: [],
  addRating: (value: object) => {},
  dangerousClearAllRatings: () => {},
});

export const RatingsProvider = ({ children }: PropsWithChildren) => {
  const { getItem, setItem } = useAsyncStorage("ratings");

  const [ratings, setRatings] = useState<MochaRating[]>();

  const addRating = (value: MochaRating) => {
    setRatings((prev) => [...prev, value]);
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
    <RatingsContext.Provider value={{ ratings, addRating, dangerousClearAllRatings }}>
      {children}
    </RatingsContext.Provider>
  );
};
