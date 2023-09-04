import React, { RefObject, useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { useAppDispatch, useAppSelector } from '@src/store/hooks'
import { P } from '../Text'
import { hideErrorModal } from '@src/store/slices/globalErrorSlice'
import { TouchableOpacity } from 'react-native'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'
import { NavigationContainerRef } from '@react-navigation/native'
import { NavigationProps } from '@src/types/NavigationProps'

const ErrorPopup = ({ navigationRef }: { navigationRef: RefObject<NavigationContainerRef<NavigationProps>> }) => {
    const { errorMessage } = useAppSelector(state => state.globalErrorSlice)
    const dispatch = useAppDispatch()
    const [routeName, setRouteName] = useState<string | undefined>(undefined)



    useEffect(() => {
        setRouteName(navigationRef.current?.getCurrentRoute()?.name)
        if (errorMessage) {
            const timer = setTimeout(() => {
                dispatch(hideErrorModal());
            }, 2500);

            return () => clearTimeout(timer);
        }
    }, [errorMessage, dispatch]);

    if (routeName === "MainView") {
        return null
    }
    if (errorMessage) {
        return (
            <StyledErrorPopup
                entering={FadeInDown}
                exiting={FadeInUp}
            >
                <StyledErrorPopupMessage>
                    <P>{errorMessage}</P>
                </StyledErrorPopupMessage>
                <TouchableOpacity>
                    <P textcolor='Primary' onPress={() => dispatch(hideErrorModal())}>Hide</P>
                </TouchableOpacity>
            </StyledErrorPopup>
        )
    }
    return null
}

export default ErrorPopup

const StyledErrorPopup = styled(Animated.View)`
    padding: 12px 16px;
    border-radius: 12px;
    background-color: white;
    position: absolute;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    bottom: 24px;
    gap: 12px;
    left: 16px;
    right: 16px;
`
const StyledErrorPopupMessage = styled.View`
    flex: 1;
    flex-direction: row;
`