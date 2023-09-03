import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { ITag } from '../../types/event'
import { P } from '../Text'
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated'

interface IFavTag {
    tag: ITag
    count: number
    favTags: { cid: string; value: number; }[]
    setFavTags: Dispatch<SetStateAction<{ cid: string; value: number; }[]>>
}

const FavTag = ({ tag, favTags, count, setFavTags }: IFavTag) => {

    const handleChangeFavValue = () => {
        const newFavTags = [...favTags]; 

        const existingTagIndex = newFavTags.findIndex(value => value.cid === tag.cid);
        if (existingTagIndex !== -1) {
            if (count === 3) {
                newFavTags.splice(existingTagIndex, 1); 
            } else {
                newFavTags[existingTagIndex] = { ...newFavTags[existingTagIndex], value: count + 1 }; 
            }
        } else {
            newFavTags.push({ cid: tag.cid, value: count + 1 }); 
        }
        setFavTags(newFavTags); 
    };



    const progress = useDerivedValue(() => {
        return withTiming(count || 0)
    })
    const animatedBackgroundOpacity = useAnimatedStyle(() => {
        const colorInterpolation = interpolateColor(
            progress.value,
            [0, 3],
            ['white', '#2672ff'] // Цвет при value = 0 и цвет при value = 3 с низкой прозрачностью
        );
        return {
            backgroundColor: colorInterpolation,
        };
    });

    return (
        <TouchableOpacity activeOpacity={1} onPress={() => handleChangeFavValue()}>
            <StyledFavTag style={[animatedBackgroundOpacity]}>
                <P textcolor={(count || 0) >= 1 ? "White" : "Black"}>{tag.label}</P>
            </StyledFavTag>
        </TouchableOpacity>
    )
}

export default FavTag

const StyledFavTag = styled(Animated.View)`
    padding: 6px 8px;
    border-radius: 12px;
    border: 1px solid #E6EAF2;
`