import React, { useEffect } from 'react'
import styled from 'styled-components/native'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { H6, P } from '../Text'
import { hideErrorModal } from '../../store/slices/globalErrorSlice'
import { Button, TouchableOpacity } from 'react-native'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'

const ErrorPopup = () => {
    const { errorMessage } = useAppSelector(state => state.globalErrorSlice)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                dispatch(hideErrorModal());
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [errorMessage, dispatch]);

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