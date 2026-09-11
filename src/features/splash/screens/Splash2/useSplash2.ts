import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { FADE_DURATION, LOADING_TIMEOUT } from './constants';

export interface Splash2ScreenProps {
  onNext?: () => void;
  onFinishLoading?: () => void;
}

export const useSplash2 = (props: Splash2ScreenProps) => {
  const { onNext, onFinishLoading } = props;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: FADE_DURATION,
      useNativeDriver: true,
    }).start();

    const callback = onNext || onFinishLoading;
    if (callback) {
      const timer = setTimeout(() => {
        callback();
      }, LOADING_TIMEOUT);
      return () => clearTimeout(timer);
    }
  }, [fadeAnim, onNext, onFinishLoading]);

  return {
    fadeAnim,
  };
};
