import { RefObject } from "react";
import { useMap } from "../MapProvider";
import MapView from "react-native-maps";

export const flyTo = (lat: number, lng: number, mapViewRef: RefObject<MapView>) => {
    mapViewRef.current?.animateToRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    })
}