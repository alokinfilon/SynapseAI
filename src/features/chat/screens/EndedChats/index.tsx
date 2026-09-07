import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ChatCard, ConfirmationModal } from '../../../../shared/components';
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
    onBack,
    onSelectChat,
    onSearchPress,
    onMorePress,
  } = useEndedChats(props);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.canvas }]}>
      <StatusBar barStyle={theme.isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Header Navigation */}
      <View style={styles.headerNav}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
            <Text style={[styles.backArrow, { color: theme.colors.textPrimary }]}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, theme.typography.displayLg, { color: theme.colors.textPrimary }]}>
            {ENDED_CHATS_TEXTS.headerTitle}
          </Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity onPress={onSearchPress} activeOpacity={0.7}>
            <Text style={[styles.headerIcon, { color: theme.colors.textPrimary }]}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onMorePress} activeOpacity={0.7}>
            <Text style={[styles.headerIcon, { color: theme.colors.textPrimary }]}>⋯</Text>
          </TouchableOpacity>
        </View>
      </View>

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
