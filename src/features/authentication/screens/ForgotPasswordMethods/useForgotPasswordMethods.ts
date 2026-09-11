import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../../../hooks';
import { AuthStackParamList } from '../../../../navigation/types';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'ForgotPasswordMethods'>;

export type ResetMethod = 'sms' | 'email';

export interface UseForgotPasswordMethodsProps {
  onBack?: () => void;
  onContinue?: (method: ResetMethod) => void;
}

export const useForgotPasswordMethods = (props?: UseForgotPasswordMethodsProps) => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [selectedMethod, setSelectedMethod] = useState<ResetMethod>('sms');
  const [contactInput, setContactInput] = useState('');

  const handleContinueSubmit = () => {
    const defaultContact = selectedMethod === 'sms' ? '+1 111 ******99' : 'and***@yourdomain.com';
    const finalContact = contactInput.trim() || defaultContact;

    if (props?.onContinue) {
      props.onContinue(selectedMethod);
    } else {
      navigation.navigate('OTPVerification', { method: selectedMethod, contact: finalContact });
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
    selectedMethod,
    setSelectedMethod,
    contactInput,
    setContactInput,
    onBack: handleBack,
    handleContinueSubmit,
  };
};

