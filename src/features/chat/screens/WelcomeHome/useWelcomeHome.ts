import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../../../hooks';
import { MainStackParamList } from '../../../../navigation/types';

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'WelcomeHome'>;

export interface UseWelcomeHomeProps {
  userName?: string;
  botName?: string;
  isOnline?: boolean;
  onNewChat?: () => void;
  onCustomizeRobot?: () => void;
  onOpenMenu?: () => void;
}

export const useWelcomeHome = (props?: UseWelcomeHomeProps) => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();

  const userName = props?.userName || 'Andrew';
  const botName = props?.botName || 'Synapse AI';
  const isOnline = props?.isOnline ?? true;

  const [comingSoonModalVisible, setComingSoonModalVisible] = useState(false);
  const [comingSoonTitle, setComingSoonTitle] = useState('');
  const [comingSoonSubtitle, setComingSoonSubtitle] = useState('');

  const handleCustomizeRobot = () => {
    if (props?.onCustomizeRobot) {
      props.onCustomizeRobot();
    } else {
      setComingSoonTitle('Trends & Insights');
      setComingSoonSubtitle('AI analytics and trend tracking will be available in an upcoming release.');
      setComingSoonModalVisible(true);
    }
  };

  const handleNewChat = () => {
    if (props?.onNewChat) {
      props.onNewChat();
    } else {
      navigation.navigate('ChatListHome');
    }
  };

  const handleOpenMenu = () => {
    if (props?.onOpenMenu) {
      props.onOpenMenu();
    } else {
      setComingSoonTitle('Settings');
      setComingSoonSubtitle('App settings and customization options will be available in an upcoming release.');
      setComingSoonModalVisible(true);
    }
  };

  const handleCloseComingSoonModal = () => {
    setComingSoonModalVisible(false);
  };

  return {
    theme,
    userName,
    botName,
    isOnline,
    onNewChat: handleNewChat,
    onCustomizeRobot: handleCustomizeRobot,
    onOpenMenu: handleOpenMenu,
    comingSoonModalVisible,
    comingSoonTitle,
    comingSoonSubtitle,
    onCloseComingSoonModal: handleCloseComingSoonModal,
  };
};

