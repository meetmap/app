import React, { useEffect, useState } from "react";
import { H3, Span } from "../../../../../shared/Text";
import ChooseFrendsListType from "../../../../../shared/Actions/Users/ChooseFrendsListType";
import VerticalArrowSmIcon from "../../../../../shared/Icons/VerticalArrowSmIcon";
import FriendsList from "./FriendsList";
import { Line } from "react-native-svg";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

const Friends = ({ searchUsersInputData }: { searchUsersInputData: string | null }) => {
    const [friendListType, setFriendListType] = useState("Friends")

    if (!searchUsersInputData) {
        return (
            <>
                <StyledUsersListInfo>
                    <H3>{friendListType}</H3>
                    <StyledListsButton onPress={() => ChooseFrendsListType(setFriendListType)}>
                        <Span textcolor="Primary">Lists</Span><VerticalArrowSmIcon />
                    </StyledListsButton>
                </StyledUsersListInfo>
                <FriendsList friendListType={friendListType} setFriendListType={setFriendListType} />
            </>
        )
    }
    return null
}

export default Friends

const StyledUsersListInfo = styled(View)`
  padding: 0 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const StyledListsButton = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0;
  color: ${props => props.theme.colors.BUTTON.Primary.BGDefault};
`