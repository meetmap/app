import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { trigger } from "react-native-haptic-feedback";
import styled from 'styled-components'
import { likeEvent, removeLikeOnEvent } from '@src/api/events'
import HeartIcon from '../Icons/HeartIcon'
import { H6 } from '../Text';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@src/types/NavigationProps';

export const LikeButton = ({ eventCid, isLiked, likeCount }: { eventCid: string, isLiked: boolean, likeCount?: number }) => {
    const [isLikedState, setIsLikedState] = useState(isLiked)
    const [likeCountState, setLikeCountState] = useState(likeCount)
    const navigation = useNavigation<NavigationProps>()
    const updateLike = async (action: "like" | "unlike") => {
        const increment = action === "like" ? 1 : -1;

        setIsLikedState(action === "like");
        setLikeCountState(state => (state !== undefined ? state + increment : undefined));

        if (action === "like") {
            await likeEvent(eventCid);
            trigger("impactLight");
        } else {
            await removeLikeOnEvent(eventCid);
            trigger("rigid");
        }
    };

    const HandleLikeEvent = async () => {
        updateLike(isLikedState ? "unlike" : "like");
    };
    return (
        <StyledLikeContainer>
            <StyledLikeButton
                onPress={HandleLikeEvent}
                active={isLikedState}
            >
                {isLikedState ?
                    <HeartIcon color={"#FF4D4D"} />
                    :
                    <HeartIcon color={"white"} />
                }
            </StyledLikeButton>
            {!!likeCountState && likeCountState > 0 &&
                <TouchableOpacity
                    onPress={() => navigation.navigate("EventLikesModalView", { eventCid })}
                >
                    <H6 style={{ textShadowColor: "#101114", textShadowOffset: { width: 1, height: 2 }, textShadowRadius: 5, width: 30, textAlign: "center" }} textcolor='White'>{likeCountState}</H6>
                </TouchableOpacity>
            }
        </StyledLikeContainer>
    )
}


const StyledLikeContainer = styled(View)`
    position: absolute;
    right: 16px;
    bottom: 12px;
    /* gap: 6px; */
    align-items: center;
`
const StyledLikeButton = styled(TouchableOpacity) <{ active: boolean }>`
    background: ${props => props.active ? "rgba(211, 63, 30, 0.401)" : "rgba(184, 199, 229, 0.25)"};
    /* background-color: #a17f7f55; */
    transition: background 0.4s ease;
    padding: 12px;
    border-radius: 16px;
    display: flex;
    /* box-shadow: 2px 2px 4px #101114c5; */
`