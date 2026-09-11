import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../../../hooks';
import { MainStackParamList } from '../../../../navigation/types';
import { EndedChatItem, INITIAL_ENDED_CHATS } from './constants';

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'EndedChats'>;

export interface UseEndedChatsProps {
  onBack?: () => void;
  onSelectChat?: (id: string) => void;
  onSearchPress?: () => void;
  onMorePress?: () => void;
}

export const useEndedChats = (props?: UseEndedChatsProps) => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [endedChats, setEndedChats] = useState<EndedChatItem[]>(INITIAL_ENDED_CHATS);
  const [deletingChatId, setDeletingChatId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
  };

  const handleDeleteConfirm = () => {
    if (deletingChatId) {
      setEndedChats((prev) => prev.filter((item) => item.id !== deletingChatId));
      setDeletingChatId(null);
    }
  };

  const handleBack = () => {
    if (props?.onBack) {
      props.onBack();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('ChatListHome');
    }
  };

  const handleSelectChat = (id: string) => {
    if (props?.onSelectChat) {
      props.onSelectChat(id);
    } else {
      navigation.navigate('ActiveChat', { threadId: id });
    }
  };

  const filteredChats = endedChats.filter(
    (chat) =>
      chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.subtitle.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return {
    theme,
    endedChats: filteredChats,
    deletingChatId,
    setDeletingChatId,
    handleDeleteConfirm,
    searchQuery,
    setSearchQuery,
    isSearchVisible,
    toggleSearch,
    onBack: handleBack,
    onSelectChat: handleSelectChat,
    onSearchPress: props?.onSearchPress || toggleSearch,
    onMorePress: props?.onMorePress,
  };
};
