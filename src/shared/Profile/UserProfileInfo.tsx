import styled from "styled-components/native";
import { IPartialUser, IUserSelf } from "../../types/users";
import { Image, View } from "react-native";
import { H1, P } from "../Text";
// import AppIcon from '../../assets/appIcon.png'
const UserProfileInfo = ({ userData }: { userData: IPartialUser | IUserSelf }) => {
  return (
    <StyledUserInfoHead>
      <StyledUserIcon borderRadius={50} width={100} height={100} source={{ uri: userData.profilePicture }} />
      <StyledUserTextInfo>
        <StyledUserTextGeneralInfo>
          {userData.name && <H1>{userData.name}</H1>}
          <P textcolor="Primary">{`@${userData.username}`}</P>
        </StyledUserTextGeneralInfo>
        {userData.description && <P textcolor="Grey">{userData.description}</P>}
      </StyledUserTextInfo>
      {/* <StyledSocialNetworks>
        <InstagramIcon />
        <FacebookIcon />
        <TwitterIcon />
      </StyledSocialNetworks> */}
    </StyledUserInfoHead>
  );
};

export default UserProfileInfo;

const StyledUserInfoHead = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const StyledUserIcon = styled(Image)`
  width: 100px;
  height: 100px;
  background-color: black;
`;
const StyledUserTextInfo = styled(View)`
  align-items: center;
  display: flex;
  gap: 6px;
  flex-direction: column;
  text-align: center;
  padding: 0 22px;
`;
const StyledUserTextGeneralInfo = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;
const StyledSocialNetworks = styled(View)`
  display: flex;
  gap: 16px;
`;
