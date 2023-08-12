import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { trigger } from "react-native-haptic-feedback";
import styled from 'styled-components'
import { useAppDispatch } from '../../store/hooks'
import { likeEvent, removeLikeOnEvent } from '../../api/events'
import HeartIcon from '../Icons/HeartIcon'
import { P } from '../Text';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../types/NavigationProps';

const LikeButton = ({ eventCid, isLiked, likeCount }: { eventCid: string, isLiked: boolean, likeCount?: number }) => {
    const [isLikedState, setIsLikedState] = useState(isLiked)
    const [likeCountState, setLikeCountState] = useState(likeCount)
    const navigation = useNavigation<NavigationProps>()
    const LikeEvent = async () => {
        setIsLikedState(true)
        if (likeCountState) {
            setLikeCountState(likeCountState + 1)
        }
        await likeEvent(eventCid)
    }
    const RemoveLikeOnEvent = async () => {
        setIsLikedState(false)
        if (likeCountState) {
            setLikeCountState(likeCountState + 1)
        }
        await removeLikeOnEvent(eventCid)
    }
    const HandleLikeEvent = async () => {
        if (isLikedState) {
            RemoveLikeOnEvent()
            trigger("rigid");
        } else {
            trigger("impactLight");
            LikeEvent()
        }
    }
    return (
        <StyledLikeContainer>
            <StyledLikeButton
                onPress={HandleLikeEvent}
                active={isLikedState}
            >
                <HeartIcon />
            </StyledLikeButton>
            {likeCountState && likeCountState > 0 &&
                <TouchableOpacity
                    onPress={() => navigation.navigate("EventLikesModalView", { eventCid })}
                >
                    <P textcolor='White'>{likeCountState}</P>
                </TouchableOpacity>
            }
        </StyledLikeContainer>
    )
}

export default LikeButton

const StyledLikeContainer = styled(View)`
    position: absolute;
    right: 16px;
    bottom: 12px;
    gap: 6px;
    align-items: center;
`
const StyledLikeButton = styled(TouchableOpacity) <{ active: boolean }>`
    background: ${props => props.active ? "rgba(211, 64, 30, 0.665)" : "rgba(184, 199, 229, 0.25)"};
    /* background-color: #a17f7f55; */
    transition: background 0.4s ease;
    padding: 12px;
    border-radius: 16px;
    display: flex;
`