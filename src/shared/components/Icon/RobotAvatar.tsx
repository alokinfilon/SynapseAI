import React from 'react';
import Svg, { Circle, Ellipse, G, Path, Rect } from 'react-native-svg';
import { useTheme } from '../../../hooks';

export type RobotExpression = 'smile' | 'heart' | 'sad' | 'star' | 'thinking' | 'cross';

export interface RobotAvatarProps {
  size?: number;
  expression?: RobotExpression;
  tealColor?: string;
  glowColor?: string;
  visorBgColor?: string;
  showParticles?: boolean;
}

export const RobotAvatar: React.FC<RobotAvatarProps> = ({
  size = 180,
  expression = 'smile',
  tealColor,
  glowColor,
  visorBgColor = '#232733',
}) => {
  const theme = useTheme();
  const primaryTeal = tealColor || glowColor || theme.colors.primary || '#00D2B4';

  const renderEyesAndMouth = () => {
    switch (expression) {
      case 'cross':
        return (
          <G>
            <Path
              d="M 64 82 L 86 104 M 86 82 L 64 104"
              stroke={primaryTeal}
              strokeWidth="5.5"
              strokeLinecap="round"
            />
            <Path
              d="M 114 82 L 136 104 M 136 82 L 114 104"
              stroke={primaryTeal}
              strokeWidth="5.5"
              strokeLinecap="round"
            />
            <Path
              d="M 91 116 Q 95 112 100 116 Q 105 120 109 116"
              stroke={primaryTeal}
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
          </G>
        );

      case 'heart':
        return (
          <G>
            <Path
              d="M 75 106 C 58 94, 52 80, 62 69 C 69 60, 75 69, 75 73 C 75 69, 81 60, 88 69 C 98 80, 92 94, 75 106 Z"
              fill={primaryTeal}
            />
            <Path
              d="M 125 106 C 108 94, 102 80, 112 69 C 119 60, 125 69, 125 73 C 125 69, 131 60, 138 69 C 148 80, 142 94, 125 106 Z"
              fill={primaryTeal}
            />
            <Ellipse cx="100" cy="116" rx="7" ry="4.5" fill={primaryTeal} />
          </G>
        );

      case 'sad':
        return (
          <G>
            <Path
              d="M 64 94 C 70 83, 80 83, 86 94"
              stroke={primaryTeal}
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            <Path
              d="M 114 94 C 120 83, 130 83, 136 94"
              stroke={primaryTeal}
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            <Path
              d="M 92 117 Q 100 110 108 117"
              stroke={primaryTeal}
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
          </G>
        );

      case 'smile':
      default:
        return (
          <G>
            <Circle cx="75" cy="92" r="14.5" fill={primaryTeal} />
            <Circle cx="79" cy="86" r="5" fill="#FFFFFF" />
            <Circle cx="125" cy="92" r="14.5" fill={primaryTeal} />
            <Circle cx="129" cy="86" r="5" fill="#FFFFFF" />
            <Path d="M 90 110 Q 100 120 110 110 Z" fill={primaryTeal} />
          </G>
        );
    }
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 200 200">
      {/* Outer Head Body */}
      <Rect
        x="35"
        y="40"
        width="130"
        height="110"
        rx="35"
        fill="#FFFFFF"
        stroke={primaryTeal}
        strokeWidth="4"
      />
      {/* Visor Area */}
      <Rect
        x="48"
        y="58"
        width="104"
        height="74"
        rx="22"
        fill={visorBgColor}
      />
      {renderEyesAndMouth()}
    </Svg>
  );
};

export default RobotAvatar;
