import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { useAppDispatch } from '../../store/hooks'
import { likeEvent, removeLikeOnEvent } from '../../api/events'
import HeartIcon from '../Icons/HeartIcon'

const LikeButton = ({ eventId, isLiked }: { eventId: string, isLiked: boolean }) => {
    const [isLikedState, setIsLikedState] = useState(isLiked)
    const dispatch = useAppDispatch()
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
    left: 16px;
    bottom: 16px;
    /* background: ${props => props.active ? "linear-gradient(180deg, rgba(255, 85, 47, 0.665) 0%, rgba(255, 64, 64, 0.699) 65.04%)" : "rgba(184, 199, 229, 0.25)"}; */
    background-color: red;
    transition: background 0.4s ease;
    padding: 12px;
    border-radius: 16px;
    display: flex;
`