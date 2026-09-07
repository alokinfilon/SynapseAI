import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { Onboarding1Screen } from '../Onboarding1';
import { Onboarding2Screen } from '../Onboarding2';
import { Onboarding3Screen } from '../Onboarding3';
import { styles } from './styles';
import { useOnboardingContainer } from './useOnboardingContainer';

export const OnboardingContainerScreen: React.FC = () => {
  const { theme, currentIndex, handleNext, completeOnboarding } = useOnboardingContainer();

  const renderCurrentSlide = () => {
    switch (currentIndex) {
      case 0:
        return <Onboarding1Screen onNext={handleNext} />;
      case 1:
        return <Onboarding2Screen onNext={handleNext} />;
      case 2:
      default:
        return <Onboarding3Screen onGetStarted={completeOnboarding} onNext={handleNext} />;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.canvas }]}>
      <StatusBar barStyle={theme.isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.slideContainer}>
        {renderCurrentSlide()}
      </View>
    </SafeAreaView>
  );
};

export default OnboardingContainerScreen;
