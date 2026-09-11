import React, { useEffect, useRef } from 'react';
import { Animated, Easing, SafeAreaView, StatusBar, Text, View } from 'react-native';
import { Button, PaginationIndicator, RobotIllustration } from '../../../../shared/components';
import { ONBOARDING1_TITLE } from '../Onboarding1/constants';
import { ONBOARDING2_TITLE } from '../Onboarding2/constants';
import { ONBOARDING3_TITLE } from '../Onboarding3/constants';
import { styles } from './styles';
import { useOnboardingContainer } from './useOnboardingContainer';

const SLIDES = [
  { id: 1, title: ONBOARDING1_TITLE },
  { id: 2, title: ONBOARDING2_TITLE },
  { id: 3, title: ONBOARDING3_TITLE },
];

export const OnboardingContainerScreen: React.FC = () => {
  const { theme, currentIndex, handleNext, totalSlides } = useOnboardingContainer();
  const animIndex = useRef(new Animated.Value(currentIndex)).current;

  useEffect(() => {
    Animated.timing(animIndex, {
      toValue: currentIndex,
      duration: 450,
      easing: Easing.out(Easing.poly(3)),
      useNativeDriver: true,
    }).start();
  }, [currentIndex, animIndex]);

  const buttonTitle = currentIndex === totalSlides - 1 ? 'Get Started' : 'Next';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.canvas }]}>
      <StatusBar barStyle={theme.isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Fixed Robot Illustration */}
      <View style={styles.topSection}>
        <RobotIllustration size={260} showBalls={false} />
      </View>

      {/* Bottom Section: In-Place Smooth Animated Text & Footer */}
      <View style={styles.bottomSection}>
        <View style={styles.textContainer}>
          {SLIDES.map((slide, i) => {
            const translateX = animIndex.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [80, 0, -80],
              extrapolate: 'clamp',
            });

            const opacity = animIndex.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0, 1, 0],
              extrapolate: 'clamp',
            });

            const scale = animIndex.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.97, 1, 0.97],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={slide.id}
                style={[
                  styles.slideView,
                  {
                    opacity,
                    transform: [{ translateX }, { scale }],
                  },
                ]}>
                <Text
                  style={[
                    styles.titleText,
                    theme.typography.displayXl,
                    { color: theme.colors.textPrimary },
                  ]}>
                  {slide.title}
                </Text>
              </Animated.View>
            );
          })}
        </View>

        <View style={styles.footerSection}>
          <PaginationIndicator
            count={totalSlides}
            activeIndex={currentIndex}
            style={styles.pagination}
          />
          <Button
            title={buttonTitle}
            onPress={handleNext}
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingContainerScreen;



