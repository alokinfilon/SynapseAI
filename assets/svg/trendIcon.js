import React from 'react';
import Svg, { G, Mask, Path } from 'react-native-svg';

export const TrendIcon = ({ size = 24, width = size, height = size, color = 'currentColor', ...props }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 48 48"
    {...props}
  >
    <Mask id="ipSTrend0">
      <G fill="none" strokeJoin="round" strokeWidth={4}>
        <Path fill="#FFFFFF" stroke="#FFFFFF" d="M39 6H9a3 3 0 0 0-3 3v30a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3Z" />
        <Path stroke="#000000" strokeCap="round" d="m13.44 29.835l5.657-5.657l4.388 4.377L34 18" />
        <Path stroke="#000000" strokeCap="round" d="M26 18h8v8" />
      </G>
    </Mask>
    <Path fill={color} d="M0 0h48v48H0z" mask="url(#ipSTrend0)" />
  </Svg>
);

export default TrendIcon;