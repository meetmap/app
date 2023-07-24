import { useContext } from "react";
import { MapProviderContext } from "./MapProvider";
import { Camera, Region } from "react-native-maps";
import { ICoordinates } from "../../types/location";

export const useMap = () => {
  const { mapViewRef } = useContext(MapProviderContext);
  

  const getCamera = async () => {
    return await mapViewRef?.current?.getCamera()
  }

  const onZoomInPress = async (coordinates: ICoordinates) => {
    await mapViewRef?.current?.getCamera().then((cam: Camera) => {
      if (cam.altitude) {
        mapViewRef?.current?.animateCamera({
          ...cam,
          altitude: cam.altitude / 2,
          center: {
            latitude: coordinates.lat,
            longitude: coordinates.lng,
          },
        });
      }
    });
  };

  const flyTo = async (coordinates: ICoordinates) => {
    await mapViewRef?.current?.getCamera().then((cam: Camera) => {
      if (cam.altitude) {
        mapViewRef?.current?.animateCamera({
          ...cam,
          pitch: 32,
          altitude: 300,
          center: {
            latitude: coordinates.lat,
            longitude: coordinates.lng,
          },
        });
      }
    });
  };



  return {
    onZoomInPress,
    flyTo,
    mapViewRef,
    getCamera
  };
};
