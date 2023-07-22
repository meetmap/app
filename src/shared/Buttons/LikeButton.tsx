import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { useAppDispatch } from '../../store/hooks'
import { likeEvent, removeLikeOnEvent } from '../../api/events'
import HeartIcon from '../Icons/HeartIcon'

const LikeButton = ({ eventId, isLiked }: { eventId: string, isLiked: boolean }) => {
    const [isLikedState, setIsLikedState] = useState(isLiked)
    const LikeEvent = async () => {
        setIsLikedState(true)
        await likeEvent(eventId)
    }
    const RemoveLikeOnEvent = async () => {
        setIsLikedState(false)
        await removeLikeOnEvent(eventId)
    }
    const HandleLikeEvent = async () => {
        if (!isLikedState) {
            LikeEvent()
        } else {
            RemoveLikeOnEvent()
        }
    }
    return (
        <StyledLikeButton
            onPress={HandleLikeEvent}
            active={isLikedState}
        >
            <HeartIcon />
        </StyledLikeButton>
    )
}

export default LikeButton

const StyledLikeButton = styled(TouchableOpacity) <{ active: boolean }>`
    position: absolute;
    right: 16px;
    bottom: 16px;
    background: ${props => props.active ? "rgba(211, 64, 30, 0.665)" : "rgba(184, 199, 229, 0.25)"};
    /* background-color: #a17f7f55; */
    transition: background 0.4s ease;
    padding: 12px;
    border-radius: 16px;
    display: flex;
`