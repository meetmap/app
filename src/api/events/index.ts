import { store } from '@src/store/store';
import { ICreateEventFormValues, IEvent, IEventByLocation, ITag } from '@src/types/event';
import { IPaginateRespose } from '@src/types/response';
import { IPartialUser } from '@src/types/users';
import { getAxios } from '../axios';
import FormData from 'form-data';
import { IUploadImageResponce } from '../users';

export const getEventByCid = async (eventCid: string) => {
  const res = await getAxios('events', true).get<IEvent>(`/events/${eventCid}`);
  return res.data;
};
export const getSimilarEventsByCid = async (eventCid: string, page?: number) => {
  const res = await getAxios('events', true).get<IPaginateRespose<IEvent>>(`/events/${eventCid}/similar`, {
    params: {
      page
    }
  });
  return res.data;
};
export const getEventsListByCids = async (
  eventCids: string[],
  page = 1,
) => {
  const res = await getAxios('events', true).post<IPaginateRespose<IEvent>>(
    `/events/batch`,
    {
      cids: eventCids
    },
    {
      params: {
        page,
      },
    }
  );
  return res.data;
};

export interface ISearchEventsParams {
  q: string;
  page?: number;
  tags: string[]
  minPrice: number | null
  maxPrice: number | null
  startDate: Date | null
  endDate: Date | null
  radius: number | null
  lat: number
  lng: number
}

export const searchEvents = async (params?: ISearchEventsParams) => {
  const { userCoordinates } = store.getState().locationSlice
  if (params?.radius && userCoordinates) {
    params.lat = userCoordinates.lat
    params.lng = userCoordinates.lng
  }
  const res = await getAxios('events', true).get<IPaginateRespose<IEvent>>(
    `/events`,
    {
      params: {
        ...params,
        radius: params?.radius
      },
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

export const getEventLikes = async (eventCid: string, page = 1) => {
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

export const getLikedEvents = async (page = 1) => {
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

export interface ISearchTagsParams {
  q?: string;
  page?: number;
}

export const getTags = async (params?: ISearchTagsParams) => {
  const res = await getAxios('events', true).get<IPaginateRespose<ITag>>(
    `/events/tags`,
    { params },
  );
  return res.data;
};

export interface IUploadedImage {
  uri: string;
  type: string;
  name: string;
}

export const createEvent = async (
  eventData: ICreateEventFormValues,
) => {
  const res = await getAxios('events', true).post<IEvent>('/events/create', eventData);
  return res.data
};
export const uploadEventImages = async (
  eventCid: string,
  pictures: IUploadedImage[]
): Promise<IUploadImageResponce> => {
  const formData = new FormData();
  formData.append("eventId", eventCid)
  pictures.forEach(picture => {
    formData.append("photo", picture);
  });
  const { data } = await getAxios('assets', true).post<IUploadImageResponce>(
    `/upload/event-photos`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return data
};
