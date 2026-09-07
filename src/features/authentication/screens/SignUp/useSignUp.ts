import { useState } from 'react';
import { useTheme } from '../../../../hooks';

export interface UseSignUpProps {
  initialEmail?: string;
  initialPassword?: string;
  initialRememberMe?: boolean;
  onBack?: () => void;
  onSignUp?: (email: string, pass: string) => void;
  onSignInPress?: () => void;
}

export const useSignUp = ({
  initialEmail = '',
  initialPassword = '',
  initialRememberMe = true,
  onBack,
  onSignUp,
  onSignInPress,
}: UseSignUpProps) => {
  const theme = useTheme();
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [rememberMe, setRememberMe] = useState(initialRememberMe);

  const handleSignUpSubmit = () => {
    onSignUp?.(email, password);
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
    handleSignUpSubmit,
    onSignInPress,
  };
};
