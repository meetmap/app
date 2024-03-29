import React, { useState } from 'react'
import { View } from 'react-native';
import styled from 'styled-components';
import UsersSearch from './Users/UsersSearch';
import Friends from './Users/Friends';
import AppBottomSheet from '@src/shared/AppBottomSheet';

export const FriendsModalView = () => {
    const [searchUsersInputData, setSearchUsersInputData] = useState<string | null>(null)
    return (
        <AppBottomSheet snapPoints={["40%", "90%"]}>
            <UsersContainer>
                <UsersSearch searchUsersInputData={searchUsersInputData} setSearchUsersInputData={setSearchUsersInputData} />
                {!searchUsersInputData &&
                    <Friends />
                }
            </UsersContainer >
        </AppBottomSheet>
    )
}

const UsersContainer = styled(View)`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 12px;
  padding:  16px;
  background-color: white;
`;
