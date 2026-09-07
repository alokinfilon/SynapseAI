import { useTheme } from '../../../../hooks';

export interface UseLetsInProps {
  onBack?: () => void;
  onSignInWithPassword?: () => void;
  onSignUpPress?: () => void;
  onSocialLogin?: (provider: 'facebook' | 'google' | 'apple') => void;
}

export const useLetsIn = ({
  onBack,
  onSignInWithPassword,
  onSignUpPress,
  onSocialLogin,
}: UseLetsInProps) => {
  const theme = useTheme();

  const handleFacebookLogin = () => onSocialLogin?.('facebook');
  const handleGoogleLogin = () => onSocialLogin?.('google');
  const handleAppleLogin = () => onSocialLogin?.('apple');

  return {
    theme,
    handleFacebookLogin,
    handleGoogleLogin,
    handleAppleLogin,
    onBack,
    onSignInWithPassword,
    onSignUpPress,
  };
};
