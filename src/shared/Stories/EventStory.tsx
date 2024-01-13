import React from 'react';
import {styled} from 'styled-components';
import Video, { LoadError } from 'react-native-video';

const videoExampleUrl =
  'https://meetmap-assets.s3.eu-west-1.amazonaws.com/public/aws-s3-video-test/index.mpd';

export const EventStory = () => {
  const onBuffer = () => {
    console.log('buffer')
  };
  const videoError = (error: LoadError) => {
    console.log(error)
  };
  return (
    <StyledEventStory
      style={{height: 100, width: 100}}
      source={{uri: videoExampleUrl}}
      onBuffer={onBuffer}
      onError={videoError}   
    />
  );
};

const StyledEventStory = styled(Video)``;
