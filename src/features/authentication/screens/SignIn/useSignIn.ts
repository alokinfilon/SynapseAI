import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../../../hooks';
import { AuthStackParamList } from '../../../../navigation/types';
import { useAuth } from '../../../../store';
import { SocialProvider } from '../../../../shared/components/Button/SocialButton';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'SignIn'>;

export interface UseSignInProps {
  initialEmail?: string;
  initialPassword?: string;
  initialRememberMe?: boolean;
  onBack?: () => void;
  onSignIn?: (email: string, pass: string) => void;
  onForgotPassword?: () => void;
  onSignUpPress?: () => void;
  onSocialLogin?: (provider: SocialProvider) => void;
}

export const useSignIn = (props?: UseSignInProps) => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { signIn } = useAuth();

  const [email, setEmail] = useState(props?.initialEmail || '');
  const [password, setPassword] = useState(props?.initialPassword || '');
  const [rememberMe, setRememberMe] = useState(props?.initialRememberMe ?? true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);

  const handleSignInSubmit = () => {
    setShowSuccessModal(true);
  };

  const confirmSignIn = () => {
    setShowSuccessModal(false);
    if (props?.onSignIn) {
      props.onSignIn(email, password);
    } else {
      signIn(email || 'andrew.ainsley@example.com');
    }
  };

  const handleForgotPassword = () => {
    if (props?.onForgotPassword) {
      props.onForgotPassword();
    } else {
      navigation.navigate('ForgotPasswordMethods');
    }
  };

  const handleSignUpPress = () => {
    if (props?.onSignUpPress) {
      props.onSignUpPress();
    } else {
      navigation.navigate('SignUp');
    }
  };

  const handleSocialLogin = (provider: SocialProvider) => {
    if (props?.onSocialLogin) {
      props.onSocialLogin(provider);
    } else {
      setShowComingSoonModal(true);
    }
  };

  const handleBack = () => {
    if (props?.onBack) {
      props.onBack();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return {
    theme,
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    showSuccessModal,
    setShowSuccessModal,
    showComingSoonModal,
    setShowComingSoonModal,
    confirmSignIn,
    onBack: handleBack,
    handleSignInSubmit,
    onForgotPassword: handleForgotPassword,
    onSignUpPress: handleSignUpPress,
    handleSocialLogin,
  };
};

