import { useState } from 'react';

export const useSplashFlowContainer = () => {
  const [step, setStep] = useState(0);

  const handleNext = () => setStep((prev) => prev + 1);

  return {
    step,
    handleNext,
  };
};
