import React from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LeftArrowIcon, MoreIcon, SearchIcon } from '../../../../../assets/svg';
import { ChatCard, ConfirmationModal, HeaderBar, Input } from '../../../../shared/components';
import { ENDED_CHATS_TEXTS } from './constants';
import { styles } from './styles';
import { useEndedChats, UseEndedChatsProps } from './useEndedChats';

export interface EndedChatsScreenProps extends UseEndedChatsProps {}

export const EndedChatsScreen: React.FC<EndedChatsScreenProps> = (props) => {
  const {
    theme,
    endedChats,
    deletingChatId,
    setDeletingChatId,
    handleDeleteConfirm,
    searchQuery,
    setSearchQuery,
    isSearchVisible,
    onBack,
    onSelectChat,
    onSearchPress,
    onMorePress,
  } = useEndedChats(props);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.canvas }]}>
      <StatusBar barStyle={theme.isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Shared Header */}
      <HeaderBar
        leftComponent={
          <>
            <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
              <LeftArrowIcon size={24} color={theme.colors.textPrimary} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: theme.colors.textPrimary }]}>
              {ENDED_CHATS_TEXTS.headerTitle}
            </Text>
          </>
        }
        rightActions={
          <>
            <TouchableOpacity onPress={onSearchPress} activeOpacity={0.7}>
              <SearchIcon size={19} color={theme.colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onMorePress} activeOpacity={0.7}>
              <MoreIcon size={22} color={theme.colors.textPrimary} />
            </TouchableOpacity>
          </>
        }
      />

      {/* Search Input Bar */}
      {isSearchVisible && (
        <View style={styles.searchBarContainer}>
          <Input
            placeholder="Search ended chats..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            leftIcon={<SearchIcon size={19} color={theme.colors.textMuted} />}
          />
        </View>
      )}

      {/* Delete Chat Confirmation Modal */}
      <ConfirmationModal
        visible={Boolean(deletingChatId)}
        title={ENDED_CHATS_TEXTS.deleteModalTitle}
        subtitle={ENDED_CHATS_TEXTS.deleteModalSubtitle}
        confirmText={ENDED_CHATS_TEXTS.deleteModalConfirm}
        cancelText={ENDED_CHATS_TEXTS.deleteModalCancel}
        onCancel={() => setDeletingChatId(null)}
        onConfirm={handleDeleteConfirm}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {endedChats.map((chat) => (
          <ChatCard
            key={chat.id}
            title={chat.title}
            subtitle={chat.subtitle}
            expression={chat.expression}
            isSwiped={chat.isSwiped}
            onPress={() => onSelectChat?.(chat.id)}
            onDeletePress={() => setDeletingChatId(chat.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EndedChatsScreen;
