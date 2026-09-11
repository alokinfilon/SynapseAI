import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const DocumentIcon = ({ size = 24, width = size, height = size, color = 'currentColor', ...props }) => (
  <Svg width={width} height={height} viewBox="0 0 16 16" fill={color} {...props}>
    <Path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"/>
  </Svg>
);

export default DocumentIcon;
