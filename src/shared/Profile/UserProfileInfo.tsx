import styled from "styled-components/native";
import { IPartialUser, IUserSelf } from "../../types/users";
import { Image, TouchableOpacity, View } from "react-native";
import { H1, P } from "../Text";
import LoadableImage from "../LoadableImage/LoadableImage";
import LoadableProfileImage from "../LoadableImage/LoadableProfileImage";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../types/NavigationProps";
import { useTranslation } from "react-i18next";
// import AppIcon from '../../assets/appIcon.png'
const UserProfileInfo = ({ userData }: { userData: IPartialUser }) => {
  const navigation = useNavigation<NavigationProps>()
  const { t } = useTranslation()
  return (
    <StyledUserInfoHead>
      <LoadableProfileImage profilePicture={userData.profilePicture} />
      <StyledUserTextInfo>
        <StyledUserTextGeneralInfo>
          {userData.name && <H1>{userData.name}</H1>}
          <TouchableOpacity onPress={() => navigation.navigate("UsersListModalView", { userCId: userData.cid, username: userData.username })}>
            {userData.friends && <P textcolor="Grey">{t('friendCount', { count: userData.friends.length })}</P>}
          </TouchableOpacity>
        </StyledUserTextGeneralInfo>
        {userData.description && <P textcolor="Grey" style={{ textAlign: "center", paddingHorizontal: 18 }}>{userData.description}</P>}
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
  padding: 16px;
`;
const StyledUserTextInfo = styled(View)`
  align-items: center;
  display: flex;
  gap: 8px;
  flex-direction: column;
  text-align: center;
  padding: 0 22px;
`;
const StyledUserProfileInfo = styled(View)`
  flex-direction: row;
  gap: 4px;
`
const StyledUserTextGeneralInfo = styled(View)`
  gap: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledSocialNetworks = styled(View)`
  display: flex;
  gap: 16px;
`;
