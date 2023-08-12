import React, { useEffect, useState } from 'react'
import { store } from '../store/store';
import getClusters, { ClusterPoint } from './useSuperCluster';
import { Region } from 'react-native-maps';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Dimensions } from 'react-native';
import { useMap } from './MapProvider';
import { getEventsByLocationThunk } from '../store/slices/eventsSlice';

const useEventsOnMap = () => {
    const { mapViewRef, getCamera } = useMap()
    const mapFilter = useAppSelector(state => state.mapSlice.mapFilters);
    const windowWidth = Dimensions.get('window').width;
    const [zoomLevel, setZoomLevel] = useState(5);
    // need to setZoomLevel on mount before events fetch
    const userCoords = useAppSelector(state => state.locationSlice.userCoordinates)

    const [clusters, setClusters] = useState<ClusterPoint[]>([]);
    const dispatch = useAppDispatch()


    const getEventsByCoordinates = async (region: Region,) => {
        if (mapFilter === 'Friends') {
            return;
        }
        const scale = (156_543.03392 * Math.cos((region.latitude * Math.PI) / 180)) / 2 ** zoomLevel;
        const visibleRadius = ((scale * windowWidth) / 2 / 1000) * 10;
        await dispatch(
            getEventsByLocationThunk({
                lat: region.latitude,
                lng: region.longitude,
                radius: visibleRadius,
            }),
        );
    }

    const changeZoomLevel = (region: Region) => {
        if (mapFilter === 'Friends') {
            return;
        }
        const zoomLevelI = Math.log2(360 * (windowWidth / 256 / region.longitudeDelta)) + 1;
        setZoomLevel(zoomLevelI);
    }

    const clusterizeEvents = async () => {
        if (mapFilter === 'Friends') {
            return;
        }
        const boundsData = await mapViewRef.current?.getMapBoundaries();
        if (!boundsData) {
            return;
        }
        const clustersData = getClusters({
            points: store.getState().eventsSlice.eventsGeo,
            bounds: [
                boundsData?.southWest.longitude - 0.02,
                boundsData?.southWest.latitude - 0.02,
                boundsData?.northEast.longitude + 0.02,
                boundsData?.northEast.latitude + 0.02,
            ],
            zoom: zoomLevel,
            options: {
                radius: 105,
                maxZoom: 40,
                minZoom: 2,
                reduce: (accumulated, props) => {
                    accumulated.cids = [...accumulated.cids, ...props.cids];
                },
            },
        });

        setClusters(clustersData);
    }

    useEffect(() => {
        if(!userCoords){
            return
        }
        const zoomLevelI = Math.log2(360 * (windowWidth / 256 / 0.0421)) + 1;
        setZoomLevel(zoomLevelI);
        getEventsByCoordinates({
            latitude: userCoords.lat, longitude: userCoords.lng,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0421,
        })
        clusterizeEvents()
    }, [!!userCoords])



    return {
        clusterizeEvents,
        changeZoomLevel,
        getEventsByCoordinates,
        clusters
    }
}

export default useEventsOnMap