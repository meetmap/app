import * as React from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components"
import LoadableProfileImage from "../LoadableImage/LoadableProfileImage"
import { useNavigation } from "@react-navigation/native"
import { NavigationProps } from "@src/types/NavigationProps"

interface IUserPin {
    profilePicture: string | undefined
}
const UserPin = ({ profilePicture }: IUserPin) => {
    const navigation = useNavigation<NavigationProps>();
    return (
        <StyledUserPinView onPress={() => navigation.navigate("SelfProfileView")}>
            <LoadableProfileImage containerSize={40} profilePicture={profilePicture} />
        </StyledUserPinView>
    )
}

export default UserPin


const StyledUserPinView = styled(TouchableOpacity)`
    border: solid 2px white;
    background-color: black;
    border-radius: 36px;
    padding: 1px;

`
