import React, { useState } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CrossIcon, DeleteIcon, ExportIcon, LogoutIcon, PenIcon } from '../../../../../assets/svg';
import { useTheme } from '../../../../hooks';
import { MainStackParamList } from '../../../../navigation/types';
import { generateGeminiResponse } from '../../../../services/api/geminiService';
import { generateGroqResponse } from '../../../../services/api/groqService';
import { DropdownMenuItem } from '../../../../shared/components';
import { ACTIVE_CHAT_TEXTS, ChatMessage, INITIAL_CHAT_MESSAGES } from './constants';

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'ActiveChat'>;
type ActiveChatRouteProp = RouteProp<MainStackParamList, 'ActiveChat'>;

export interface UseActiveChatProps {
  initialMessages?: ChatMessage[];
  onBack?: () => void;
  onSearchPress?: () => void;
  onEndSessionConfirm?: () => void;
}

export const useActiveChat = (props?: UseActiveChatProps) => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ActiveChatRouteProp>();

  const isNewChat = route.params?.threadId === 'new';
  const initialMessages = props?.initialMessages || (isNewChat ? [] : INITIAL_CHAT_MESSAGES);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [showMenu, setShowMenu] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Long press & context state
  const [selectedMessage, setSelectedMessage] = useState<ChatMessage | null>(null);
  const [showMessageActionModal, setShowMessageActionModal] = useState(false);
  const [editingMessage, setEditingMessage] = useState<ChatMessage | null>(null);
  const [replyingMessage, setReplyingMessage] = useState<ChatMessage | null>(null);
  const [inputText, setInputText] = useState('');

  const handleEditLastMessage = () => {
    const userMsgs = messages.filter((m) => m.sender === 'user');
    const lastUserMsg = userMsgs[userMsgs.length - 1];
    if (lastUserMsg) {
      setEditingMessage(lastUserMsg);
      setInputText(lastUserMsg.text);
    }
  };

  const handleDeleteLastMessage = () => {
    if (messages.length > 0) {
      setMessages((prev) => prev.slice(0, -1));
    }
  };

  const menuItems: DropdownMenuItem[] = [
    {
      id: 'edit_last',
      label: 'Edit Last Message',
      icon: <PenIcon size={18} color={theme.colors.textPrimary} />,
      onPress: handleEditLastMessage,
    },
    {
      id: 'delete_last',
      label: 'Delete Last Message',
      icon: <DeleteIcon size={18} color={theme.colors.statusError} />,
      onPress: handleDeleteLastMessage,
    },
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

  const handleDeleteMessage = () => {
    if (selectedMessage) {
      setMessages((prev) => prev.filter((m) => m.id !== selectedMessage.id));
      setShowMessageActionModal(false);
      setSelectedMessage(null);
    }
  };

  const handleEditMessage = () => {
    if (selectedMessage) {
      setEditingMessage(selectedMessage);
      setInputText(selectedMessage.text);
      setShowMessageActionModal(false);
      setSelectedMessage(null);
    }
  };

  const handleReplyMessage = () => {
    if (selectedMessage) {
      setReplyingMessage(selectedMessage);
      setShowMessageActionModal(false);
      setSelectedMessage(null);
    }
  };

  const handleDeleteById = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const handleEditById = (id: string) => {
    const target = messages.find((m) => m.id === id);
    if (target) {
      setEditingMessage(target);
      setInputText(target.text);
    }
  };

  const handleReplyById = (id: string) => {
    const target = messages.find((m) => m.id === id);
    if (target) {
      setReplyingMessage(target);
    }
  };

  const getFormattedCurrentTime = (): string => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minStr = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minStr} ${ampm}`;
  };

  const handleRetryById = async (id: string) => {
    const target = messages.find((m) => m.id === id);
    if (!target) return;

    let userPromptText = '';
    if (target.sender === 'bot') {
      const botIdx = messages.findIndex((m) => m.id === id);
      if (botIdx > 0 && messages[botIdx - 1].sender === 'user') {
        userPromptText = messages[botIdx - 1].text;
      } else {
        userPromptText = target.text;
      }
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } else {
      userPromptText = target.text;
    }

    if (!userPromptText.trim()) return;

    const timeStr = getFormattedCurrentTime();

    setIsThinking(true);
    try {
      let replyText = await generateGroqResponse([...messages]);
      if (!replyText) {
        replyText = await generateGeminiResponse([...messages]);
      }
      const newBotMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: replyText,
        time: timeStr,
      };
      setMessages((prev) => [...prev, newBotMsg]);
    } catch (e) {
      const fallbackBotMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: ACTIVE_CHAT_TEXTS.botFallbackReply,
        time: timeStr,
      };
      setMessages((prev) => [...prev, fallbackBotMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleRetryResponse = async () => {
    if (!selectedMessage) return;
    await handleRetryById(selectedMessage.id);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const timeStr = getFormattedCurrentTime();

    let sendText = text.trim();
    if (replyingMessage) {
      sendText = `Replying to: "${replyingMessage.text}"\n\n${sendText}`;
      setReplyingMessage(null);
    }

    if (editingMessage) {
      setMessages((prev) =>
        prev.map((m) => (m.id === editingMessage.id ? { ...m, text: sendText } : m))
      );
      setEditingMessage(null);
      setInputText('');
      setIsThinking(true);
      try {
        let replyText = await generateGroqResponse([...messages]);
        if (!replyText) {
          replyText = await generateGeminiResponse([...messages]);
        }
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: replyText,
          time: timeStr,
        };
        setMessages((prev) => [...prev, botMsg]);
      } catch (err) {
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: ACTIVE_CHAT_TEXTS.botFallbackReply,
          time: timeStr,
        };
        setMessages((prev) => [...prev, botMsg]);
      } finally {
        setIsThinking(false);
      }
      return;
    }

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: sendText,
      time: timeStr,
    };

    setInputText('');
    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);

    try {
      const currentHistory = [...messages, userMsg];
      let replyText = await generateGroqResponse(currentHistory);
      if (!replyText) {
        replyText = await generateGeminiResponse(currentHistory);
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: replyText,
        time: timeStr,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: ACTIVE_CHAT_TEXTS.botFallbackReply,
        time: timeStr,
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleSendImage = (imageInput: string | string[], caption?: string) => {
    const timeStr = getFormattedCurrentTime();
    const imagesList = Array.isArray(imageInput) ? imageInput : [imageInput];

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: caption ? caption.trim() : '',
      imageUrl: imagesList[0],
      images: imagesList,
      time: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);

    setTimeout(() => {
      const botMsgText = imagesList.length > 1
        ? `📸 Great photos! I received all ${imagesList.length} images.`
        : '📸 What a great photo! I have received your image.';

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botMsgText,
        time: timeStr,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsThinking(false);
    }, 1200);
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

  const handleEndSessionConfirm = () => {
    if (props?.onEndSessionConfirm) {
      props.onEndSessionConfirm();
    } else {
      navigation.navigate('ChatListHome');
    }
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
    editingMessage,
    setEditingMessage,
    replyingMessage,
    setReplyingMessage,
    inputText,
    setInputText,
    handleDeleteById,
    handleEditById,
    handleReplyById,
    handleRetryById,
    handleSendMessage,
    handleSendImage,
    onBack: handleBack,
    onEndSessionConfirm: handleEndSessionConfirm,
  };
};
