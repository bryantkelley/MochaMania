import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import type { MochaRating } from "./types";

const exampleRatings: MochaRating[] = [
  {
    id: "d363b759-c092-4347-b787-c6e6f76275e1",
    locationName: "Anchorhead",
    coordinate: {
      latitude: 47.61205,
      longitude: -122.31697,
    },
    date: new Date("2023-08-22").toISOString(),
    size: 10,
    temp: "hot",
    milk: "oat",
    score: 2,
    notes: "Perfect",
  },
  {
    id: "b10eadd4-7d1a-41c5-90bf-7ae42df643ee",
    locationName: "Realfine",
    coordinate: {
      latitude: 47.61533,
      longitude: -122.32378,
    },
    date: new Date("2023-08-22").toISOString(),
    size: 12,
    temp: "iced",
    milk: "oat",
    score: 0,
    notes: "Fairly chalky, slight sour",
  },
  {
    id: "9749d384-aa2a-4f27-85f2-36d89d28e2ec",
    locationName: "Tailwind Cafe",
    coordinate: {
      latitude: 47.61373,
      longitude: -122.31738,
    },
    date: new Date("2023-08-22").toISOString(),
    size: 12,
    temp: "hot",
    milk: "oat",
    score: 2,
    notes: "Slightly too sweet, otherwise perfect",
  },
  {
    id: "a5f2277a-32a6-44a5-b7ad-8c83971f8e52",
    locationName: "Analog",
    coordinate: {
      latitude: 47.62071,
      longitude: -122.32539,
    },
    date: new Date("2023-08-22").toISOString(),
    size: 12,
    temp: "iced",
    milk: "oat",
    score: 1,
    notes: "Chalky, otherwise good",
  },
  {
    id: "4b2e4ccb-3fa3-46ff-8bfb-6ca098c8c441",
    locationName: "Eltana",
    coordinate: {
      latitude: 47.61502,
      longitude: -122.3167,
    },
    date: new Date("2023-08-22").toISOString(),
    size: 12,
    temp: "hot",
    milk: "whole",
    score: 2,
    notes: "Kinda perfect",
  },
  {
    id: "df8e9f14-082e-4916-b7c1-d564596b09b0",
    locationName: "Dough Joy",
    coordinate: {
      latitude: 47.61422,
      longitude: -122.31469,
    },
    date: new Date("2023-08-22").toISOString(),
    size: 12,
    temp: "hot",
    milk: "oat",
    score: 2,
    notes: "Perfect, came with a donut hole",
  },
  {
    id: "7932336c-68b2-432a-9f2d-249674f07f19",
    locationName: "Espresso Vivace",
    coordinate: {
      latitude: 47.62161,
      longitude: -122.32105,
    },
    date: new Date("2023-08-22").toISOString(),
    size: 12,
    temp: "iced",
    milk: "whole",
    score: 1,
    notes: "Slight chalk within tolerance, far too much ice",
  },
  {
    id: "e17f9ef6-4f9f-443a-955e-b6f700f50593",
    locationName: "Caffe Vita",
    coordinate: {
      latitude: 47.614,
      longitude: -122.31907,
    },
    date: new Date("2023-08-22").toISOString(),
    size: 12,
    temp: "iced",
    milk: "oat",
    score: 0,
    notes: "Chalky and far too much ice",
  },
];

export const RatingsContext = createContext({
  ratings: [] as MochaRating[],
  addRating: (value: MochaRating) => {},
  updateRating: (id: string, value: MochaRating) => {},
  deleteRating: (id: string) => {},
  dangerousClearAllRatings: () => {},
  dangerousLoadExampleRatings: () => {},
  initialRegion: {
    latitude: 47.60998,
    longitude: -122.34262,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  },
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

  const deleteRating = (id: string) => {
    setRatings((prev) => prev.filter((m) => m.id !== id));
  };

  const dangerousLoadExampleRatings = () => {
    setRatings(exampleRatings);
  };

  const dangerousClearAllRatings = () => {
    setRatings([]);
  };

  useEffect(() => {
    const getRatings = async () => {
      try {
        const jsonValue = await getItem();
        setRatings(jsonValue !== null ? JSON.parse(jsonValue) : []);
      } catch (e) {
        console.log("problem getting", e);
      }
    };

    const update = async () => {
      try {
        const jsonValue = JSON.stringify(ratings);
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

  const [initialRegion, setInitialRegion] = useState({
    latitude: 47.60898,
    longitude: -122.33993,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  });

  useEffect(() => {
    const updateInitialRegion = () => {
      let sumLat = 0;
      let sumLong = 0;
      ratings.forEach((r) => {
        sumLat += r.coordinate.latitude;
        sumLong += r.coordinate.longitude;
      });
      const avgLat = sumLat / ratings.length;
      const avgLong = sumLong / ratings.length;
      let diffLat = 0.00005;
      let diffLong = 0.00005;
      ratings.forEach((r) => {
        const avgLatDiff = Math.abs(avgLat - r.coordinate.latitude);
        if (avgLatDiff > diffLat) {
          diffLat = avgLatDiff;
        }

        const avgLongDiff = Math.abs(avgLong - r.coordinate.longitude);
        if (avgLongDiff > diffLong) {
          diffLong = avgLongDiff;
        }
      });

      setInitialRegion({
        latitude: avgLat,
        longitude: avgLong,
        latitudeDelta: diffLat * 3,
        longitudeDelta: diffLong * 3,
      });
    };

    if (ratings?.length) {
      updateInitialRegion();
    }
  }, [ratings]);

  return (
    <RatingsContext.Provider
      value={{
        ratings,
        addRating,
        updateRating,
        deleteRating,
        dangerousClearAllRatings,
        dangerousLoadExampleRatings,
        initialRegion,
      }}
    >
      {children}
    </RatingsContext.Provider>
  );
};
