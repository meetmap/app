import { Marker } from "react-native-maps"
import EventPin from "../../../shared/Pins/EventPin"
import { ClusterPoint } from "../../../hooks/useSuperCluster"
import ClusterEventPin from "../../../shared/Pins/ClusterEventPin"
import { useAppSelector } from "../../../store/hooks"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"

const AnimatedMarker = Animated.createAnimatedComponent(Marker);

const EventsClusters = ({ clusters }: { clusters: ClusterPoint[] }) => {
    const mapFiler = useAppSelector(state => state.mapSlice.mapFilters)
    if (mapFiler === "Events" || mapFiler === "All") {
        return (
            <>
                {clusters.map((cluster, index) => {
                    const [long, lat] = cluster.geometry.coordinates
                    if (cluster.properties.cluster) {
                        console.log(cluster.properties.data.id)
                        return (
                            <AnimatedMarker
                                entering={FadeIn}
                                key={`cluster${cluster.properties.data.id}`}
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
                            </AnimatedMarker>
                        )
                    }
                    return (
                        <AnimatedMarker
                            entering={FadeIn}
                            key={`pin${cluster.properties.data.id}`}
                            coordinate={{
                                latitude: lat,
                                longitude: long
                            }}
                        >
                            <EventPin eventData={cluster.properties.data} />
                        </AnimatedMarker>
                    )
                })}

            </>
        )
    }
    return null
}

export default EventsClusters