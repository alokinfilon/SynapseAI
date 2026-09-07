import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '../../../hooks';

export interface LoaderProps {
  size?: number;
  color?: string;
  style?: ViewStyle;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 36,
  color,
  style,
}) => {
  const theme = useTheme();
  const spinValue = useRef(new Animated.Value(0)).current;

  const activeColor = color || theme.colors.primary;
  const dotCount = 8;
  const dotSize = Math.max(4, size / 7);
  const radius = (size - dotSize) / 2;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    animation.start();
    return () => animation.stop();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <Animated.View
        style={[
          styles.spinner,
          {
            width: size,
            height: size,
            transform: [{ rotate: spin }],
          },
        ]}>
        {Array.from({ length: dotCount }).map((_, index) => {
          const angle = (index * (360 / dotCount) * Math.PI) / 180;
          const x = radius * Math.cos(angle) + radius;
          const y = radius * Math.sin(angle) + radius;
          const opacity = 0.25 + (index / dotCount) * 0.75;

          return (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  width: dotSize,
                  height: dotSize,
                  borderRadius: dotSize / 2,
                  backgroundColor: activeColor,
                  opacity,
                  left: x,
                  top: y,
                },
              ]}
            />
          );
        })}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    position: 'relative',
  },
  dot: {
    position: 'absolute',
  },
});

export default Loader;
