import { useEffect, useState } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../../../hooks';
import { AuthStackParamList } from '../../../../navigation/types';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'OTPVerification'>;
type OTPRouteProp = RouteProp<AuthStackParamList, 'OTPVerification'>;

export interface UseOTPVerificationProps {
  contactDetail?: string;
  initialCode?: string;
  onBack?: () => void;
  onVerify?: (code: string) => void;
  onResend?: () => void;
}

export const useOTPVerification = (props?: UseOTPVerificationProps) => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<OTPRouteProp>();
  const [code, setCode] = useState(props?.initialCode || '');
  const [seconds, setSeconds] = useState(55);

  const contactDetail = props?.contactDetail || route.params?.contact || '+1 111 ******99';

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [seconds]);

  const handleKeyPress = (val: string) => {
    if (code.length < 4) {
      setCode(code + val);
    }
  };

  const handleDelete = () => {
    if (code.length > 0) {
      setCode(code.slice(0, -1));
    }
  };

  const handleResendPress = () => {
    if (seconds === 0) {
      setSeconds(55);
      props?.onResend?.();
    }
  };

  const handleVerifySubmit = () => {
    if (props?.onVerify) {
      props.onVerify(code);
    } else {
      navigation.navigate('CreateNewPassword');
    }
  };

  const handleBack = () => {
    if (props?.onBack) {
      props.onBack();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleAutoFill = () => {
    setCode('5521');
  };

  return {
    theme,
    contactDetail,
    code,
    seconds,
    handleKeyPress,
    handleDelete,
    handleAutoFill,
    handleResendPress,
    handleVerifySubmit,
    onBack: handleBack,
  };
};

