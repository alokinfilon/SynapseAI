import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChatMessage } from '../constants';
import { useTheme } from '../../../../../hooks';

export interface MessageContextBannerProps {
  editingMessage: ChatMessage | null;
  replyingMessage: ChatMessage | null;
  onCancelEdit: () => void;
  onCancelReply: () => void;
}

export const MessageContextBanner: React.FC<MessageContextBannerProps> = ({
  editingMessage,
  replyingMessage,
  onCancelEdit,
  onCancelReply,
}) => {
  const theme = useTheme();

  if (!editingMessage && !replyingMessage) return null;

  const bannerStyle = {
    backgroundColor: theme.isDarkMode ? '#262A34' : '#F0FDFA',
    borderColor: theme.isDarkMode ? '#35383F' : '#E2E8F0',
  };

  if (editingMessage) {
    return (
      <View style={[styles.contextBannerRow, bannerStyle]}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 11, fontWeight: '700', color: '#00A884' }}>
            ✏️ Editing Message
          </Text>
          <Text style={{ fontSize: 12, color: theme.colors.textPrimary }} numberOfLines={1}>
            {editingMessage.text}
          </Text>
        </View>
        <TouchableOpacity onPress={onCancelEdit}>
          <Text style={{ fontSize: 16, color: theme.colors.textMuted, paddingHorizontal: 6 }}>
            ✕
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.contextBannerRow, bannerStyle]}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 11, fontWeight: '700', color: '#00A884' }}>
          💬 Replying to {replyingMessage!.sender === 'user' ? 'You' : 'Lumi'}
        </Text>
        <Text style={{ fontSize: 12, color: theme.colors.textPrimary }} numberOfLines={1}>
          {replyingMessage!.text}
        </Text>
      </View>
      <TouchableOpacity onPress={onCancelReply}>
        <Text style={{ fontSize: 16, color: theme.colors.textMuted, paddingHorizontal: 6 }}>
          ✕
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contextBannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopWidth: 1,
    gap: 8,
  },
});

export default MessageContextBanner;
