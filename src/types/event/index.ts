import { ICoordinates, ILocation } from "../location";

export interface IEvent {
  cid: string
  id: string;
  link: string;
  title: string;

  assets: string[];
  thumbnail: string

  description?: string;
  tickets: ITicketResponse[],
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
  creator?: ICreator
  // hits: IPaginateRespose<IEvent>
}

export interface ICreator {
  creatorCid: string
  type: string
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


export interface ITicket {
  name: string
  price: number
  amount: number
  description: string
}
export interface ITicketResponse {
  name: string
  price: {
    currency: string
    amount: number
  }
  amount: number
  description: string
}
export interface ITag {
  cid: string
  label: string
  count: number
}

export interface ICreateEventFormValues {
  title: string
  description: string
  accessibility: "public" | "private"
  startTime: Date | null
  endTime: Date | null
  ageLimit: number
  location: ICoordinates | null
  tickets: ITicket[]
  tagsCids: string[]
}
