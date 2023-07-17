import * as React from "react"
import Svg, { Rect, G, Path, Defs, ClipPath } from "react-native-svg"

type IconProps = { 
  size: number,
  fill: string
}

const StarSvg: React.FC<IconProps> = (props) => (
  
  <Svg
    width={props.size}
    height={props.size}
    viewBox="0 0 15 15"
    fill="none"
  >
    <Rect width={15} height={15} rx={3} fill={`${props.fill}`} />
    <G clipPath="url(#clip0_221_769)">
      <Path
        d="M6.812 4.306a.75.75 0 011.376 0l.334.77a1.5 1.5 0 001.234.897l.837.08a.75.75 0 01.425 1.309l-.63.556a1.5 1.5 0 00-.471 1.45l.183.82a.75.75 0 01-1.114.81l-.723-.428a1.5 1.5 0 00-1.526 0l-.723.428a.75.75 0 01-1.114-.81l.183-.82a1.5 1.5 0 00-.471-1.45l-.63-.556a.75.75 0 01.425-1.31l.837-.079a1.5 1.5 0 001.234-.896l.334-.771z"
        fill="#fff"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_221_769">
        <Path fill="#fff" transform="translate(3 3)" d="M0 0H9V9H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default StarSvg;