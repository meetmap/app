import { ICoordinates, ILocation } from "../location";
import { IPaginateRespose } from "../response";

export interface IEvent {
  cid: string
  id: string;
  link: string;
  title: string;
  assets: string[];
  thumbnail: string
  description?: string;
  tickets: ITicket[],
  /**
   *  timestamp
   */
  startTime: string;
  eventType: string
  /**
   * timestamp
   */
  endTime: string;

  ageLimit: number;

  location: ILocation;

  stats: IEventStats
  userStats: IEventUserStats
  tags: ITag[]
  hits: IPaginateRespose<IEvent>
}

export interface IEventByLocation {
  id: string,
  cid: string
  coordinates: number[],
  thumbnail: string
}

export interface IEventUserStats {
  isUserSave: boolean,
  isUserLike: boolean,
  isUserWillGo: boolean
}

export interface IEventStats {
  saves: number,
  likes: number,
  willGo: number
}

export interface ICreateEvent {
  title: string
  description: string
  // slug: string
  eventType: string
  startTime: string
  endTime: string
  ageLimit: number
  location: ICoordinates
  tickets: ITicket[]
}


export interface ITicket {
  name: string
  price: number
  amount: number
  description: string
}
export interface ITag {
  cid: string
  label: string
  count: number
}