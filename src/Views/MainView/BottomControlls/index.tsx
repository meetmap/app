import { useAppDispatch } from "../../../store/hooks";
import CubeButton from "../../../shared/Buttons/CubeButton";
import SearchIcon from "../../../shared/Icons/SearchIcon";
import { Image, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { IMainViewProps } from "..";

const BottomControlls = ({ navigation }: IMainViewProps) => {

    return (
        <StyledBottomControlls>
            <CubeButton onPress={() => navigation.navigate('FilterModalView')}><SearchIcon /></CubeButton>
            <StyledProfileButton onPress={() => navigation.navigate('SelfProfileView')}>
                <StyledProfileButtonImage source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                }} />
            </StyledProfileButton>
            <StyledCubeButton>
            </StyledCubeButton>
        </StyledBottomControlls>
    )
}

export default BottomControlls

const StyledBottomControlls = styled(View)`
    flex-direction: row;
    justify-content: center;
    gap: 36px;
    align-items: center;
`

const StyledProfileButton = styled(TouchableOpacity)`
    padding: 5px;
    background-color: white;
    border-radius: 22px;
    height: 64px;
    width: 64px;
`
const StyledProfileButtonImage = styled(Image)`
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 18px;
`

const StyledCubeButton = styled(CubeButton)`
    position: relative;
    overflow: hidden;
    label{
        display: flex;
        position: absolute;
    }
`