import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../../../hooks';
import { AuthStackParamList } from '../../../../navigation/types';
import { useAuth } from '../../../../store';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'FillProfile'>;

export interface UseFillProfileProps {
  initialFullName?: string;
  initialNickname?: string;
  initialEmail?: string;
  initialPhone?: string;
  initialAvatarUri?: string;
  onBack?: () => void;
  onContinue?: (data: { fullName: string; nickname: string; email: string; phone: string }) => void;
}

export const useFillProfile = (props?: UseFillProfileProps) => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { signUp } = useAuth();

  const [fullName, setFullName] = useState(props?.initialFullName || '');
  const [nickname, setNickname] = useState(props?.initialNickname || '');
  const [email, setEmail] = useState(props?.initialEmail || '');
  const [phone, setPhone] = useState(props?.initialPhone || '');
  const [avatarUri, setAvatarUri] = useState<string | undefined>(props?.initialAvatarUri);

  const handleContinue = () => {
    if (props?.onContinue) {
      props.onContinue({ fullName, nickname, email, phone });
    } else {
      signUp({
        id: 'usr_' + Date.now(),
        fullName: fullName || 'Andrew Ainsley',
        email: email || 'andrew.ainsley@example.com',
        avatarUrl: avatarUri || 'https://i.pravatar.cc/150?img=12',
      });
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
    nickname,
    setNickname,
    email,
    setEmail,
    phone,
    setPhone,
    avatarUri,
    setAvatarUri,
    onBack: handleBack,
    handleContinue,
  };
};

