import React from 'react';
import { OnboardingContainerScreen } from '../OnboardingContainer';
import { Splash1Screen } from '../Splash1';
import { Splash2Screen } from '../Splash2';
import { useSplashFlowContainer } from './useSplashFlowContainer';

export const SplashFlowContainer: React.FC = () => {
  const { step, handleNext } = useSplashFlowContainer();

  switch (step) {
    case 0:
      return <Splash1Screen onFinish={handleNext} />;
    case 1:
      return <Splash2Screen onNext={handleNext} />;
    case 2:
    default:
      return <OnboardingContainerScreen />;
  }
};

export default SplashFlowContainer;

