import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

export const CopyIcon = ({ size = 24, width = size, height = size, color = 'currentColor', ...props }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <Path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </Svg>
);

export default CopyIcon;
