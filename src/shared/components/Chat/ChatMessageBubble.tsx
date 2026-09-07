import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useTheme } from '../../../hooks';
import { RobotAvatar } from '../Icon';

export type MessageSender = 'user' | 'bot';

export interface ChatMessageProps {
  id: string;
  sender: MessageSender;
  text: string;
  time?: string;
  avatarIcon?: React.ReactNode;
  style?: ViewStyle;
}

export const ChatMessageBubble: React.FC<ChatMessageProps> = ({
  sender,
  text,
  time,
  avatarIcon,
  style,
}) => {
  const theme = useTheme();
  const isUser = sender === 'user';

  const defaultAvatar = !isUser
    ? (avatarIcon || <RobotAvatar size={38} expression="smile" showParticles={false} />)
    : null;

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.botContainer,
        style,
      ]}>
      {!isUser && defaultAvatar ? (
        <View style={styles.avatarWrapper}>{defaultAvatar}</View>
      ) : null}

      <View style={styles.bubbleWrapper}>
        <View
          style={[
            styles.bubble,
            isUser
              ? [
                  styles.userBubble,
                  {
                    backgroundColor: theme.colors.primary,
                  },
                ]
              : [
                  styles.botBubble,
                  {
                    backgroundColor: theme.isDarkMode ? '#1F222A' : '#F8FAFC',
                    borderColor: theme.isDarkMode ? '#35383F' : '#E2E8F0',
                  },
                  theme.shadows.sm,
                ],
          ]}>
          <Text
            style={[
              styles.messageText,
              theme.typography.bodyLg,
              {
                color: isUser
                  ? '#FFFFFF'
                  : theme.colors.textPrimary,
              },
            ]}>
            {text}
          </Text>
        </View>

        {time ? (
          <Text
            style={[
              styles.timestamp,
              theme.typography.bodySm,
              {
                color: theme.colors.textMuted,
                textAlign: isUser ? 'right' : 'left',
              },
            ]}>
            {time}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 6,
    alignItems: 'flex-end',
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  botContainer: {
    justifyContent: 'flex-start',
  },
  avatarWrapper: {
    marginRight: 10,
    marginBottom: 4,
  },
  bubbleWrapper: {
    maxWidth: '82%',
  },
  bubble: {
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderRadius: 22,
  },
  userBubble: {
    borderBottomRightRadius: 6,
  },
  botBubble: {
    borderBottomLeftRadius: 6,
    borderWidth: 1,
  },
  messageText: {
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
    marginHorizontal: 4,
    fontWeight: '500',
  },
});

export default ChatMessageBubble;
