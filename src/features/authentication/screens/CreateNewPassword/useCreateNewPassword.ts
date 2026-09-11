import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../../../hooks';
import { AuthStackParamList } from '../../../../navigation/types';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'CreateNewPassword'>;

export interface UseCreateNewPasswordProps {
  onBack?: () => void;
  onSubmit?: (newPass: string) => void;
}

export const useCreateNewPassword = (props?: UseCreateNewPasswordProps) => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = () => {
    if (props?.onSubmit) {
      props.onSubmit(password);
    } else {
      navigation.navigate('SignIn');
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
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    rememberMe,
    setRememberMe,
    onBack: handleBack,
    handleSubmit,
  };
};

