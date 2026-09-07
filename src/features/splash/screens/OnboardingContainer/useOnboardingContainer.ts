import { useState } from 'react';
import { useTheme } from '../../../../hooks';
import { useAuth } from '../../../../store/index';
import { TOTAL_SLIDES } from './constants';

export const useOnboardingContainer = () => {
  const theme = useTheme();
  const { completeOnboarding } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < TOTAL_SLIDES - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      completeOnboarding();
    }
  };

  return {
    theme,
    currentIndex,
    handleNext,
    completeOnboarding,
    totalSlides: TOTAL_SLIDES,
  };
};
