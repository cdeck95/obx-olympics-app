declare module "react-svg-pan-zoom" {
  import * as React from "react";

  export interface ViewerProps {
    width: number;
    height: number;
    children: React.ReactNode;
    background?: string; // Add background prop
    SVGBackground?: string; // Add SVGBackground prop
    [key: string]: any;
  }

  export const UncontrolledReactSVGPanZoom: React.FC<ViewerProps>;
}
