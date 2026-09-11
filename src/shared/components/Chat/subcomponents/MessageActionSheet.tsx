import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DeleteIcon, ExportIcon, MessageIcon, PenIcon } from '../../../../../assets';
import { useTheme } from '../../../../hooks';
import { ChatMessage } from '../../../../types';

export interface MessageActionSheetProps {
  visible: boolean;
  message: any;
  onClose: () => void;
  onEditMessage?: () => void;
  onReplyMessage?: () => void;
  onRetryResponse?: () => void;
  onDeleteMessage?: () => void;
}

export const MessageActionSheet: React.FC<MessageActionSheetProps> = ({
  visible,
  message,
  onClose,
  onEditMessage,
  onReplyMessage,
  onRetryResponse,
  onDeleteMessage,
}) => {
  const theme = useTheme();

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.modalOverlayBg}
        activeOpacity={1}
        onPress={onClose}>
        <View
          style={[
            styles.actionSheetContainer,
            {
              backgroundColor: theme.isDarkMode ? '#1F222A' : '#FFFFFF',
              borderColor: theme.isDarkMode ? '#35383F' : '#E2E8F0',
            },
          ]}>
          <View style={styles.actionSheetHeader}>
            <View style={[styles.actionSheetTag, { backgroundColor: '#00A884' }]} />
            <Text
              style={[styles.actionSheetTitle, { color: theme.colors.textPrimary }]}
              numberOfLines={2}>
              "{message?.text || 'Selected Message'}"
            </Text>
          </View>

          <View style={styles.actionOptionsList}>
            {message?.sender === 'user' && onEditMessage ? (
              <TouchableOpacity
                style={[styles.actionOptionBtn, { backgroundColor: theme.isDarkMode ? '#262A34' : '#F8FAFC' }]}
                onPress={onEditMessage}
                activeOpacity={0.75}>
                <PenIcon size={18} color={theme.colors.primary} />
                <Text style={[styles.actionOptionText, { color: theme.colors.textPrimary }]}>
                  Edit Message
                </Text>
              </TouchableOpacity>
            ) : null}

            {onReplyMessage && (
              <TouchableOpacity
                style={[styles.actionOptionBtn, { backgroundColor: theme.isDarkMode ? '#262A34' : '#F8FAFC' }]}
                onPress={onReplyMessage}
                activeOpacity={0.75}>
                <MessageIcon size={18} color="#00A884" />
                <Text style={[styles.actionOptionText, { color: theme.colors.textPrimary }]}>
                  Reply to Message
                </Text>
              </TouchableOpacity>
            )}

            {onRetryResponse && (
              <TouchableOpacity
                style={[styles.actionOptionBtn, { backgroundColor: theme.isDarkMode ? '#262A34' : '#F8FAFC' }]}
                onPress={onRetryResponse}
                activeOpacity={0.75}>
                <ExportIcon size={18} color="#3B82F6" />
                <Text style={[styles.actionOptionText, { color: theme.colors.textPrimary }]}>
                  Retry Response
                </Text>
              </TouchableOpacity>
            )}

            {onDeleteMessage && (
              <TouchableOpacity
                style={[styles.actionOptionBtn, { backgroundColor: theme.isDarkMode ? 'rgba(239, 68, 68, 0.12)' : '#FEF2F2' }]}
                onPress={onDeleteMessage}
                activeOpacity={0.75}>
                <DeleteIcon size={18} color="#EF4444" />
                <Text style={[styles.actionOptionText, { color: '#EF4444', fontWeight: '700' }]}>
                  Delete Message
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={[styles.actionCancelBtn, { borderColor: theme.isDarkMode ? '#35383F' : '#E2E8F0' }]}
            onPress={onClose}
            activeOpacity={0.8}>
            <Text style={[styles.actionCancelText, { color: theme.colors.textMuted }]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlayBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  actionSheetContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
  },
  actionSheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  actionSheetTag: {
    width: 4,
    height: 24,
    borderRadius: 2,
  },
  actionSheetTitle: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  actionOptionsList: {
    gap: 10,
    marginBottom: 16,
  },
  actionOptionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    gap: 12,
  },
  actionOptionText: {
    fontSize: 15,
    fontWeight: '600',
  },
  actionCancelBtn: {
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  actionCancelText: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default MessageActionSheet;
