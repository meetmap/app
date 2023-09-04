import React, { ReactNode, useCallback, useRef, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { NavigationProps} from '@src/types/NavigationProps';
import BottomSheet, { BottomSheetProps } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation} from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import GoBackArrowIcon from '../Icons/GoBackArrowIcon';
import BottomSheetBackdrop from './BottomSheetBackdrop';

export interface IAppBottomSheet extends BottomSheetProps {
    children: ReactNode
    // snpPoints?: string[]
    snapIndex?: number
}

const AppBottomSheet = ({ children, snapIndex = 0, ...rest }: IAppBottomSheet) => {
    const sheetRef = useRef<BottomSheet>(null);
    const navigation = useNavigation<NavigationProps>()

    const [sheetFullscreen, setSheetFullscreen] = useState(false)

    const handleSheetChange = useCallback((index: number) => {
        const snapArray = rest.snapPoints as []
        if (snapArray.toString().includes("100")) {
            setSheetFullscreen(snapArray.length === index + 1)
        }
    }, []);

    const handleClosePress = useCallback(() => {
        navigation.goBack()
    }, []);

    const { top } = useSafeAreaInsets()

    // const containerAnimatedStyle = useAnimatedStyle(() => ({
    //     opacity: interpolate(
    //         animatedIndex.value,
    //         [0, 2],
    //         [0.5, 1],
    //         Extrapolate.CLAMP
    //     ),
    // }));
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <BottomSheet
                    index={snapIndex}
                    ref={sheetRef}
                    backdropComponent={BottomSheetBackdrop}
                    onClose={() => navigation.goBack()}
                    onChange={handleSheetChange}
                    enablePanDownToClose
                    handleStyle={{ position: "absolute", width: "100%", display: sheetFullscreen ? "none" : "flex" }}
                    style={{ overflow: 'hidden', borderRadius: 36 }}
                    backgroundStyle={{ overflow: "hidden" }}
                    // backgroundComponent={BottomSheetBackground}
                    handleIndicatorStyle={{ width: 40 }}
                    {...rest}
                >
                    {/* <View style={{ flex: 1 }}> */}
                    {children}
                    {sheetFullscreen &&
                        <Animated.View
                            entering={FadeIn}
                            exiting={FadeOut}
                            style={{ position: "absolute", top: top, paddingHorizontal: 16 }}
                        >
                            <TouchableOpacity onPress={handleClosePress}>
                                <GoBackArrowIcon />
                            </TouchableOpacity>
                        </Animated.View>
                    }
                    {/* </View> */}
                </BottomSheet>
            </View >
        </GestureHandlerRootView >
    );
};

export default AppBottomSheet;

