import React, { useState } from 'react';
import { CrossIcon, ExportIcon, LogoutIcon } from '../../../../../assets/svg';
import { useTheme } from '../../../../hooks';
import { DropdownMenuItem } from '../../../../shared/components';
import { ACTIVE_CHAT_TEXTS, ChatMessage, INITIAL_CHAT_MESSAGES } from './constants';

export interface UseActiveChatProps {
  initialMessages?: ChatMessage[];
  onBack?: () => void;
  onSearchPress?: () => void;
  onEndSessionConfirm?: () => void;
}

export const useActiveChat = ({
  initialMessages = INITIAL_CHAT_MESSAGES,
  onBack,
  onEndSessionConfirm,
}: UseActiveChatProps) => {
  const theme = useTheme();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [showMenu, setShowMenu] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems: DropdownMenuItem[] = [
    {
      id: 'clear',
      label: 'Clear Chat',
      icon: <CrossIcon size={18} color={theme.colors.textPrimary} />,
      onPress: () => setMessages([]),
    },
    {
      id: 'export',
      label: 'Export Chat',
      icon: <ExportIcon size={18} color={theme.colors.textPrimary} />,
      onPress: () => {},
    },
    {
      id: 'end',
      label: 'End Session',
      icon: <LogoutIcon size={18} color={theme.colors.statusError} />,
      isDestructive: true,
      onPress: () => setShowEndModal(true),
    },
  ];

  const handleSendMessage = (text: string) => {
    const now = new Date();
    const timeStr = `${now.getHours() % 12 || 12}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: timeStr,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: ACTIVE_CHAT_TEXTS.botFallbackReply,
        time: timeStr,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsThinking(false);
    }, 1800);
  };

  const filteredMessages = messages.filter((msg) => {
    if (!searchQuery.trim()) return true;
    return msg.text.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return {
    theme,
    messages,
    filteredMessages,
    showMenu,
    setShowMenu,
    showEndModal,
    setShowEndModal,
    isThinking,
    showSearch,
    setShowSearch,
    searchQuery,
    setSearchQuery,
    menuItems,
    handleSendMessage,
    onBack,
    onEndSessionConfirm,
  };
};
