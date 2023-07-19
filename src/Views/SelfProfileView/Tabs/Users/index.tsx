import { useState } from "react";
import Friends from "./Friends";
import UsersSearch from "./UsersSearch";
import { View } from "react-native";
import styled from "styled-components/native";

const Users = () => {
  const [searchUsersInputData, setSearchUsersInputData] = useState<string | null>(null)

  return (
    <UsersContainer>
      <UsersSearch searchUsersInputData={searchUsersInputData} setSearchUsersInputData={setSearchUsersInputData}/>
      <Friends searchUsersInputData={searchUsersInputData}/>
    </UsersContainer >
  );
};

export default Users;

const UsersContainer = styled(View)`
display: flex;
flex-direction: column;
  gap: 12px;
  padding:  0 16px;
`;
