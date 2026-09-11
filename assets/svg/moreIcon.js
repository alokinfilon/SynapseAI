import React from 'react';
import Svg, { Circle } from 'react-native-svg';

export const MoreIcon = ({ size = 24, width = size, height = size, color = 'currentColor', ...props }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={color}
    {...props}
  >
    <Circle cx="5" cy="12" r="2.2" />
    <Circle cx="12" cy="12" r="2.2" />
    <Circle cx="19" cy="12" r="2.2" />
  </Svg>
);

export default MoreIcon;