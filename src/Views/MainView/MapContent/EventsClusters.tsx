import ClusterEventPin from '@shared/Pins/ClusterEventPin'
import EventPin from '@shared/Pins/EventPin'
import { AnimatePresence } from 'framer-motion'
import React, { useMemo } from 'react'
import { Marker } from 'react-map-gl'

const EventsClusters = ({ clusters }) => {
    return (
        <>
            {clusters.map((cluster, index) => {
                const [long, lat] = cluster.geometry.coordinates
                if (cluster.properties.cluster) {
                    return (
                        <Marker
                            key={`cluster${cluster.properties.data.id, index}`}
                            longitude={long}
                            latitude={lat}
                        >
                            <ClusterEventPin
                                eventData={cluster.properties.data}
                                count={cluster.properties.point_count}
                                coordinates={[long, lat]}
                                pictures={cluster.properties.picture}
                            />
                        </Marker>
                    )
                }
                return (
                    <Marker
                        key={`pin${cluster.properties.data.id}`}
                        longitude={long}
                        latitude={lat}
                    >
                        <EventPin eventData={cluster.properties.data} />
                    </Marker>
                )
            })}

        </>
    )
}

export default EventsClusters