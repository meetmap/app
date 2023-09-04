import { Marker } from "react-native-maps"
import EventPin from "@src/shared/Pins/EventPin"
import { ClusterPoint } from "@src/hooks/useSuperCluster"
import ClusterEventPin from "@src/shared/Pins/ClusterEventPin"
import { useAppSelector } from "@src/store/hooks"
import Animated, { FadeIn } from "react-native-reanimated"
import { useNavigation } from "@react-navigation/native"
import { NavigationProps } from "@src/types/NavigationProps"

const AnimatedMarker = Animated.createAnimatedComponent(Marker);

const EventsClusters = ({ clusters }: { clusters: ClusterPoint[] }) => {
    const mapFiler = useAppSelector(state => state.mapSlice.mapFilters)
    const navigation = useNavigation<NavigationProps>()
    if (mapFiler === "Events" || mapFiler === "All") {
        return (
            <>
                {clusters.map((cluster) => {
                    const [lng, lat] = cluster.geometry.coordinates
                    if (cluster.properties.cluster) {
                        return (
                            <AnimatedMarker
                                onPress={() => navigation.navigate("EventsListModalView", { eventCids: cluster.properties.cids })}
                                entering={FadeIn}
                                key={`cluster${cluster.properties.data.cid}`}
                                coordinate={{
                                    latitude: lat,
                                    longitude: lng
                                }}
                            >
                                <ClusterEventPin
                                    eventData={cluster.properties.data}
                                    count={cluster.properties.point_count}
                                    coordinates={[lng, lat]}
                                    cids={cluster.properties.cids}
                                />
                            </AnimatedMarker>
                        )
                    }
                    return (
                        <AnimatedMarker
                            entering={FadeIn}
                            onPress={() => navigation.navigate("EventModalView", { eventCid: cluster.properties.data.cid })}
                            key={`pin${cluster.properties.data.cid}`}
                            coordinate={{
                                latitude: lat,
                                longitude: lng
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