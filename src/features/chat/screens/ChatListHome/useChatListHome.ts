import { useState } from 'react';
import { useTheme } from '../../../../hooks';
import { ChatThreadItem, MOCK_CHAT_THREADS } from './constants';

export interface UseChatListHomeProps {
  threads?: ChatThreadItem[];
  onOpenChat?: (id: string) => void;
  onSeeAllEnded?: () => void;
  onNewChat?: () => void;
  onCustomizeRobot?: () => void;
  onOpenMenu?: () => void;
}

export const useChatListHome = ({
  threads = MOCK_CHAT_THREADS,
  onOpenChat,
  onSeeAllEnded,
  onNewChat,
  onCustomizeRobot,
  onOpenMenu,
}: UseChatListHomeProps) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const activeThreads = threads.filter(
    (t) => !t.isEnded && t.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const endedThreads = threads.filter(
    (t) => t.isEnded && t.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return {
    theme,
    searchQuery,
    setSearchQuery,
    activeThreads,
    endedThreads,
    onOpenChat,
    onSeeAllEnded,
    onNewChat,
    onCustomizeRobot,
    onOpenMenu,
  };
};
