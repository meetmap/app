import React, { useEffect, useRef } from 'react'
import { useAppSelector } from '../../../store/hooks'
import { useMap } from '../../../hooks/MapProvider'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from '../../../types/NavigationProps'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { Gesture, GestureDetector, TouchableOpacity } from 'react-native-gesture-handler'
import styled from 'styled-components'
import LoadableProfileImage from '../../../shared/LoadableImage/LoadableProfileImage'
import { View } from 'react-native'
import { trigger } from 'react-native-haptic-feedback'

const DraggableAction = () => {
    const profilePic = useAppSelector(state => state.userSlice.user?.profilePicture)
    const { areCoordinatesInVisibleRegion, flyTo } = useMap()
    const { userCoordinates } = useAppSelector(state => state.locationSlice)
    const navigation = useNavigation<NavigationProps>()

    const handleCheckUser = async () => {
        if (!userCoordinates) {
            navigation.navigate('SelfProfileView')
            return
        }
        const isInView = await areCoordinatesInVisibleRegion({ lat: userCoordinates.lat, lng: userCoordinates.lng })
        if (isInView) {
            navigation.navigate('SelfProfileView')
            return
        }
        flyTo({ lat: userCoordinates.lat, lng: userCoordinates.lng }, 2000)
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
        damping: 15, // Значение меньше делает пружину более "жесткой" (по умолчанию 10)
        mass: 1, // Масса объекта (по умолчанию 1)
        stiffness: 100, // Значение больше делает пружину более "мягкой" (по умолчанию 100)
        overshootClamping: false,
    }
    const hiddenButtonAnimatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: withSpring(isPressed.value ? 1 : 0, hiddenButtonSpringOptions) },
                { translateY: withSpring(isPressed.value ? -80 : 0, hiddenButtonSpringOptions) },
            ],
            backgroundColor: topBtnInRange.value ? "#E6EAF2" : "white"
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
    const gesture = Gesture
        .Pan()
        .onBegin(() => {
            isPressed.value = true;
            rotation.value = withSpring(15);
            runOnJS(triggerHaptic)();
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
            topBtnInRange.value = offset.value.y <= minY + 30 && offset.value.x >= minX + 30 && offset.value.x <= maxX - 30;
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
            if (leftBtnInRange.value) runOnJS(handleCheckUser)();
            leftBtnInRange.value = false
            rightBtnInRange.value = false
            topBtnInRange.value = false
        });

    return (
        <>
            <StyledHiddenButton style={[hiddenButtonAnimatedStyles]}>

            </StyledHiddenButton>
            <StyledHiddenButton style={[hiddenButtonRAnimatedStyles]}>

            </StyledHiddenButton>
            <StyledHiddenButton style={[hiddenButtonLAnimatedStyles]}>

            </StyledHiddenButton>
            <GestureDetector gesture={gesture}>
                <TouchableOpacity activeOpacity={1} onPress={handleCheckUser}>
                    <StyledProfileButton style={[animatedStyles]} >
                        <LoadableProfileImage containerSize={56} containerBorderRadius={18} profilePicture={profilePic} />
                    </StyledProfileButton>
                </TouchableOpacity>
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
    background-color: red;
    width: 48px;
    height: 48px;
    border-radius: 18px;
    position: absolute;
    border: solid 1px #DDE2ED;
`