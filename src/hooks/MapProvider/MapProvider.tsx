import React, { createContext, useRef, RefObject } from "react";
import MapView from "react-native-maps";

interface IMapContext {
  mapViewRef: RefObject<MapView>;
}
export const MapProviderContext = createContext<IMapContext>({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  mapViewRef: null,
});

export const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const mapViewRef = useRef<MapView>(null);

  return (
    <MapProviderContext.Provider
      value={{
        mapViewRef,
      }}
    >
      {children}
    </MapProviderContext.Provider>
  );
};
