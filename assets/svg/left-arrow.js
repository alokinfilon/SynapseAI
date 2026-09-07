import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const LeftArrowIcon = ({ size = 24, width = size, height = size, color = 'currentColor', strokeWidth = 2, ...props }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M19 12H5M5 12L12 19M5 12L12 5"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default LeftArrowIcon;