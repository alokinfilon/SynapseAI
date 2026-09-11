import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../../../hooks';
import { MainStackParamList } from '../../../../navigation/types';
import { ChatThreadItem, MOCK_CHAT_THREADS } from './constants';

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'ChatListHome'>;

export interface UseChatListHomeProps {
  threads?: ChatThreadItem[];
  onOpenChat?: (id: string) => void;
  onSeeAllEnded?: () => void;
  onNewChat?: () => void;
  onCustomizeRobot?: () => void;
  onOpenMenu?: () => void;
}

export const useChatListHome = (props?: UseChatListHomeProps) => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [threadsList, setThreadsList] = useState<ChatThreadItem[]>(
    props?.threads || MOCK_CHAT_THREADS,
  );

  // Modal States for Delete and Edit Options
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [threadForOptions, setThreadForOptions] = useState<ChatThreadItem | null>(null);
  const [menuTop, setMenuTop] = useState<number>(140);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [threadToDelete, setThreadToDelete] = useState<ChatThreadItem | null>(null);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [threadToEdit, setThreadToEdit] = useState<ChatThreadItem | null>(null);
  const [editTitleText, setEditTitleText] = useState('');

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
  };

  const activeThreads = threadsList.filter(
    (t) => !t.isEnded && t.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const endedThreads = threadsList.filter(
    (t) => t.isEnded && t.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleOpenChat = (id: string) => {
    if (props?.onOpenChat) {
      props.onOpenChat(id);
    } else {
      navigation.navigate('ActiveChat', { threadId: id });
    }
  };

  // Long Press Handler
  const handleLongPressChat = (thread: ChatThreadItem, pageY?: number) => {
    setThreadForOptions(thread);
    if (pageY) {
      // Calculate top position clamped to visible screen area
      setMenuTop(Math.min(Math.max(pageY - 20, 90), 540));
    } else {
      setMenuTop(160);
    }
    setOptionsModalVisible(true);
  };

  const handleCloseOptionsModal = () => {
    setOptionsModalVisible(false);
  };

  const handleSelectEditFromOptions = () => {
    if (threadForOptions) {
      setThreadToEdit(threadForOptions);
      setEditTitleText(threadForOptions.title);
      setOptionsModalVisible(false);
      setEditModalVisible(true);
    }
  };

  const handleSelectDeleteFromOptions = () => {
    if (threadForOptions) {
      setThreadToDelete(threadForOptions);
      setOptionsModalVisible(false);
      setDeleteModalVisible(true);
    }
  };

  // Delete Action Handlers
  const handleOpenDeleteModal = (id: string) => {
    const thread = threadsList.find((t) => t.id === id);
    if (thread) {
      setThreadToDelete(thread);
      setDeleteModalVisible(true);
    }
  };

  const handleConfirmDelete = () => {
    if (threadToDelete) {
      setThreadsList((prev) => prev.filter((t) => t.id !== threadToDelete.id));
    }
    setDeleteModalVisible(false);
    setThreadToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
    setThreadToDelete(null);
  };

  // Edit Action Handlers
  const handleOpenEditModal = (id: string) => {
    const thread = threadsList.find((t) => t.id === id);
    if (thread) {
      setThreadToEdit(thread);
      setEditTitleText(thread.title);
      setEditModalVisible(true);
    }
  };

  const handleSaveEdit = () => {
    if (threadToEdit && editTitleText.trim().length > 0) {
      setThreadsList((prev) =>
        prev.map((t) => (t.id === threadToEdit.id ? { ...t, title: editTitleText.trim() } : t)),
      );
    }
    setEditModalVisible(false);
    setThreadToEdit(null);
    setEditTitleText('');
  };

  const handleCancelEdit = () => {
    setEditModalVisible(false);
    setThreadToEdit(null);
    setEditTitleText('');
  };

  const handleSeeAllEnded = () => {
    if (props?.onSeeAllEnded) {
      props.onSeeAllEnded();
    } else {
      navigation.navigate('EndedChats');
    }
  };

  const handleNewChat = () => {
    if (props?.onNewChat) {
      props.onNewChat();
    } else {
      navigation.navigate('ActiveChat', { threadId: 'new' });
    }
  };

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
    searchQuery,
    setSearchQuery,
    isSearchVisible,
    toggleSearch,
    activeThreads,
    endedThreads,
    onOpenChat: handleOpenChat,
    onLongPressChat: handleLongPressChat,
    onSeeAllEnded: handleSeeAllEnded,
    onNewChat: handleNewChat,
    onCustomizeRobot: handleCustomizeRobot,
    onOpenMenu: handleOpenMenu,
    // Coming Soon Modal
    comingSoonModalVisible,
    comingSoonTitle,
    comingSoonSubtitle,
    onCloseComingSoonModal: handleCloseComingSoonModal,
    // Long Press Options Modal
    optionsModalVisible,
    threadForOptions,
    menuTop,
    onCloseOptionsModal: handleCloseOptionsModal,
    onSelectEditFromOptions: handleSelectEditFromOptions,
    onSelectDeleteFromOptions: handleSelectDeleteFromOptions,
    // Delete Modal
    deleteModalVisible,
    threadToDelete,
    onOpenDeleteModal: handleOpenDeleteModal,
    onConfirmDelete: handleConfirmDelete,
    onCancelDelete: handleCancelDelete,
    // Edit Modal
    editModalVisible,
    threadToEdit,
    editTitleText,
    setEditTitleText,
    onOpenEditModal: handleOpenEditModal,
    onSaveEdit: handleSaveEdit,
    onCancelEdit: handleCancelEdit,
  };
};
