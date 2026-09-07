import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchIcon } from '../../../../../assets/svg';
import { ChatCard, HeaderBar, Input } from '../../../../shared/components';
import { CHAT_LIST_TEXTS } from './constants';
import { styles } from './styles';
import { useChatListHome, UseChatListHomeProps } from './useChatListHome';

export interface ChatListHomeScreenProps extends UseChatListHomeProps {}

export const ChatListHomeScreen: React.FC<ChatListHomeScreenProps> = (props) => {
  const {
    theme,
    searchQuery,
    setSearchQuery,
    activeThreads,
    endedThreads,
    onOpenChat,
    onSeeAllEnded,
    onCustomizeRobot,
    onOpenMenu,
  } = useChatListHome(props);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.canvas }]}>
      <HeaderBar
        title={CHAT_LIST_TEXTS.headerTitle}
        rightComponent={
          <View style={styles.rightActionsRow}>
            <TouchableOpacity onPress={onCustomizeRobot}>
              <Text style={[styles.actionTextEdit, { color: theme.colors.textPrimary }]}>
                {CHAT_LIST_TEXTS.editAction}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onOpenMenu}>
              <Text style={[styles.actionTextMore, { color: theme.colors.textPrimary }]}>
                {CHAT_LIST_TEXTS.moreAction}
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Input
          placeholder={CHAT_LIST_TEXTS.searchPlaceholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<SearchIcon width={18} height={18} color={theme.colors.textMuted} />}
          style={styles.searchInput}
        />

        {/* Active Chats Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
            {CHAT_LIST_TEXTS.activeSectionTitle}
          </Text>
        </View>
        {activeThreads.map((chat) => (
          <ChatCard
            key={chat.id}
            title={chat.title}
            subtitle={chat.subtitle}
            time={chat.time}
            unreadCount={chat.unreadCount}
            expression={chat.expression}
            onPress={() => onOpenChat?.(chat.id)}
          />
        ))}

        {/* Ended Chats Section */}
        {endedThreads.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
                {CHAT_LIST_TEXTS.endedSectionTitle}
              </Text>
              <TouchableOpacity onPress={onSeeAllEnded}>
                <Text style={[styles.seeAllLink, { color: theme.colors.primary }]}>
                  {CHAT_LIST_TEXTS.seeAllLink}
                </Text>
              </TouchableOpacity>
            </View>
            {endedThreads.map((chat) => (
              <ChatCard
                key={chat.id}
                title={chat.title}
                subtitle={chat.subtitle}
                time={chat.time}
                expression={chat.expression}
                onPress={() => onOpenChat?.(chat.id)}
              />
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatListHomeScreen;
