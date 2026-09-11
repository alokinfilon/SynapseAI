import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const RetryIcon = ({ size = 24, width = size, height = size, color = 'currentColor', ...props }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Path d="M1 4v6h6" />
    <Path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
  </Svg>
);

export default RetryIcon;
