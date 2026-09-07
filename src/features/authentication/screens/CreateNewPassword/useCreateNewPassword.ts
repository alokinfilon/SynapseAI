import { useState } from 'react';
import { useTheme } from '../../../../hooks';

export interface UseCreateNewPasswordProps {
  onBack?: () => void;
  onSubmit?: (newPass: string) => void;
}

export const useCreateNewPassword = ({
  onBack,
  onSubmit,
}: UseCreateNewPasswordProps) => {
  const theme = useTheme();
  const [password, setPassword] = useState('••••••••••••');
  const [confirmPassword, setConfirmPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = () => {
    onSubmit?.(password);
  };

  return {
    theme,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    rememberMe,
    setRememberMe,
    onBack,
    handleSubmit,
  };
};
