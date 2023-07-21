import { useContext } from "react";
import { MapProviderContext } from "./MapProvider";
import { Region } from "react-native-maps";

export const useMap = () => {
  const { mapViewRef } = useContext(MapProviderContext);
  const flyTo = (coordinates: Region) => {
    if (!mapViewRef?.current) {
      return;
    }
    mapViewRef.current.animateToRegion(coordinates, 1000);
  };
  return {
    flyTo,
    mapViewRef,
  };
};
