import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { RootStackParamList } from '../../types/NavigationProps';
import styled from 'styled-components/native';
import { H1, Title } from '../../shared/Text';
import BottomSheet, { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export interface IMyBottomSheet {
    navigation: NativeStackNavigationProp<RootStackParamList, 'MyBottomSheet'>;
}

const MyBottomSheet = ({ navigation }: IMyBottomSheet) => {
    const sheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ["25%", "50%", "100%"], []);

    // callbacks
    const handleSheetChange = useCallback((index) => {
        console.log("handleSheetChange", index);
    }, []);
    // const handleSnapPress = useCallback((index) => {
    //     sheetRef.current?.snapToIndex(index);
    // }, []);
    // const handleClosePress = useCallback(() => {
    //     sheetRef.current?.close();
    // }, []);

    // render
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <View>
                <BottomSheet
                    ref={sheetRef}
                    snapPoints={snapPoints}
                    onClose={() => navigation.goBack()}
                    onChange={handleSheetChange}
                    enablePanDownToClose
                >
                    {/* <BottomSheetView> */}
                        <View>
                            <H1>Hello</H1>
                        </View>
                    {/* </BottomSheetView> */}
                </BottomSheet>
            </View>
        </GestureHandlerRootView>
    );
};

export default MyBottomSheet;

const styles = StyleSheet.create({
});


const StyledMyBottomSheet = styled(View)`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 22px 22px 0 0;
    padding: 16px;
    /* background-color: white; */
    height: 300px;
`