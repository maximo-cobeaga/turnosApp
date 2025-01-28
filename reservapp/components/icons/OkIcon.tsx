import * as React from "react";
import Svg, { G, Circle, Path } from "react-native-svg";
export const OkIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <G stroke="#2e5077" strokeWidth={1.5}>
      <Circle cx={12} cy={12} r={10} />
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.5 12.5 2 2 5-5"
      />
    </G>
  </Svg>
);
