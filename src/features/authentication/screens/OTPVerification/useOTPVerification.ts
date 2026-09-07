import { useEffect, useState } from 'react';
import { useTheme } from '../../../../hooks';

export interface UseOTPVerificationProps {
  contactDetail?: string;
  initialCode?: string;
  onBack?: () => void;
  onVerify?: (code: string) => void;
  onResend?: () => void;
}

export const useOTPVerification = ({
  contactDetail = '+1 111 ******99',
  initialCode = '',
  onBack,
  onVerify,
  onResend,
}: UseOTPVerificationProps) => {
  const theme = useTheme();
  const [code, setCode] = useState(initialCode);
  const [seconds, setSeconds] = useState(55);

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
      onResend?.();
    }
  };

  const handleVerifySubmit = () => {
    onVerify?.(code);
  };

  return {
    theme,
    contactDetail,
    code,
    seconds,
    handleKeyPress,
    handleDelete,
    handleResendPress,
    handleVerifySubmit,
    onBack,
  };
};
