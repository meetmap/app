export interface ILocation {
  country: string;
  city: string;
  coordinates: IPoint;
}

export interface IPoint {
  type: "Point";
  /**
   * [lng, lat]
   */
  coordinates: [number, number];
}

export interface IUserLocation {
  userId: string;
  coordinates: ICoordinates | null;
}

export interface ICoordinates {
  lat: number;
  lng: number;
}
