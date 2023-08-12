import {ICreateEvent, IEvent, IEventByLocation, ITag} from '../../types/event';
import {IPaginateRespose} from '../../types/response';
import { IPartialUser } from '../../types/users';
import {getAxios} from '../axios';
import {EVENTS_URL} from '../baseUrl';
import FormData from 'form-data';

export const getEventByCid = async (eventCid: string) => {
  const res = await getAxios('events', true).get(`/events/${eventCid}`);
  return res.data;
};
export const getEventsListByCids = async (
  eventCids: string[],
  page: number = 1,
) => {
  const res = await getAxios('events', true).get<IPaginateRespose<IEvent>>(
    `/events/batch`,
    {
      params: {
        cids: eventCids,
        page,
      },
    },
  );
  return res.data;
};

export interface ISearchEventsParams {
  q: string;
  tags: string[];
  page?: number;
  minPrice: number | null;
  maxPrice: number | null;
  startDate: Date | null;
  endDate: Date | null;
}

export const searchEvents = async (params: ISearchEventsParams) => {
  const res = await getAxios('events', true).get<IPaginateRespose<IEvent>>(
    `/events`,
    {
      params,
    },
  );
  return res.data;
};

export const getAllNearEvents = async ({
  lat,
  lng,
  radius,
}: {
  lat: number;
  lng: number;
  radius: number;
}) => {
  const res = await getAxios('events', true).post<IEventByLocation[]>(
    `/events/location`,
    {
      latitude: lat,
      longitude: lng,
      radius: radius < 1 ? 1 : radius > 90 ? 90 : radius,
    },
  );
  return res.data;
};

export const getEventLikes = async (eventCid: string, page?: number) => {
  const res = await getAxios('events', true).get<IPaginateRespose<IPartialUser>>(
    `/events/likes/${eventCid}`,
    {
      params: {
        page,
      },
    },
  );
  return res.data;
};

export const getLikedEvents = async (page?: number) => {
  const res = await getAxios('events', true).get<IPaginateRespose<IEvent>>(
    `/users/events/liked`,
    {
      params: {
        page,
      },
    },
  );
  return res.data;
};
export const likeEvent = async (eventCid: string) => {
  const res = await getAxios('events', true).patch<IEvent[]>(
    `/events/like/${eventCid}`,
  );
  return res.data;
};
export const removeLikeOnEvent = async (eventCid: string) => {
  const res = await getAxios('events', true).delete<IEvent[]>(
    `/events/like/${eventCid}`,
  );
  return res.data;
};
export const getTags = async () => {
  const res = await getAxios('events', true).get<IPaginateRespose<ITag>>(
    `/events/tags`,
  );
  return res.data;
};

export interface IUploadedImage {
  uri: string;
  type: string;
  name: string;
}

export const createEvent = async (
  rawEvent: ICreateEvent,
  img: IUploadedImage,
) => {
  const formData = new FormData();
  formData.append('photo', img);
  formData.append('rawEvent', JSON.stringify(rawEvent));
  return await getAxios('events', true).post('/events/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
