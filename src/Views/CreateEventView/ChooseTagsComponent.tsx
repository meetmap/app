import React from 'react';
import {H3, H6, P, Span} from '@src/shared/Text';
import styled from 'styled-components';
import {TouchableOpacity, View} from 'react-native';
import {ITag} from '@src/types/event';
import {getTags} from '@src/api/events';
import SearchInput from '@src/shared/Input/SearchInput';
import useAxiosSearch from '@src/hooks/useAxiosSearch';
import CreateEventTag from '@src/shared/Tags/CreateEventTag';
import {StyledCreateEventFormContainer} from '.';

const ChooseTagsComponent = () => {
  const {data: tags, paginate, fetchData} = useAxiosSearch<ITag>(getTags);
  const handleSearchFilters = async (text: string) => {
    fetchData({q: text});
  };
  return (
    <StyledCreateEventFormContainer>
      <StyledTagHeader>
        <H3>Tags</H3>
        <TouchableOpacity
          style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
          <P>Sort by:</P>
          <Span textcolor="Primary">A - z</Span>
        </TouchableOpacity>
      </StyledTagHeader>
      <SearchInput placeholder="Tag name" onChangeText={handleSearchFilters} />

      <StyledTagsContainer>
        {tags?.paginatedResults.map(tag => (
          <CreateEventTag key={tag.cid} tag={tag} />
        ))}
      </StyledTagsContainer>
      {tags?.nextPage && (
        <TouchableOpacity
          onPress={() => paginate()}
          style={{flex: 1, alignItems: 'center'}}>
          <H6 textcolor="Grey">Show more</H6>
        </TouchableOpacity>
      )}
    </StyledCreateEventFormContainer>
  );
};

export default ChooseTagsComponent;

const StyledTagsContainer = styled(View)`
  flex-direction: row;
  gap: 12px;
  flex-wrap: wrap;
`;
const StyledTagHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;
