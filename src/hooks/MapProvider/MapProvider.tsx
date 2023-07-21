import React, { createContext, Dispatch, SetStateAction, useRef, RefObject } from "react";
import MapView from "react-native-maps";

type UseStateT<T> = [T, Dispatch<SetStateAction<T>>];
interface IMapContext {
  mapViewRef: RefObject<MapView>;
}
export const MapProviderContext = createContext<IMapContext>({
  //@ts-ignore
  cameraRef: null,
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
