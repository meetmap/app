import { debounce } from 'lodash';
import { useState, useEffect, useRef } from 'react';
import Supercluster, { PointFeature, AnyProps, ClusterProperties } from 'supercluster';

type Position = [number, number] | [number, number, number];

interface ClusterPoint {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: Position;
  };
  properties: ClusterProperties & AnyProps;
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

function useSupercluster({
  points,
  bounds,
  zoom,
  options,
}: UseSuperclusterProps) {
    const [clusters, setClusters] = useState<ClusterPoint[]>([]);
    const superclusterRef = useRef<Supercluster<Readonly<AnyProps>, ClusterProperties> | null>(null);
  
    useEffect(() => {
      superclusterRef.current = new Supercluster(options);
      superclusterRef.current.load(points);
    }, [points, options]);
  
    useEffect(() => {
        if (!bounds || !superclusterRef.current) {
          return;
        }
        const debouncedUpdateClusters = debounce(() => {
          const [west, south, east, north] = bounds;
          const clusters = superclusterRef.current!.getClusters([west, south, east, north], zoom);
          setClusters(clusters as ClusterPoint[]);
        }, 300);
  
        debouncedUpdateClusters();
  
        // Очистка функции при завершении
        return () => {
          debouncedUpdateClusters.cancel();
        };
      }, [bounds, zoom]);
    return { clusters, supercluster: superclusterRef.current };
}

export default useSupercluster;
