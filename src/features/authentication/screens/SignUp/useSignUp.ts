import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../../../hooks';
import { AuthStackParamList } from '../../../../navigation/types';
import { useAuth } from '../../../../store';
import { SocialProvider } from '../../../../shared/components/Button/SocialButton';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'SignUp'>;

export interface UseSignUpProps {
  initialEmail?: string;
  initialPassword?: string;
  initialRememberMe?: boolean;
  onBack?: () => void;
  onSignUp?: (email: string, pass: string) => void;
  onSignInPress?: () => void;
  onSocialLogin?: (provider: SocialProvider) => void;
}

export const useSignUp = (props?: UseSignUpProps) => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { signIn } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState(props?.initialEmail || '');
  const [password, setPassword] = useState(props?.initialPassword || '');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(props?.initialRememberMe ?? true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);

  const handleSignUpSubmit = () => {
    setShowSuccessModal(true);
  };

  const confirmSignUp = () => {
    setShowSuccessModal(false);
    if (props?.onSignUp) {
      props.onSignUp(email, password);
    } else {
      navigation.navigate('FillProfile');
    }
  };

  const handleSignInPress = () => {
    if (props?.onSignInPress) {
      props.onSignInPress();
    } else {
      navigation.navigate('SignIn');
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
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    rememberMe,
    setRememberMe,
    showSuccessModal,
    setShowSuccessModal,
    showComingSoonModal,
    setShowComingSoonModal,
    confirmSignUp,
    onBack: handleBack,
    handleSignUpSubmit,
    onSignInPress: handleSignInPress,
    handleSocialLogin,
  };
};

