import React, { useEffect, useRef } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  DeleteIcon,
  ExportIcon,
  LeftArrowIcon,
  MessageIcon,
  MoreIcon,
  PenIcon,
} from '../../../../../assets';
import {
  ChatInputBar,
  ChatMessageBubble,
  ConfirmationModal,
  DropdownMenu,
  HeaderBar,
  RobotAvatar,
} from '../../../../shared/components';
import { ACTIVE_CHAT_TEXTS } from './constants';
import { styles } from './styles';
import { useActiveChat, UseActiveChatProps } from './useActiveChat';
import NewChatEmptyState, { ThreeDotsLoader } from './components/NewChatEmptyState';
import MessageContextBanner from './components/MessageContextBanner';

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
    onBack,
    onEndSessionConfirm,
  } = useActiveChat(props);

  const scrollViewRef = useRef<any>(null);

  useEffect(() => {
    if (messages.length > 0 || isThinking) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length, isThinking]);

  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 80);
      }
    );
    return () => {
      showSub.remove();
    };
  }, []);

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={[styles.container, { backgroundColor: theme.colors.canvas }]}>
      <StatusBar barStyle={theme.isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <HeaderBar
        leftComponent={
          <>
            <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
              <LeftArrowIcon size={24} color={theme.colors.textPrimary} />
            </TouchableOpacity>
            <View style={styles.avatarHeaderWrapper}>
              <RobotAvatar size={46} expression="normal" />
              <View style={[styles.onlineStatusDot, { backgroundColor: theme.colors.statusOnline }]} />
            </View>
            <View style={styles.headerTitleColumn}>
              <Text style={[styles.headerTitle, { color: theme.colors.textPrimary }]}>
                {ACTIVE_CHAT_TEXTS.botName}
              </Text>
            </View>
          </>
        }
        rightActions={
          <TouchableOpacity onPress={() => setShowMenu(!showMenu)} activeOpacity={0.7}>
            <MoreIcon size={26} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        }
        style={{ zIndex: 10 }}
      />

      <DropdownMenu visible={showMenu} items={menuItems} onClose={() => setShowMenu(false)} />

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
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        <View style={styles.flex}>
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">

            {messages.length === 0 ? (
              /* New Chat Empty State */
              <NewChatEmptyState onTopicPress={handleSendMessage} />
            ) : (
              /* Active Messages List */
              <View style={styles.messagesContainer}>
                {filteredMessages.map((msg, index) => (
                  <ChatMessageBubble
                    key={msg.id}
                    id={msg.id}
                    sender={msg.sender}
                    text={msg.text}
                    imageUrl={msg.imageUrl}
                    images={msg.images}
                    time={msg.time}
                    isLatest={index === filteredMessages.length - 1}
                    onEdit={handleEditById}
                    onReply={handleReplyById}
                    onRetry={handleRetryById}
                    onDelete={handleDeleteById}
                  />
                ))}

                {/* AI Thinking Indicator */}
                {isThinking ? (
                  <View style={styles.typingBubbleRow}>
                    <RobotAvatar size={46} expression="smile" showParticles={false} />
                    <View
                      style={[
                        styles.typingBubble,
                        {
                          backgroundColor: theme.isDarkMode ? '#1F222A' : '#F1F5F9',
                          borderColor: theme.isDarkMode ? '#35383F' : '#E2E8F0',
                        },
                      ]}>
                      <ThreeDotsLoader color={theme.colors.primary} />
                    </View>
                  </View>
                ) : null}
              </View>
            )}
          </ScrollView>

          {/* Editing / Replying Context Banner */}
          <MessageContextBanner
            editingMessage={editingMessage}
            replyingMessage={replyingMessage}
            onCancelEdit={() => {
              setEditingMessage(null);
              setInputText('');
            }}
            onCancelReply={() => setReplyingMessage(null)}
          />

          {/* Chat Input Bar */}
          <ChatInputBar
            value={inputText || undefined}
            onChangeText={setInputText}
            onSend={handleSendMessage}
            onSendImage={handleSendImage}
            onSelectSuggestion={handleSendMessage}
          />
        </View>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
};

export default ActiveChatScreen;
