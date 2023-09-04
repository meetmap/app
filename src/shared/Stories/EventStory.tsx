import React from 'react'
import { styled } from 'styled-components'
import Video from 'react-native-video';

const videoExampleUrl = "https://meetmap-assets.s3.eu-west-1.amazonaws.com/public/aws-s3-video-test/index.mpd"

export const EventStory = () => {
    return (
        <StyledEventStory
            source={{ uri: videoExampleUrl }} 
        />
    )
}

const StyledEventStory = styled(Video)`
    
`