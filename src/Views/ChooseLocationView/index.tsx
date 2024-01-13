import React, {useRef, useState} from 'react';
import {Image, SafeAreaView, TouchableOpacity, View} from 'react-native';
import SearchInput from '@src/shared/Input/SearchInput';
import MapView, {Address, Region} from 'react-native-maps';
import {useAppDispatch, useAppSelector} from '@src/store/hooks';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';
import {setEventFormValuesState} from '@src/store/slices/createEventFormSlice';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '@src/types/NavigationProps';
import {H2, H6} from '@src/shared/Text';
import {Line} from '@src/shared/Line';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {PrimaryButton} from '@src/shared/Buttons';

export const ChooseLocationView = () => {
  const {eventFormValues} = useAppSelector(state => state.createEventFormSlice);
  const coords = useAppSelector(state => state.locationSlice.userCoordinates);
  const [choosedLocalCoords, setChoosedLocalCoords] = useState(
    eventFormValues.location,
  );
  const [address, setAddress] = useState<Address | undefined>();
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const navigaion = useNavigation<NavigationProps>();
  const [searchData, setSearchData] = useState('');

  const miniMapRef = useRef<MapView>(null);

  const changeLocalCoords = async (region: Region) => {
    const {latitude, longitude} = region;
    setChoosedLocalCoords({lat: latitude, lng: longitude});
    const address = await miniMapRef.current?.addressForCoordinate({
      latitude,
      longitude,
    });
    setAddress(address);
  };
  const handleSubmitLocation = () => {
    dispatch(
      setEventFormValuesState({
        ...eventFormValues,
        location: choosedLocalCoords,
      }),
    );
    navigaion.goBack();
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{paddingHorizontal: 16, gap: 12, flex: 1}}>
        <SearchInput
          onChangeText={text => setSearchData(text)}
          placeholder={t('search')}
        />
        {searchData ? (
          <StyledSearchData entering={FadeIn} exiting={FadeOut}>
            <StyledAddressElement>
              <H6>Moscow, Russia, Edvarda griga 15</H6>
            </StyledAddressElement>
            <Line />
            <StyledAddressElement>
              <H6>Moscow, Russia, Edvarda griga 15</H6>
            </StyledAddressElement>
            <Line />
            <StyledAddressElement>
              <H6>Moscow, Russia, Edvarda griga 15</H6>
            </StyledAddressElement>
            <Line />
            <StyledAddressElement>
              <H6>Moscow, Russia, Edvarda griga 15</H6>
            </StyledAddressElement>
            <Line />
          </StyledSearchData>
        ) : (
          <Animated.View entering={FadeIn} exiting={FadeOut} style={{flex: 1}}>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <MapView
                ref={miniMapRef}
                onRegionChangeComplete={changeLocalCoords}
                initialRegion={{
                  latitude: eventFormValues.location?.lat || coords?.lat || 0,
                  longitude: eventFormValues.location?.lng || coords?.lng || 0,
                  latitudeDelta: 0.0222,
                  longitudeDelta: 0.0221,
                }}
                style={{flex: 1, width: '100%', borderRadius: 20}}
              />
              <StyledPinImage source={require('../../assets/LogoPin.png')} />
            </View>
            <StyledAddressView>
              <H2 style={{textAlign: 'center'}}>
                {address?.country}, {address?.administrativeArea},{' '}
                {address?.name}
              </H2>
            </StyledAddressView>
          </Animated.View>
        )}
        <PrimaryButton onPress={handleSubmitLocation} title={t('submit')} />
      </View>
    </SafeAreaView>
  );
};

const StyledPinImage = styled(Image)`
  width: 40px;
  transform: translateY(-20px);
  height: 40px;
  position: absolute;
`;
const StyledAddressView = styled(View)`
  top: 16px;
  left: 16px;
  right: 16px;
  position: absolute;
`;
const StyledSearchData = styled(Animated.ScrollView)`
  flex: 1;
`;
const StyledAddressElement = styled(TouchableOpacity)`
  padding: 16px 8px;
  /* border: 1px solid ${props =>
    props.theme.colors.BUTTON.Secondary.BorderDefault}; */
`;
