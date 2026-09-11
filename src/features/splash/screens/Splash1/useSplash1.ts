import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useTheme } from '../../../../hooks';
import { FADE_DURATION, LOADING_TIMEOUT } from './constants';

export interface Splash1ScreenProps {
  onFinish?: () => void;
  onFinishLoading?: () => void;
  style?: any;
}

export const useSplash1 = (props: Splash1ScreenProps) => {
  const { onFinish, onFinishLoading } = props;
  const theme = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: FADE_DURATION,
      useNativeDriver: true,
    }).start();

    const callback = onFinish || onFinishLoading;
    if (callback) {
      const timer = setTimeout(() => {
        callback();
      }, LOADING_TIMEOUT);
      return () => clearTimeout(timer);
    }
  }, [fadeAnim, onFinish, onFinishLoading]);

  return {
    theme,
    fadeAnim,
  };
};
