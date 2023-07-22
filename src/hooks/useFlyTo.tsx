import { useMap } from "./MapProvider";

export const flyTo = (lat: number, lng: number) => {
    const { mapViewRef } = useMap();
    mapViewRef.current?.animateToRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    })
}