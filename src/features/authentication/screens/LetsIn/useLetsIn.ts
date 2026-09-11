import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../../../hooks';
import { AuthStackParamList } from '../../../../navigation/types';
import { useAuth } from '../../../../store';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'LetsIn'>;

export interface UseLetsInProps {
  onBack?: () => void;
  onSignInWithPassword?: () => void;
  onSignUpPress?: () => void;
  onSocialLogin?: (provider: 'facebook' | 'google' | 'apple') => void;
}

export const useLetsIn = (props?: UseLetsInProps) => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { signIn } = useAuth();
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);

  const handleFacebookLogin = () => {
    if (props?.onSocialLogin) {
      props.onSocialLogin('facebook');
    } else {
      setShowComingSoonModal(true);
    }
  };

  const handleGoogleLogin = () => {
    if (props?.onSocialLogin) {
      props.onSocialLogin('google');
    } else {
      setShowComingSoonModal(true);
    }
  };

  const handleAppleLogin = () => {
    if (props?.onSocialLogin) {
      props.onSocialLogin('apple');
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

  const handleSignInWithPassword = () => {
    if (props?.onSignInWithPassword) {
      props.onSignInWithPassword();
    } else {
      navigation.navigate('SignIn');
    }
  };

  const handleSignUpPress = () => {
    if (props?.onSignUpPress) {
      props.onSignUpPress();
    } else {
      navigation.navigate('SignUp');
    }
  };

  return {
    theme,
    showComingSoonModal,
    setShowComingSoonModal,
    handleFacebookLogin,
    handleGoogleLogin,
    handleAppleLogin,
    onBack: handleBack,
    onSignInWithPassword: handleSignInWithPassword,
    onSignUpPress: handleSignUpPress,
  };
};

