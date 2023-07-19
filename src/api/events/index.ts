
import { ICreateEvent, IEvent } from "../../types/event";
import { getAxios } from "../axios";
import { EVENTS_URL } from "../baseUrl";
import FormData from "form-data";

export const getEventById = async (eventId: string) => {
  const res = await getAxios("events-fetcher", true).get(EVENTS_URL + `/events/${eventId}`);
  return res.data;
};

export const searchEvents = async (eventData: string) => {
  const res = await getAxios("events-fetcher", true).get(`/events/?q=${eventData}`);
  return res.data;
};

export const getAllNearEvents = async ({ lat, lng, radius }: { lat: number; lng: number; radius: number }) => {
  const res = await getAxios("events-fetcher", true).post<IEvent[]>(`/events/location`, {
    latitude: lat,
    longitude: lng,
    radius: radius < 1 ? 1 : radius > 90 ? 90 : radius,
  });
  return res.data.filter((event) => +new Date(event.endTime) + 1000 * 60 * 60 * 24 > +Date.now());
};
export const getLikedEvents = async () => {
  const res = await getAxios("events-fetcher", true).get<IEvent[]>(`/users/events/liked`);
  return res.data
};
export const likeEvent = async (eventId: string) => {
  const res = await getAxios("events-fetcher", true).patch<IEvent[]>(`/events/like/${eventId}`);
  return res.data
};
export const removeLikeOnEvent = async (eventId: string) => {
  const res = await getAxios("events-fetcher", true).delete<IEvent[]>(`/events/like/${eventId}`);
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
  return await getAxios("events-fetcher", true).post("/events/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
