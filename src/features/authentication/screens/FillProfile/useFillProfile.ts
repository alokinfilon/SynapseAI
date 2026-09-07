import { useState } from 'react';
import { useTheme } from '../../../../hooks';

export interface UseFillProfileProps {
  initialFullName?: string;
  initialNickname?: string;
  initialEmail?: string;
  initialPhone?: string;
  initialAvatarUri?: string;
  onBack?: () => void;
  onContinue?: (data: { fullName: string; nickname: string; email: string; phone: string }) => void;
}

export const useFillProfile = ({
  initialFullName = '',
  initialNickname = '',
  initialEmail = '',
  initialPhone = '',
  initialAvatarUri,
  onBack,
  onContinue,
}: UseFillProfileProps) => {
  const theme = useTheme();
  const [fullName, setFullName] = useState(initialFullName);
  const [nickname, setNickname] = useState(initialNickname);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);
  const [avatarUri, setAvatarUri] = useState<string | undefined>(initialAvatarUri);

  const handleContinue = () => {
    onContinue?.({ fullName, nickname, email, phone });
  };

  return {
    theme,
    fullName,
    setFullName,
    nickname,
    setNickname,
    email,
    setEmail,
    phone,
    setPhone,
    avatarUri,
    setAvatarUri,
    onBack,
    handleContinue,
  };
};
