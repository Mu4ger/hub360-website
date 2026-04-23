declare module "react-simple-maps" {
  import type { CSSProperties, ReactNode } from "react";

  export type GeographyStyle = {
    default?: CSSProperties;
    hover?: CSSProperties;
    pressed?: CSSProperties;
  };

  export type GeographyRenderProps = {
    rsmKey: string;
    geography: unknown;
  };

  export const ComposableMap: (props: {
    width?: number;
    height?: number;
    projection?: string;
    projectionConfig?: Record<string, unknown>;
    className?: string;
    children?: ReactNode;
  }) => JSX.Element;

  export const Geographies: (props: {
    geography: unknown;
    children: (args: {
      geographies: GeographyRenderProps[];
    }) => ReactNode;
  }) => JSX.Element;

  export const Geography: (props: Record<string, unknown>) => JSX.Element;
}
