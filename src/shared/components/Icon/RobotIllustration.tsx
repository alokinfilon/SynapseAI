import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

import { ANIMATIONS, IMAGES } from '../../../../assets';

export interface RobotIllustrationProps {
  size?: number;
  bubbleColor?: string;
  style?: any;
  autoPlay?: boolean;
  loop?: boolean;
  showBalls?: boolean;
  animated?: boolean;
  mode?: '3d' | 'waving' | 'lottie';
}

export const RobotIllustration: React.FC<RobotIllustrationProps> = ({
  size = 260,
  style,
  autoPlay = true,
  loop = true,
  showBalls = true,
  animated = true,
  mode = 'lottie',
}) => {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!animated) return;

    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2200,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2200,
          useNativeDriver: true,
        }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [floatAnim, animated]);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -10, 0],
  });

  const rotate = floatAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: ['0deg', '-3.5deg', '0deg', '3.5deg', '0deg'],
  });

  const scale = floatAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.99, 1.03, 0.99],
  });

  const getImageSource = () => {
    if (mode === 'waving') {
      return IMAGES.robotWaving;
    }
    return IMAGES.robot3D;
  };

  return (
    <View style={[{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }, style]}>
      {mode === 'lottie' ? (
        <LottieView
          source={ANIMATIONS.robotAnimation}
          autoPlay={animated && autoPlay}
          loop={animated && loop}
          style={{ width: size, height: size }}
        />
      ) : animated ? (
        <Animated.Image
          source={getImageSource()}
          style={{
            width: size,
            height: size,
            transform: [{ translateY }, { rotate }, { scale }],
          }}
          resizeMode="contain"
        />
      ) : (
        <Image
          source={getImageSource()}
          style={{
            width: size,
            height: size,
          }}
          resizeMode="contain"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ball: {
    position: 'absolute',
    borderRadius: 999,
    zIndex: 2,
  },
  ball1: {
    width: 18,
    height: 18,
    top: 25,
    left: 40,
    backgroundColor: '#00D2B4',
    shadowColor: '#00D2B4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  ball2: {
    width: 26,
    height: 26,
    top: 15,
    right: 35,
    backgroundColor: '#24D897',
    shadowColor: '#24D897',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  ball3: {
    width: 14,
    height: 14,
    top: 115,
    right: 25,
    backgroundColor: '#00C8FF',
  },
  ball4: {
    width: 22,
    height: 22,
    bottom: 30,
    left: 45,
    backgroundColor: '#10B981',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  ball5: {
    width: 20,
    height: 20,
    bottom: 35,
    right: 45,
    backgroundColor: '#00D2B4',
    shadowColor: '#00D2B4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default RobotIllustration;
