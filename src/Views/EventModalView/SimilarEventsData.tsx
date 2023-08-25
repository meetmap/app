import React from 'react'
import { FlatList, View } from 'react-native'
import styled from 'styled-components'
import { H3 } from '../../shared/Text'
import { useTranslation } from 'react-i18next'
import useAxiosPaginated from '../../hooks/useAxiosPaginated'
import { IEvent } from '../../types/event'
import { getSimilarEventsByCid } from '../../api/events'
import LoaderContainer from '../../shared/LoaderContainer'
import EventLg from '../../shared/EventInList/EventLg'
import { IPaginateRespose } from '../../types/response'


interface ISimilarEventsData {
  similarEventsData: IPaginateRespose<IEvent> | null
}
const SimilarEventsData = ({ similarEventsData }: ISimilarEventsData) => {
  const { t } = useTranslation()
  if (similarEventsData && similarEventsData.totalCount > 0) {
    return (
      <StyledSimilarEventsContainer>
        <H3 style={{ paddingLeft: 16 }}>{t("similarEvents")}</H3>
        <FlatList
          ListFooterComponent={similarEventsData.nextPage ? <LoaderContainer /> : null}
          contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 16 }}
          data={similarEventsData.paginatedResults}
          horizontal={false}
          scrollEnabled={false}
          renderItem={({ item }) => <EventLg eventData={item} />}
          keyExtractor={item => item.id}
        />
      </StyledSimilarEventsContainer>
    )
  }
  return null
}

export default SimilarEventsData

const StyledSimilarEventsContainer = styled(View)`
    gap: 6px;
    padding-top: 24px;
`
