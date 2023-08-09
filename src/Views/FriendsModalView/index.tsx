import React, { useState } from 'react'
import { View } from 'react-native';
import styled from 'styled-components';
import UsersSearch from './Users/UsersSearch';
import Friends from './Users/Friends';

const FriendsModalView = () => {
    const [searchUsersInputData, setSearchUsersInputData] = useState<string | null>(null)

    return (
        <UsersContainer>
            <UsersSearch searchUsersInputData={searchUsersInputData} setSearchUsersInputData={setSearchUsersInputData} />
            {!searchUsersInputData &&
                <Friends />
            }
        </UsersContainer >
    )
}

export default FriendsModalView

const UsersContainer = styled(View)`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 12px;
  padding:  16px;
  background-color: white;
`;
