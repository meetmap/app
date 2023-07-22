import { LegacyRef, RefObject, createContext, useCallback, useEffect, useRef, useState } from "react";
import MapView, { Details, Marker, Region } from "react-native-maps"
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setAddressState } from "../../../store/slices/mapSlice";
import UserMarker from "./UserMarker";
import { useMap } from "../../../hooks/MapProvider";
import { debounce } from "lodash";
import { Dimensions } from "react-native";
import { getEventsByLocationThunk } from "../../../store/slices/eventsSlice";
import useSupercluster, { ClusterPoint } from "../../../hooks/useSuperCluster";
import EventsClusters from "./EventsClusters";
import { IEvent } from "../../../types/event";
import { store } from "../../../store/store";
import UsersClusters from "./UsersClusters";


const MapContent = () => {
    const { mapViewRef } = useMap();
    const { userCoordinates } = useAppSelector(state => state.locationSlice)

    const dispatch = useAppDispatch()
    const [clusters, setClusters] = useState<ClusterPoint[]>([])
    const mapFiler = useAppSelector(state => state.mapSlice.mapFilters)
    // const toGeoJson = (payload: IEvent[]) => {
    //     return payload.map(feature => ({
    //         type: 'Feature' as "Feature",
    //         properties: {
    //           cluster: false,
    //           data: feature,
    //           picture: [feature.picture]
    //         },
    //         geometry: {
    //           type: 'Point' as "Point",
    //           coordinates: [
    //             feature.location.coordinates.coordinates[0],
    //             feature.location.coordinates.coordinates[1]
    //           ]
    //         }
    //       }));
    // }

    const handleRegionChangeComplete = async (region: Region, details: Details) => {
        const data = await mapViewRef.current?.addressForCoordinate({ latitude: region.latitude, longitude: region.longitude })
        dispatch(setAddressState(data))

        if (mapFiler === "Friends") {
            return;
        }

        const scale = 156_543.03392 * Math.cos(region.latitude * Math.PI / 180) / 2 ** zoomLevel
        const visibleRadius = scale * windowWidth / 2 / 1000 * 4;
        await dispatch(getEventsByLocationThunk(
            {
                lat: region.latitude,
                lng: region.longitude,
                radius: visibleRadius
            }
        ))
    };


    const windowWidth = Dimensions.get('window').width;
    const [zoomLevel, setZoomLevel] = useState(20)

    const handleRegionChange = debounce(async (region: Region) => {
        if(mapFiler === "Friends"){
            return
        }
        const zoomLevelI = Math.log2(360 * (windowWidth / 256 / region.longitudeDelta)) + 1;
        setZoomLevel(zoomLevelI);
        const boundsData = await mapViewRef.current?.getMapBoundaries();
        if (!boundsData) {
            return
        }
        const clustersData = useSupercluster({
            points: store.getState().eventsSlice.eventsGeo,
            bounds: [boundsData?.southWest.longitude - 0.02, boundsData?.southWest.latitude - 0.02, boundsData?.northEast.longitude + 0.02, boundsData?.northEast.latitude + 0.02],
            zoom: zoomLevel,
            options: {
                radius: 75,
                maxZoom: 40,
                minZoom: 2,
                reduce: (accumulated, props) => {
                    // Объедините массивы изображений из каждой точки и кластера
                    accumulated.picture = [...accumulated.picture, ...props.picture];
                },
            },
        });

        setClusters(clustersData)
    }, 300, { maxWait: 300 })



    return (
        <MapView
            ref={mapViewRef}
            style={{ flex: 1 }}
            showsCompass={false}
            initialRegion={{
                latitude: userCoordinates?.lat || 0,
                longitude: userCoordinates?.lng || 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            userInterfaceStyle={"light"}
            showsPointsOfInterest={false}
            onRegionChange={handleRegionChange}
            onRegionChangeComplete={handleRegionChangeComplete}
        >
            <EventsClusters clusters={clusters} />
            <UsersClusters />
            <UserMarker />
        </MapView >
    )

}

export default MapContent
