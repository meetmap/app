import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import CubeButton from "../../../shared/Buttons/CubeButton";
import SearchIcon from "../../../shared/Icons/SearchIcon";
import { Image, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { IMainViewProps } from "..";
import { SafeAreaView } from "react-native-safe-area-context";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import DraggableAction from "./DraggableAction";
import UsersIcon from "../../../shared/Icons/UsersIcon";

const BottomControlls = ({ navigation }: IMainViewProps) => {

    return (
        <GestureHandlerRootView>
            <StyledBottomControlls>
                <CubeButton onPress={() => navigation.navigate('SearchModalView')}><SearchIcon /></CubeButton>
                <DraggableAction />
                <CubeButton onPress={() => navigation.navigate("FriendsModalView")}>
                    <UsersIcon />
                </CubeButton>
            </StyledBottomControlls>
        </GestureHandlerRootView>
    )
}

export default BottomControlls

const StyledBottomControlls = styled(SafeAreaView)`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    flex-direction: row;
    justify-content: center;
    gap: 36px;
    align-items: center;
`

