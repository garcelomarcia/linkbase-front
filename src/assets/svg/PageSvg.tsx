import * as React from "react"
import Svg, { Path } from "react-native-svg"

const PageSvg: React.FC = () => (

  <Svg
    width={27}
    height={27}
    viewBox="0 0 27 27"
    fill="none"
  >
    <Path
      d="M3.375 9.281V20.25a2.531 2.531 0 002.531 2.531h15.188a2.531 2.531 0 002.531-2.531V9.281m-20.25 0V6.75a2.531 2.531 0 012.531-2.531h15.188a2.531 2.531 0 012.531 2.531v2.531m-20.25 0h20.25M5.906 6.75h.009v.008h-.009V6.75zm2.532 0h.008v.008h-.008V6.75zm2.53 0h.01v.008h-.01V6.75z"
      stroke="#0F172A"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default PageSvg;