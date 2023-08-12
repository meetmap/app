import { debounce } from 'lodash';
import { useState, useEffect, useMemo, useRef } from 'react';
import Supercluster, { PointFeature, ClusterFeature, AnyProps, ClusterProperties } from 'supercluster';
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
  reduce?: (accumulated: any, props: Readonly<any>) => void;
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
