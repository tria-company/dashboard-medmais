declare module "react-simple-maps" {
  import { ComponentType } from "react";

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: {
      center?: [number, number];
      scale?: number;
      [key: string]: number | [number, number] | undefined;
    };
    width?: number;
    height?: number;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }

  interface GeoProperties {
    name?: string;
    sigla?: string;
    [key: string]: unknown;
  }

  export interface GeographiesProps {
    geography: string | object;
    children: (context: {
      geographies: Array<{
        rsmKey: string;
        properties: GeoProperties;
        geometry: unknown;
      }>;
    }) => React.ReactNode;
  }

  export interface GeographyProps {
    geography: {
      rsmKey: string;
      properties: GeoProperties;
      geometry: unknown;
    };
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
    onMouseEnter?: (evt: React.MouseEvent<SVGPathElement>) => void;
    onMouseMove?: (evt: React.MouseEvent<SVGPathElement>) => void;
    onMouseLeave?: (evt: React.MouseEvent<SVGPathElement>) => void;
    children?: React.ReactNode;
  }

  export interface ZoomableGroupProps {
    center?: [number, number];
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    children?: React.ReactNode;
  }

  export const ComposableMap: ComponentType<ComposableMapProps>;
  export const Geographies: ComponentType<GeographiesProps>;
  export const Geography: ComponentType<GeographyProps>;
  export const ZoomableGroup: ComponentType<ZoomableGroupProps>;
}
