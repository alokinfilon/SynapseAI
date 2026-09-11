import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FileIcon } from '../../../../../assets/svg';
import { useTheme } from '../../../../hooks';

export interface DocumentPickerModalProps {
  visible: boolean;
  onOpenNativePicker: () => void;
  onClose: () => void;
}

export const DocumentPickerModal: React.FC<DocumentPickerModalProps> = ({
  visible,
  onOpenNativePicker,
  onClose,
}) => {
  const theme = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.voiceModalOverlay}>
        <View
          style={[
            styles.documentModalContainer,
            {
              backgroundColor: theme.isDarkMode ? '#1F222A' : '#FFFFFF',
              borderColor: theme.isDarkMode ? '#35383F' : '#E2E8F0',
            },
          ]}>
          <View style={styles.cameraHeaderRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <View style={[styles.docHeaderBadge, { backgroundColor: 'rgba(0, 168, 132, 0.12)' }]}>
                <FileIcon size={20} color="#00A884" />
              </View>
              <Text style={[styles.cameraModalTitle, { color: theme.colors.textPrimary }]}>
                Upload Document
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} activeOpacity={0.8}>
              <Text style={{ fontSize: 18, color: theme.colors.textMuted }}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.documentHeroCard}>
            <View style={styles.documentHeroIconWrapper}>
              <FileIcon size={38} color="#00A884" />
            </View>
            <Text style={[styles.documentHeroTitle, { color: theme.colors.textPrimary }]}>
              Choose File from Device
            </Text>
            <Text style={[styles.documentHeroSubtitle, { color: theme.colors.textMuted }]}>
              Pick PDF, DOCX, XLSX, TXT, CSV or ZIP files directly from your phone's storage.
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.voiceActionRow}>
            <TouchableOpacity
              style={[styles.voiceCancelBtn, { borderColor: theme.isDarkMode ? '#35383F' : '#E2E8F0' }]}
              onPress={onClose}
              activeOpacity={0.8}>
              <Text style={[styles.voiceCancelText, { color: theme.colors.textMuted }]}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.voiceSendBtn, { backgroundColor: '#00A884' }]}
              onPress={onOpenNativePicker}
              activeOpacity={0.8}>
              <Text style={styles.voiceSendText}>Browse Files</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  voiceModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  documentModalContainer: {
    width: '100%',
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  cameraHeaderRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  docHeaderBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraModalTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  documentHeroCard: {
    width: '100%',
    borderRadius: 18,
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  documentHeroIconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#00A884',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  documentHeroTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
  },
  documentHeroSubtitle: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 17,
  },
  voiceActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },
  voiceCancelBtn: {
    flex: 1,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceCancelText: {
    fontSize: 14,
    fontWeight: '600',
  },
  voiceSendBtn: {
    flex: 1.5,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceSendText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default DocumentPickerModal;
