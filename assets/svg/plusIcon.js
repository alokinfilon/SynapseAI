import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const PlusIcon = ({ size = 24, width = size, height = size, color = 'currentColor', ...props }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M12 5V19M5 12H19"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default PlusIcon;
