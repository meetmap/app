import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import CubeButton from "../../../shared/Buttons/CubeButton";
import SearchIcon from "../../../shared/Icons/SearchIcon";
import { Image, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { IMainViewProps } from "..";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadableProfileImage from "../../../shared/LoadableImage/LoadableProfileImage";

const BottomControlls = ({ navigation }: IMainViewProps) => {
    const profilePic = useAppSelector(state => state.userSlice.user?.profilePicture)
    return (
        <StyledBottomControlls>
            <CubeButton onPress={() => navigation.navigate('FilterModalView')}><SearchIcon /></CubeButton>
            <StyledProfileButton onPress={() => navigation.navigate('SelfProfileView')}>
                <LoadableProfileImage containerSize={56} containerBorderRadius={18}  profilePicture={profilePic}  />
            </StyledProfileButton>
            <StyledCubeButton>
            </StyledCubeButton>
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

const StyledProfileButton = styled(TouchableOpacity)`
    align-items: center;
    justify-content: center;
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