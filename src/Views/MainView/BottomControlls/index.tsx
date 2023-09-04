import SearchIcon from "@src/shared/Icons/SearchIcon";
import styled from "styled-components/native";
import { IMainViewProps } from "..";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DraggableAction from "./DraggableAction";
import UsersIcon from "@src/shared/Icons/UsersIcon";
import { CubeButton } from "@src/shared/Buttons";

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

