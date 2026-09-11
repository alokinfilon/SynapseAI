import React from 'react';
import { Image, View } from 'react-native';
import Svg, { Circle, Ellipse, G, Path, Rect } from 'react-native-svg';
import LottieView from 'lottie-react-native';
import { ANIMATIONS, EMOTIONS, IMAGES } from '../../../../assets';
import { useTheme } from '../../../hooks';

export type RobotExpression = 'normal' | 'smile' | 'heart' | 'sad' | 'star' | 'thinking' | 'cross';

export interface RobotAvatarProps {
  size?: number;
  expression?: RobotExpression;
  tealColor?: string;
  glowColor?: string;
  visorBgColor?: string;
  showParticles?: boolean;
  useLottie?: boolean;
  useImageAsset?: boolean;
}

const EMOTION_ASSETS: Record<string, any> = {
  normal: IMAGES.robotHead,
  smile: EMOTIONS.happy,
  heart: EMOTIONS.love,
  sad: EMOTIONS.sad,
  star: EMOTIONS.star,
  thinking: EMOTIONS.think,
};

export const RobotAvatar: React.FC<RobotAvatarProps> = ({
  size = 180,
  expression = 'normal',
  tealColor,
  glowColor,
  visorBgColor = '#232733',
  showParticles = false,
  useLottie = false,
  useImageAsset = true,
}) => {
  const theme = useTheme();
  const primaryTeal = tealColor || glowColor || theme.colors.primary || '#00D2B4';

  if (useImageAsset && EMOTION_ASSETS[expression]) {
    return (
      <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        {showParticles && (
          <>
            <View style={{ position: 'absolute', width: 14, height: 14, borderRadius: 7, backgroundColor: primaryTeal, top: 5, left: 15, opacity: 0.85 }} />
            <View style={{ position: 'absolute', width: 22, height: 22, borderRadius: 11, backgroundColor: primaryTeal, top: 25, right: 8, opacity: 0.9 }} />
            <View style={{ position: 'absolute', width: 10, height: 10, borderRadius: 5, backgroundColor: primaryTeal, bottom: 45, left: 8, opacity: 0.7 }} />
            <View style={{ position: 'absolute', width: 26, height: 26, borderRadius: 13, backgroundColor: primaryTeal, bottom: 20, right: 12, opacity: 0.95 }} />
            <View style={{ position: 'absolute', width: 12, height: 12, borderRadius: 6, backgroundColor: primaryTeal, top: '50%', left: -5, opacity: 0.8 }} />
            <View style={{ position: 'absolute', width: 16, height: 16, borderRadius: 8, backgroundColor: primaryTeal, top: '45%', right: -8, opacity: 0.85 }} />
          </>
        )}
        <Image
          source={EMOTION_ASSETS[expression]}
          style={{ width: size, height: size }}
          resizeMode="contain"
        />
      </View>
    );
  }

  if (useLottie) {
    return (
      <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <LottieView
          source={ANIMATIONS.robotAnimation}
          autoPlay
          loop
          style={{ width: size, height: size }}
        />
      </View>
    );
  }


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

      case 'star':
        return (
          <G>
            <Path
              d="M 75 70 L 78 80 L 88 80 L 80 86 L 83 96 L 75 90 L 67 96 L 70 86 L 62 80 L 72 80 Z"
              fill={primaryTeal}
            />
            <Path
              d="M 125 70 L 128 80 L 138 80 L 130 86 L 133 96 L 125 90 L 117 96 L 120 86 L 112 80 L 122 80 Z"
              fill={primaryTeal}
            />
            <Path d="M 90 110 Q 100 122 110 110 Z" fill={primaryTeal} />
          </G>
        );

      case 'thinking':
        return (
          <G>
            <Circle cx="75" cy="90" r="13" fill={primaryTeal} />
            <Circle cx="78" cy="85" r="4" fill="#FFFFFF" />
            <Circle cx="125" cy="86" r="15" fill={primaryTeal} />
            <Circle cx="128" cy="81" r="4" fill="#FFFFFF" />
            <Path
              d="M 88 116 Q 100 112 112 118"
              stroke={primaryTeal}
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
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
