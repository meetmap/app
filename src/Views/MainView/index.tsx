import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';
import {RootStackParamList} from '../../types/NavigationProps';
import PrimaryButton from '../../shared/Buttons/PrimaryButton';
import LikeButton from '../../shared/Buttons/LikeButton';
import styled from 'styled-components/native';
import BottomControlls from './BottomControlls';
import MapContent from './MapContent';
import useLocation from '../../hooks/useLocation';
import MapHeader from './MapHeader';

export interface IMainViewProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MainView'>;
}

const MainView = ({navigation}: IMainViewProps) => {
  const {getLocationUpdates} = useLocation();
  useEffect(() => {
    getLocationUpdates();
  }, []);

  return (
    <StyledMainPageContainer>
      <MapContent />
      <MapHeader />
      <BottomControlls navigation={navigation} />
    </StyledMainPageContainer>
  );
};

export default MainView;

const StyledMainPageContainer = styled(View)`
  position: relative;
  width: 100%;
  height: 100%;
  flex-direction: column;
  /* background: linear-gradient(180deg, #0066FF 0%, rgba(148, 216, 255, 0) 25%); */
`;
