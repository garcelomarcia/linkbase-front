import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SimpleStarSvg: React.FC = () => (

  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.011 0l2.312 5.485 5.677.64-4.25 4.005L12.925 16l-4.938-3.01-4.95 2.99 1.198-5.866L0 6.09l5.679-.616L8.01 0z"
      fill="#492DB1"
      fillOpacity={0.9}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.011 0l2.312 5.485 5.677.64-4.25 4.005L12.925 16l-4.938-3.01-4.95 2.99 1.198-5.866L0 6.09l5.679-.616L8.01 0z"
      fill="#E60D83"
      fillOpacity={0.5}
    />
  </Svg>
);

export default SimpleStarSvg;