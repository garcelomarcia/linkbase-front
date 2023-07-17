import * as React from "react"
import Svg, { Path } from "react-native-svg"

const PhoneSvg: React.FC = () => (

  <Svg
    width={23}
    height={23}
    viewBox="0 -1 23 23"
    fill="none"
  >
    <Path
      d="M19.406 3.594v4.312m0-4.312h-4.312m4.312 0l-5.75 5.75m2.875 11.5c-7.939 0-14.375-6.436-14.375-14.375V4.312c0-1.19.966-2.156 2.156-2.156h1.315c.495 0 .926.337 1.046.817l1.06 4.239c.105.42-.052.863-.4 1.124l-1.24.93c-.359.27-.518.736-.363 1.158a11.534 11.534 0 006.846 6.846c.422.155.889-.004 1.159-.364l.93-1.24c.26-.347.702-.504 1.123-.399l4.24 1.06c.48.12.816.551.816 1.046v1.314c0 1.191-.966 2.157-2.157 2.157h-2.156z"
      stroke="#0F172A"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default PhoneSvg;