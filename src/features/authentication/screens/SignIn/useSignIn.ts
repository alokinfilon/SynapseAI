import { useState } from 'react';
import { useTheme } from '../../../../hooks';

export interface UseSignInProps {
  initialEmail?: string;
  initialPassword?: string;
  initialRememberMe?: boolean;
  onBack?: () => void;
  onSignIn?: (email: string, pass: string) => void;
  onForgotPassword?: () => void;
  onSignUpPress?: () => void;
}

export const useSignIn = ({
  initialEmail = '',
  initialPassword = '',
  initialRememberMe = true,
  onBack,
  onSignIn,
  onForgotPassword,
  onSignUpPress,
}: UseSignInProps) => {
  const theme = useTheme();
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [rememberMe, setRememberMe] = useState(initialRememberMe);

  const handleSignInSubmit = () => {
    onSignIn?.(email, password);
  };

  return {
    theme,
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    onBack,
    handleSignInSubmit,
    onForgotPassword,
    onSignUpPress,
  };
};
