import React, { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { useMap } from '../../../hooks/MapProvider'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from '../../../types/NavigationProps'
import Animated, { runOnJS, useAnimatedReaction, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { Gesture, GestureDetector, TouchableOpacity } from 'react-native-gesture-handler'
import styled from 'styled-components'
import LoadableProfileImage from '../../../shared/LoadableImage/LoadableProfileImage'
import { Text, View } from 'react-native'
import { trigger } from 'react-native-haptic-feedback'
import DragArrowIcon from '../../../shared/Icons/DragArrowIcon'
import PlusIcon from '../../../shared/Icons/PlusIcon'
import CompassIcon from '../../../shared/Icons/CompassIcon'
import UsersIcon from '../../../shared/Icons/UsersIcon'
import TicketIcon from '../../../shared/Icons/TicketIcon'
import FiltersIcon from '../../../shared/Icons/FiltersIcon'
import { setMapFiltersState } from '../../../store/slices/mapSlice'

const DraggableAction = () => {
    const profilePic = useAppSelector(state => state.userSlice.user?.profilePicture)
    const { flyTo } = useMap()
    const { userCoordinates } = useAppSelector(state => state.locationSlice)
    const navigation = useNavigation<NavigationProps>()

    const mapFilters = [
        {
            name: "Friends",
            icon: <UsersIcon />
        },
        {
            name: "Events",
            icon: <TicketIcon fill='black' />
        },
        {
            name: "All",
            icon: <FiltersIcon />
        }
    ]
    const mapFiler = useAppSelector(state => state.mapSlice.mapFilters)
    const dispatch = useAppDispatch()
    const filterIndex = mapFilters.findIndex(filter => filter.name === mapFiler)
    const changeMapFilters = () => {
        // if (filterIndex < mapFilters.length - 1) {
        //     dispatch(setMapFiltersState(mapFilters[filterIndex + 1].name))
        // } else {
        //     dispatch(setMapFiltersState(mapFilters[0].name))
        // }
        navigation.navigate("PublishMessageView")
    }

    const handleGoToProfile = async () => {
        navigation.navigate('SelfProfileView')
    }
    const handleGoToFriends = async () => {
        navigation.navigate('FriendsModalView')
    }
    const handleCreateEvent = async () => {
        navigation.navigate('CreateEventView')
    }

    const flyToUser = () => {
        if (!userCoordinates) {
            return
        }
        flyTo({ lat: userCoordinates.lat, lng: userCoordinates.lng }, false, 2800)
    }



    const minX = -65;
    const maxX = 65;
    const minY = -55;
    const maxY = 0;

    const isPressed = useSharedValue(false);
    const offset = useSharedValue({ x: 0, y: 0 });
    const rotation = useSharedValue(0);
    const leftBtnInRange = useSharedValue(false);
    const rightBtnInRange = useSharedValue(false);
    const topBtnInRange = useSharedValue(false);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: offset.value.x / 4 },
                { translateY: offset.value.y / 4 },
                { scale: withSpring(isPressed.value ? 1.2 : 1) },
                { rotateZ: `${rotation.value}deg` }
            ],
        };
    });
    const hiddenButtonSpringOptions = {
        damping: 15,
        mass: 1,
        stiffness: 100,
        overshootClamping: false,
    }
    const DragArrowIconAnimatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: withSpring(isPressed.value ? 0 : -30, hiddenButtonSpringOptions) },
            ],
        };
    });
    const hiddenButtonAnimatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: withSpring(isPressed.value ? 1 : 0, hiddenButtonSpringOptions) },
                { translateY: withSpring(isPressed.value ? -80 : 0, hiddenButtonSpringOptions) },
            ],
            backgroundColor: topBtnInRange.value ? "#464646" : "#302F2F"
        };
    });
    const hiddenButtonRAnimatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: withSpring(isPressed.value ? 1 : 0, hiddenButtonSpringOptions) },
                { translateY: withSpring(isPressed.value ? -50 : 0, hiddenButtonSpringOptions) },
                { translateX: withSpring(isPressed.value ? 60 : 0, hiddenButtonSpringOptions) },
                { rotateZ: '45deg' }
            ],
            backgroundColor: rightBtnInRange.value ? "#E6EAF2" : "white"
        };
    });
    const hiddenButtonLAnimatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: withSpring(isPressed.value ? 1 : 0, hiddenButtonSpringOptions) },
                { translateY: withSpring(isPressed.value ? -50 : 0, hiddenButtonSpringOptions) },
                { translateX: withSpring(isPressed.value ? -60 : 0, hiddenButtonSpringOptions) },
                { rotateZ: '-45deg' }
            ],
            backgroundColor: leftBtnInRange.value ? "#E6EAF2" : "white"
        };
    });

    const start = useSharedValue({ x: 0, y: 0 });
    const triggerHaptic = () => {
        trigger("impactLight")
    }
    const gestureStartTime = useSharedValue(0);

    useAnimatedReaction(() => leftBtnInRange.value || rightBtnInRange.value || topBtnInRange.value,
        (newValue, _oldValue) => {
            if (newValue) {
                runOnJS(triggerHaptic)();
            }
        },
        [leftBtnInRange, rightBtnInRange, topBtnInRange]
    )

    const gesture = Gesture
        .Pan()
        .onBegin(() => {
            isPressed.value = true;
            rotation.value = withSpring(15);
            runOnJS(triggerHaptic)();
            gestureStartTime.value = Date.now();
        })
        .onUpdate((e) => {
            const newX = e.translationX + start.value.x;
            const newY = e.translationY + start.value.y;

            offset.value = {
                x: Math.min(Math.max(newX, minX), maxX),
                y: Math.min(Math.max(newY, minY), maxY),
            };
            leftBtnInRange.value = offset.value.y <= minY + 35 && offset.value.x <= minX + 30;
            rightBtnInRange.value = offset.value.y <= minY + 35 && offset.value.x >= maxX - 30;
            topBtnInRange.value = offset.value.y <= minY + 10 && offset.value.x >= minX + 30 && offset.value.x <= maxX - 30;
        })
        .onEnd(() => {
            start.value = {
                x: offset.value.x,
                y: offset.value.y,
            };
        })
        .onFinalize((e) => {
            rotation.value = withSpring(0);
            isPressed.value = false;
            offset.value = withSpring({ x: 0, y: 0 }, {
                damping: 15, // Значение меньше делает пружину более "жесткой" (по умолчанию 10)
                mass: 1, // Масса объекта (по умолчанию 1)
                stiffness: 200, // Значение больше делает пружину более "мягкой" (по умолчанию 100)
                overshootClamping: false,
            });
            start.value = {
                x: 0,
                y: 0,
            };
            if (leftBtnInRange.value) runOnJS(flyToUser)();
            if (rightBtnInRange.value) runOnJS(changeMapFilters)();
            if (topBtnInRange.value) runOnJS(handleCreateEvent)();
            leftBtnInRange.value = false
            rightBtnInRange.value = false
            topBtnInRange.value = false

            const elapsedTime = Date.now() - gestureStartTime.value;
            const fastPressThreshold = 150; // Пороговое значение для быстрого нажатия (в миллисекундах)
            if (elapsedTime <= fastPressThreshold) {
                runOnJS(handleGoToProfile)()
            }
        });


    return (
        <>
            <StyledHiddenButton style={[{ backgroundColor: "#302F2F" }, hiddenButtonAnimatedStyles]}>
                <PlusIcon />
            </StyledHiddenButton>
            <StyledHiddenButton style={[hiddenButtonRAnimatedStyles]}>
                {mapFilters[filterIndex].icon}
            </StyledHiddenButton>
            <StyledHiddenButton style={[hiddenButtonLAnimatedStyles]}>
                <CompassIcon />
            </StyledHiddenButton>
            <Animated.View style={[{ position: "absolute" }, DragArrowIconAnimatedStyles]}>
                <DragArrowIcon />
            </Animated.View>
            <GestureDetector gesture={gesture}>
                <StyledProfileButton style={[animatedStyles]} >
                    <LoadableProfileImage containerSize={56} containerBorderRadius={18} profilePicture={profilePic} />
                </StyledProfileButton>
            </GestureDetector>
        </>
    )
}

export default DraggableAction

const StyledProfileButton = styled(Animated.View)`
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 22px;
    height: 64px;
    width: 64px;
`

const StyledHiddenButton = styled(Animated.View)`
    width: 48px;
    height: 48px;
    border-radius: 18px;
    position: absolute;
    border: solid 1px #DDE2ED;
    align-items: center;
    justify-content: center;
`