/**declaring modules for svg files*/
declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

/**declaring modules for png files */
declare module '*.png' {
  const src: string;
  export default src;
}

/** declaring the js module for TSX usage 
*/
declare module "@esko/cloud-service-utils";

declare module "react-beautiful-dnd";

declare module "chart.js";