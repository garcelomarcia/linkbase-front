import * as React from "react"
import Svg, { Path } from "react-native-svg"

const MapSvg: React.FC = () => (

  <Svg
    width={26}
    height={26}
    viewBox="0 0 26 26"
    fill="none"
  >
    <Path
      d="M9.75 7.313v8.937m6.5-6.5v8.938m.545 3.79l5.281-2.641c.413-.207.674-.629.674-1.09V5.222c0-.906-.953-1.495-1.764-1.09l-4.191 2.095a1.219 1.219 0 01-1.09 0l-5.41-2.704a1.219 1.219 0 00-1.09 0l-5.281 2.64a1.219 1.219 0 00-.674 1.09v13.525c0 .906.953 1.495 1.764 1.09l4.191-2.095a1.219 1.219 0 011.09 0l5.41 2.704c.343.172.747.172 1.09 0z"
      stroke="#000"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default MapSvg;