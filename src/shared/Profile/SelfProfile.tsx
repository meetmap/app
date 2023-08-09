import styled from "styled-components/native";
import { IPartialUser, IUserSelf } from "../../types/users";
import { Image, TouchableOpacity, View } from "react-native";
import { H1, P } from "../Text";
import LoadableProfileImage from "../LoadableImage/LoadableProfileImage";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../types/NavigationProps";

const SelfProfileInfo = ({ userData }: { userData: IUserSelf }) => {
  const { t } = useTranslation()
  const navigation = useNavigation<NavigationProps>()
  return (
    <StyledUserInfoHead>
      <LoadableProfileImage profilePicture={userData.profilePicture} />
      <StyledUserTextInfo>
        <StyledUserTextGeneralInfo>
          {userData.name && <H1>{userData.name}</H1>}
          <StyledUserProfileInfo>
            <P textcolor="Primary">{`@${userData.username}`}</P>
            <P textcolor="Grey">•</P>
            <TouchableOpacity onPress={() => navigation.navigate("FriendsModalView")}>
              <P textcolor="Grey">{t('friendCount', { count: userData.friends.length })}</P>
            </TouchableOpacity>
          </StyledUserProfileInfo>
        </StyledUserTextGeneralInfo>
        {userData.description && <P textcolor="Grey" style={{ textAlign: "center", paddingHorizontal: 18 }}>{userData.description}</P>}
      </StyledUserTextInfo>
    </StyledUserInfoHead>
  );
};

export default SelfProfileInfo;

const StyledUserInfoHead = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-bottom: 16px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledSocialNetworks = styled(View)`
  display: flex;
  gap: 16px;
`;
