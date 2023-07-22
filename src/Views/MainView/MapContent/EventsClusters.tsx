import { Marker } from "react-native-maps"
import EventPin from "../../../shared/Pins/EventPin"
import { ClusterPoint } from "../../../hooks/useSuperCluster"
import ClusterEventPin from "../../../shared/Pins/ClusterEventPin"
import { useAppSelector } from "../../../store/hooks"

const EventsClusters = ({ clusters }: { clusters: ClusterPoint[] }) => {
    const mapFiler = useAppSelector(state => state.mapSlice.mapFilters)
    if (mapFiler === "Events" || mapFiler === "All") {
        return (
            <>
                {clusters.map((cluster, index) => {
                    const [long, lat] = cluster.geometry.coordinates
                    if (cluster.properties.cluster) {
                        return (
                            <Marker
                                key={`cluster${cluster.properties.data.id, index}`}
                                coordinate={{
                                    latitude: lat,
                                    longitude: long
                                }}
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
                            coordinate={{
                                latitude: lat,
                                longitude: long
                            }}
                        >
                            <EventPin eventData={cluster.properties.data} />
                        </Marker>
                    )
                })}

            </>
        )
    }
    return null
}

export default EventsClusters