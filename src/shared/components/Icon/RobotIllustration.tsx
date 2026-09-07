import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, G, Path, Rect } from 'react-native-svg';
import { useTheme } from '../../../hooks';

export interface RobotIllustrationProps {
  size?: number;
  bubbleColor?: string;
  style?: any;
}

export const RobotIllustration: React.FC<RobotIllustrationProps> = ({
  size = 200,
  style,
}) => {
  const theme = useTheme();
  const primaryTeal = theme.colors.primary || '#00D2B4';

  return (
    <View style={[{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }, style]}>
      <Svg width={size} height={size} viewBox="0 0 200 200">
        {/* Glow backdrop */}
        <Circle cx="100" cy="100" r="80" fill={primaryTeal} opacity="0.1" />
        {/* Robot Head */}
        <Rect x="40" y="45" width="120" height="100" rx="30" fill="#FFFFFF" stroke={primaryTeal} strokeWidth="4" />
        {/* Visor */}
        <Rect x="52" y="60" width="96" height="68" rx="18" fill="#181A20" />
        {/* Eyes */}
        <Circle cx="76" cy="90" r="12" fill={primaryTeal} />
        <Circle cx="79" cy="86" r="4" fill="#FFFFFF" />
        <Circle cx="124" cy="90" r="12" fill={primaryTeal} />
        <Circle cx="127" cy="86" r="4" fill="#FFFFFF" />
        {/* Smile */}
        <Path d="M 90 108 Q 100 118 110 108 Z" fill={primaryTeal} />
      </Svg>
    </View>
  );
};

export default RobotIllustration;
