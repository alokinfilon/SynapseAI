import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const UserProfileIcon = ({ size = 24, width = size, height = size, color = 'currentColor', ...props }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill={color}
    {...props}
  >
    <Path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
  </Svg>
);

export default UserProfileIcon;