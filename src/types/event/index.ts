import { ICoordinates, ILocation } from "../location";

export interface IEvent {
  id: string;
  link: string;
  title: string;
  assets: string[];
  thumbnail: string
  description?: string;
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
}

export interface IEventByLocation {
  id: string,
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