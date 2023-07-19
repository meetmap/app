import { mapConfig } from '@utils/configs/mapbox/mapbox.config'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Map, { Layer, MapRef, MapboxEvent, Marker, Source, ViewStateChangeEvent } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { getEventsByLocationThunk } from '@store/slices/eventsSlice';
import { AnimatePresence } from 'framer-motion';

import { setViewState } from '@store/slices/mapSlice';
import useSupercluster from '@hooks/useSuperCluster';
import EventPin from '@shared/Pins/EventPin';
import ClusterEventPin from '@shared/Pins/ClusterEventPin';
import EventsClusters from './EventsClusters';
const MapContent = () => {
    const dispatch = useAppDispatch()
    const { viewState } = useAppSelector(state => state.mapSlice)
    const eventsdata = useAppSelector(state => state.eventsSlice.eventsGeo)

    const onMoveEnd = (evt: ViewStateChangeEvent) => {
        const zoomLevel = evt.viewState.zoom;
        const scale = 156_543.03392 * Math.cos(evt.viewState.latitude * Math.PI / 180) / 2 ** zoomLevel
        const visibleRadius = scale * window.innerWidth / 2 / 1000 * 2;
        dispatch(getEventsByLocationThunk(
            {
                lat: evt.viewState.latitude,
                lng: evt.viewState.longitude,
                radius: visibleRadius
            }
        ))
    }
    const mapRef = useRef<MapRef>(null);

    const [bounds, setBounds] = useState<[number, number, number, number] | undefined>(undefined)
    const onLoad = (evt: MapboxEvent) => {
        setBounds(evt.target.getBounds().toArray().flat() as [number, number, number, number])
    }

    const { clusters } = useSupercluster({
        points: eventsdata,
        bounds,
        zoom: viewState?.zoom || 20,
        options: {
            radius: 75,
            maxZoom: 40,
            reduce: (accumulated, props) => {
                // Объедините массивы изображений из каждой точки и кластера
                accumulated.picture = [...accumulated.picture, ...props.picture];
            },
        },
    });
    const onMove = useCallback((evt: ViewStateChangeEvent) => {
        dispatch(setViewState(evt.viewState))
    }, []);
    
    return (
        <Map
            ref={mapRef}
            onMoveEnd={onMoveEnd}
            // onViewportChange={newViewport => setViewport(newViewport)}
            onLoad={onLoad}
            onMove={onMove}
            {...mapConfig}
        >
            <EventsClusters clusters={clusters}/>
        </Map>
    )
}

export default MapContent
