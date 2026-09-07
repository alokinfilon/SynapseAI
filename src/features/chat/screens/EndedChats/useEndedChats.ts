import { useState } from 'react';
import { useTheme } from '../../../../hooks';
import { EndedChatItem, INITIAL_ENDED_CHATS } from './constants';

export interface UseEndedChatsProps {
  onBack?: () => void;
  onSelectChat?: (id: string) => void;
  onSearchPress?: () => void;
  onMorePress?: () => void;
}

export const useEndedChats = ({
  onBack,
  onSelectChat,
  onSearchPress,
  onMorePress,
}: UseEndedChatsProps) => {
  const theme = useTheme();
  const [endedChats, setEndedChats] = useState<EndedChatItem[]>(INITIAL_ENDED_CHATS);
  const [deletingChatId, setDeletingChatId] = useState<string | null>(null);

  const handleDeleteConfirm = () => {
    if (deletingChatId) {
      setEndedChats((prev) => prev.filter((item) => item.id !== deletingChatId));
      setDeletingChatId(null);
    }
  };

  return {
    theme,
    endedChats,
    deletingChatId,
    setDeletingChatId,
    handleDeleteConfirm,
    onBack,
    onSelectChat,
    onSearchPress,
    onMorePress,
  };
};
