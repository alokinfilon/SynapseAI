import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { FADE_DURATION, LOADING_TIMEOUT } from './constants';

export interface Splash2ScreenProps {
  onNext?: () => void;
  onFinishLoading?: () => void;
}

export const useSplash2 = ({ onFinishLoading }: Splash2ScreenProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: FADE_DURATION,
      useNativeDriver: true,
    }).start();

    if (onFinishLoading) {
      const timer = setTimeout(() => {
        onFinishLoading();
      }, LOADING_TIMEOUT);
      return () => clearTimeout(timer);
    }
  }, [fadeAnim, onFinishLoading]);

  return {
    fadeAnim,
  };
};
