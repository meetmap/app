import React from 'react'
import styled from 'styled-components/native'
import { H3, H5, Span } from '@src/shared/Text'
import { ICreator } from '@src/types/event'
import useAxios from '@src/hooks/useAxios'
import { getUserById } from '@src/api/users'
import { ActivityIndicator, View } from 'react-native'
import { IPartialUser } from '@src/types/users'
import LoadableProfileImage from '@src/shared/LoadableImage/LoadableProfileImage'
import { useTranslation } from 'react-i18next'
import FriendshipStatusButton from '@src/shared/Buttons/Users/FriendshipStatusButton'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from '@src/types/NavigationProps'

const EventCreatorInfo = ({ creator }: { creator?: ICreator }) => {
    if (creator) {
        const { data, loading } = useAxios<IPartialUser>(getUserById(creator.creatorCid))
        const { t } = useTranslation()
        const navigation = useNavigation<NavigationProps>()
        if (loading) {
            <ActivityIndicator
                animating={true}
            />
        }
        if (data) {
            return (
                <StyledEventCreatorSection>
                    <H3>{t("organizer")}</H3>
                    <StyledEventCreatorInfoContainer onPress={() => navigation.navigate("ProfileView", { userCid: data.cid })}>
                        <StyledEventCreatorInfo>
                            <StyledEventCreatorImage containerSize={48} containerBorderRadius={12} profilePicture={data.profilePicture} />
                            <StyledEventCreatorGeneralInfo>
                                <H5>{data.name || data.username}</H5>
                                <Span>{t('friendCount', { count: data.friends.totalCount })}</Span>
                            </StyledEventCreatorGeneralInfo>
                        </StyledEventCreatorInfo>
                        <View style={{ justifyContent: 'center' }}>
                            <FriendshipStatusButton userData={data} />
                        </View>
                    </StyledEventCreatorInfoContainer>
                </StyledEventCreatorSection>
            )
        }
        return null
    }
    return null
}

export default EventCreatorInfo

const StyledEventCreatorInfoContainer = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
`
const StyledEventCreatorInfo = styled.View`
    flex-direction: row;
    gap: 10px;
`

const StyledEventCreatorSection = styled.View`
    padding: 0 16px;
    gap: 6px;
`

const StyledEventCreatorGeneralInfo = styled.View`
    gap: 4px;
    justify-content: center;
`
const StyledEventCreatorImage = styled(LoadableProfileImage)`
    border: solid 1px ${props => props.theme.colors.BUTTON.Secondary.BorderDefault};
`