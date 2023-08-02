
import { ICreateEvent, IEvent, IEventByLocation } from "../../types/event";
import { getAxios } from "../axios";
import { EVENTS_URL } from "../baseUrl";
import FormData from "form-data";

export const getEventById = async (eventId: string) => {
  const res = await getAxios("events", true).get(`/events/${eventId}`);
  return res.data;
};
export const getEventsListByIds = async (eventIds: string[]) => {
  const res = await getAxios("events", true).get<IEvent[]>(`/events/batch`, {
    params: {
      ids: eventIds
    }
  });
  return res.data;
};

export const searchEvents = async (eventData: string) => {
  const res = await getAxios("events", true).get(`/events/?q=${eventData}`);
  return res.data;
};

export const getAllNearEvents = async ({ lat, lng, radius }: { lat: number; lng: number; radius: number }) => {
  const res = await getAxios("events", true).post<IEventByLocation[]>(`/events/location`, {
    latitude: lat,
    longitude: lng,
    radius: radius < 1 ? 1 : radius > 90 ? 90 : radius,
  });
  return res.data
};
export const getLikedEvents = async () => {
  const res = await getAxios("events", true).get<IEvent[]>(`/users/events/liked`);
  return res.data
};
export const likeEvent = async (eventId: string) => {
  const res = await getAxios("events", true).patch<IEvent[]>(`/events/like/${eventId}`);
  return res.data
};
export const removeLikeOnEvent = async (eventId: string) => {
  const res = await getAxios("events", true).delete<IEvent[]>(`/events/like/${eventId}`);
  return res.data
};

export interface IUploadedImage {
  uri: string;
  type: string;
  name: string;
}

export const createEvent = async (rawEvent: ICreateEvent, img: IUploadedImage) => {
  const formData = new FormData();
  formData.append("photo", img);
  formData.append("rawEvent", JSON.stringify(rawEvent));
  return await getAxios("events", true).post("/events/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
