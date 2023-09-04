/* eslint-disable no-unused-vars */
import Supercluster, { PointFeature,  AnyProps, ClusterProperties } from 'supercluster';
import { IEventByLocation } from '../types/event';

type Position = [number, number] | [number, number, number];

export interface ClusterPoint {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: Position;
  };
  properties: IEventClusterProperties;
}
interface IEventClusterProperties extends ClusterProperties {
  data: IEventByLocation
  cids: string[]
}

interface Options {
  radius?: number;
  maxZoom?: number;
  minZoom?: number;
  log?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reduce?: (accumulated: any, props: Readonly<any>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map?: (props: Readonly<AnyProps>) => any;
}

type Bounds = [number, number, number, number] | undefined;

type UseSuperclusterProps = {
  points: PointFeature<AnyProps>[];
  bounds: Bounds;
  zoom: number;
  options: Options;
};

function getClusters({
  points,
  bounds,
  zoom,
  options,
}: UseSuperclusterProps) : ClusterPoint[] {
  const supercluster = new Supercluster(options);
  supercluster.load(points);
  if (!bounds) {
    return []
  }
  const [west, south, east, north] = bounds;
  const clusters = supercluster.getClusters([west, south, east, north], zoom) as ClusterPoint[];

  return clusters ;
}

export default getClusters;
