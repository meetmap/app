import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import CubeButton from "../../../shared/Buttons/CubeButton";
import SearchIcon from "../../../shared/Icons/SearchIcon";
import { Image, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { IMainViewProps } from "..";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadableProfileImage from "../../../shared/LoadableImage/LoadableProfileImage";
import { setMapFiltersState } from "../../../store/slices/mapSlice";
import ChangeFiltersButton from "./ChangeFiltersButton";
import { useMap } from "../../../hooks/MapProvider";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import DraggableAction from "./DraggableAction";

const BottomControlls = ({ navigation }: IMainViewProps) => {

    return (
        <StyledBottomControlls>
            <CubeButton onPress={() => navigation.navigate('FilterModalView')}><SearchIcon /></CubeButton>
            <DraggableAction />
            <ChangeFiltersButton />
        </StyledBottomControlls>
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

