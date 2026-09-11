import React from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../../../../hooks';

export interface CameraCaptureModalProps {
  visible: boolean;
  selectedPhoto: string;
  photoCaption: string;
  samplePhotos: string[];
  onSelectPhoto: (uri: string) => void;
  onCaptionChange: (caption: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({
  visible,
  selectedPhoto,
  photoCaption,
  samplePhotos,
  onSelectPhoto,
  onCaptionChange,
  onConfirm,
  onCancel,
}) => {
  const theme = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}>
      <View style={styles.voiceModalOverlay}>
        <View
          style={[
            styles.cameraModalContainer,
            {
              backgroundColor: theme.isDarkMode ? '#1F222A' : '#FFFFFF',
              borderColor: theme.isDarkMode ? '#35383F' : '#E2E8F0',
            },
          ]}>
          <View style={styles.cameraHeaderRow}>
            <Text style={[styles.cameraModalTitle, { color: theme.colors.textPrimary }]}>
              📷 Camera Photo Capture
            </Text>
            <TouchableOpacity onPress={onCancel}>
              <Text style={{ fontSize: 18, color: theme.colors.textMuted }}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Viewfinder Preview */}
          <View style={styles.viewfinderWrapper}>
            <Image source={{ uri: selectedPhoto }} style={styles.viewfinderImage} resizeMode="cover" />
            <View style={styles.viewfinderTag}>
              <Text style={styles.viewfinderTagText}>📸 Viewfinder Preview</Text>
            </View>
          </View>

          {/* Thumbnail Photo Selectors */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10, marginVertical: 12 }}>
            {samplePhotos.map((photoUri, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => onSelectPhoto(photoUri)}
                style={[
                  styles.thumbnailCard,
                  {
                    borderColor: selectedPhoto === photoUri ? '#00A884' : 'transparent',
                    borderWidth: selectedPhoto === photoUri ? 2.5 : 0,
                  },
                ]}>
                <Image source={{ uri: photoUri }} style={styles.thumbnailImg} resizeMode="cover" />
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Caption Input */}
          <TextInput
            style={[
              styles.captionInput,
              {
                backgroundColor: theme.isDarkMode ? '#262A34' : '#F8FAFC',
                borderColor: theme.isDarkMode ? '#35383F' : '#E2E8F0',
                color: theme.colors.textPrimary,
              },
            ]}
            placeholder="Add a photo caption (optional)..."
            placeholderTextColor={theme.colors.textMuted}
            value={photoCaption}
            onChangeText={onCaptionChange}
          />

          {/* Action Buttons */}
          <View style={styles.voiceActionRow}>
            <TouchableOpacity
              style={[styles.voiceCancelBtn, { borderColor: theme.isDarkMode ? '#35383F' : '#E2E8F0' }]}
              onPress={onCancel}
              activeOpacity={0.8}>
              <Text style={[styles.voiceCancelText, { color: theme.colors.textMuted }]}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.voiceSendBtn, { backgroundColor: '#00A884' }]}
              onPress={onConfirm}
              activeOpacity={0.8}>
              <Text style={styles.voiceSendText}>Attach Photo</Text>
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
  cameraModalContainer: {
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
  cameraModalTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  viewfinderWrapper: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  viewfinderImage: {
    width: '100%',
    height: '100%',
  },
  viewfinderTag: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  viewfinderTagText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  thumbnailCard: {
    width: 50,
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
  },
  thumbnailImg: {
    width: '100%',
    height: '100%',
  },
  captionInput: {
    width: '100%',
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontSize: 13,
    marginBottom: 16,
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

export default CameraCaptureModal;
