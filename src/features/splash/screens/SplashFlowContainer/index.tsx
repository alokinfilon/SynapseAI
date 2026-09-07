import React from 'react';
import { Onboarding1Screen } from '../Onboarding1';
import { Onboarding2Screen } from '../Onboarding2';
import { Onboarding3Screen } from '../Onboarding3';
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
      return <Onboarding1Screen onNext={handleNext} />;
    case 3:
      return <Onboarding2Screen onNext={handleNext} />;
    case 4:
    default:
      return <Onboarding3Screen onNext={handleNext} />;
  }
};

export default SplashFlowContainer;
