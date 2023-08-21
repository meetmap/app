export interface ILocation {
  countryName?: string
  localityName?: string
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
