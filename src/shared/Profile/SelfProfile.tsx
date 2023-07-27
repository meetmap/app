import styled from "styled-components/native";
import { IPartialUser, IUserSelf } from "../../types/users";
import { Image, View } from "react-native";
import { H1, P } from "../Text";
import LoadableProfileImage from "../LoadableImage/LoadableProfileImage";

const SelfProfileInfo = ({ userData }: { userData: IUserSelf }) => {
    return (
        <StyledUserInfoHead>
            <LoadableProfileImage profilePicture={userData.profilePicture} />
            <StyledUserTextInfo>
                <StyledUserTextGeneralInfo>
                    {userData.name && <H1>{userData.name}</H1>}
                    <StyledUserProfileInfo>
                        <P textcolor="Primary">{`@${userData.username}`}</P>
                        <P textcolor="Grey">•</P>
                        <P textcolor="Grey">{`${userData.friends?.length} friends`}</P>
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
  padding: 0 16px;
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
