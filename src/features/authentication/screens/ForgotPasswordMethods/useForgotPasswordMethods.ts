import { useState } from 'react';
import { useTheme } from '../../../../hooks';

export type ResetMethod = 'sms' | 'email';

export interface UseForgotPasswordMethodsProps {
  onBack?: () => void;
  onContinue?: (method: ResetMethod) => void;
}

export const useForgotPasswordMethods = ({
  onBack,
  onContinue,
}: UseForgotPasswordMethodsProps) => {
  const theme = useTheme();
  const [selectedMethod, setSelectedMethod] = useState<ResetMethod>('sms');

  const handleContinueSubmit = () => {
    onContinue?.(selectedMethod);
  };

  return {
    theme,
    selectedMethod,
    setSelectedMethod,
    onBack,
    handleContinueSubmit,
  };
};
