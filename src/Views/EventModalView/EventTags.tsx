import React from 'react'
import { View } from 'react-native'
import { Line } from 'react-native-svg'
import { H3 } from '../../shared/Text'
import { useTranslation } from 'react-i18next'
import EventTag from '../../shared/Tags/EventTag'
import { IEvent, ITag } from '../../types/event'
import styled from 'styled-components'

interface IEventTags {
    tags: ITag[]
}
const EventTags = ({ tags }: IEventTags) => {
    const { t } = useTranslation()
    return (
        <View style={{ paddingHorizontal: 16, gap: 16 }}>
            <Line />
            <StyledTagsView>
                <View style={{ flexDirection: "row" }}>
                    <H3>{t("tags")}</H3>
                    {/* <TouchableOpacity>
                                <InfoIcon />
                            </TouchableOpacity> */}
                </View>
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                    {tags.map(tag => (
                        <EventTag key={tag.cid} tag={tag} />
                    ))}
                </View>
            </StyledTagsView>
        </View>
    )
}

export default EventTags

const StyledTagsView = styled(View)`
    gap: 6px;
`