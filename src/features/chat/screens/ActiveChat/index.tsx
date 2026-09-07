import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LeftArrowIcon, MoreIcon, SearchIcon } from '../../../../../assets/svg';
import {
  ChatInputBar,
  ChatMessageBubble,
  ConfirmationModal,
  DropdownMenu,
  RobotAvatar,
  RobotIllustration,
  RobotLoader,
} from '../../../../shared/components';
import { ACTIVE_CHAT_TEXTS, CHAT_SUGGESTIONS } from './constants';
import { styles } from './styles';
import { useActiveChat, UseActiveChatProps } from './useActiveChat';

export interface ActiveChatScreenProps extends UseActiveChatProps {}

export const ActiveChatScreen: React.FC<ActiveChatScreenProps> = (props) => {
  const {
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
  } = useActiveChat(props);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.canvas }]}>
      <StatusBar barStyle={theme.isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Top Header Navigation */}
      <View style={styles.headerNav}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
            <LeftArrowIcon size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <View style={styles.avatarHeaderWrapper}>
            <RobotAvatar size={36} expression="smile" />
            <View style={[styles.onlineStatusDot, { backgroundColor: theme.colors.statusOnline }]} />
          </View>
          <View style={styles.headerTitleColumn}>
            <Text style={[styles.headerTitle, theme.typography.headingSm, { color: theme.colors.textPrimary }]}>
              {ACTIVE_CHAT_TEXTS.botName}
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.primary }]}>
              {ACTIVE_CHAT_TEXTS.botSubtitle}
            </Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => setShowSearch(!showSearch)} activeOpacity={0.7}>
            <SearchIcon
              size={22}
              color={showSearch ? theme.colors.primary : theme.colors.textPrimary}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowMenu(!showMenu)} activeOpacity={0.7}>
            <MoreIcon size={22} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Toggleable Search Bar */}
      {showSearch ? (
        <View style={styles.searchBarContainer}>
          <View
            style={[
              styles.searchBar,
              {
                backgroundColor: theme.isDarkMode ? '#1F222A' : '#F1F5F9',
                borderColor: theme.isDarkMode ? '#35383F' : '#E2E8F0',
              },
            ]}>
            <SearchIcon size={18} color={theme.colors.textMuted} />
            <TextInput
              style={[styles.searchInput, theme.typography.bodyMd, { color: theme.colors.textPrimary }]}
              placeholder={ACTIVE_CHAT_TEXTS.searchPlaceholder}
              placeholderTextColor={theme.colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
          </View>
        </View>
      ) : null}

      {/* Dropdown Menu Popup */}
      <DropdownMenu visible={showMenu} items={menuItems} onClose={() => setShowMenu(false)} />

      {/* End Session Confirmation Modal */}
      <ConfirmationModal
        visible={showEndModal}
        title={ACTIVE_CHAT_TEXTS.endModalTitle}
        subtitle={ACTIVE_CHAT_TEXTS.endModalSubtitle}
        confirmText={ACTIVE_CHAT_TEXTS.endModalConfirm}
        cancelText={ACTIVE_CHAT_TEXTS.endModalCancel}
        onCancel={() => setShowEndModal(false)}
        onConfirm={() => {
          setShowEndModal(false);
          onEndSessionConfirm?.();
        }}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {/* Top Bobo AI Robot Hero Illustration */}
          <View style={styles.illustrationWrapper}>
            <RobotIllustration size={130} />
          </View>

          {/* Chat Messages */}
          <View style={styles.messagesContainer}>
            {filteredMessages.map((msg) => (
              <ChatMessageBubble
                key={msg.id}
                id={msg.id}
                sender={msg.sender}
                text={msg.text}
                time={msg.time}
              />
            ))}

            {/* AI Response Loading Typing Indicator */}
            {isThinking ? (
              <View style={styles.loaderContainer}>
                <RobotLoader size={36} mode="typing" expression="thinking" />
                <Text style={[styles.thinkingText, { color: theme.colors.textMuted }]}>
                  {ACTIVE_CHAT_TEXTS.typingText}
                </Text>
              </View>
            ) : null}
          </View>
        </ScrollView>

        {/* Bottom Input Bar with Suggestions */}
        <ChatInputBar
          onSend={handleSendMessage}
          suggestions={messages.length < 7 ? CHAT_SUGGESTIONS : undefined}
          onSelectSuggestion={handleSendMessage}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ActiveChatScreen;
