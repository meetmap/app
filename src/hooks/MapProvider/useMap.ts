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

  const flyTo = async (coordinates: ICoordinates, altitude?: number) => {
    await mapViewRef?.current?.getCamera().then((cam: Camera) => {
      if (cam.altitude) {
        mapViewRef?.current?.animateCamera({
          ...cam,
          pitch: 32,
          altitude: altitude || 300,
          center: {
            latitude: coordinates.lat,
            longitude: coordinates.lng,
          },
        }, {duration: 800});
      }
    });
  };

  const areCoordinatesInVisibleRegion = async (coordinates: ICoordinates) => {
    if (!mapViewRef.current) return false;

    // Получаем информацию о текущей видимой области карты
    const region = await mapViewRef.current.getMapBoundaries();

    // Сравниваем координаты с границами видимой области
    const { northEast, southWest } = region;

    const { lat, lng } = coordinates

    return (
      lat >= southWest.latitude &&
      lat <= northEast.latitude &&
      lng >= southWest.longitude &&
      lng <= northEast.longitude
    );
  };



  return {
    onZoomInPress,
    flyTo,
    mapViewRef,
    getCamera,
    areCoordinatesInVisibleRegion
  };
};
