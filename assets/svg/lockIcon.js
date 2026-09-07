import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const LockIcon = ({ size = 24, width = size, height = size, color = 'currentColor', ...props }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill={color}
    {...props}
  >
    <Path fillRule="evenodd" d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4m0 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3" />
  </Svg>
);

export default LockIcon;