import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CameraIcon,
  FileIcon,
  GalleryIcon,
  VideoIcon,
} from '../../../../../assets/svg';
import { useTheme } from '../../../../hooks';

export interface AttachmentMenuPopoverProps {
  visible: boolean;
  onSelectOption: (type: 'document' | 'camera' | 'video' | 'gallery') => void;
  onClose: () => void;
}

export const AttachmentMenuPopover: React.FC<AttachmentMenuPopoverProps> = ({
  visible,
  onSelectOption,
  onClose,
}) => {
  const theme = useTheme();

  if (!visible) return null;

  const tealColor = '#00A884';

  return (
    <>
      {/* Backdrop overlay to close attachments menu when tapping anywhere outside */}
      <TouchableOpacity
        activeOpacity={1}
        style={styles.backdropOverlay}
        onPress={onClose}
      />

      {/* Attachments Popup Menu */}
      <View
        style={[
          styles.attachmentMenu,
          {
            backgroundColor: theme.isDarkMode ? '#1F222A' : '#FFFFFF',
            borderColor: theme.isDarkMode ? '#35383F' : '#E2E8F0',
          },
        ]}>
        <TouchableOpacity
          style={styles.attachmentOption}
          onPress={() => onSelectOption('document')}
          activeOpacity={0.75}>
          <View
            style={[
              styles.attachmentIconCircle,
              { backgroundColor: '#FFFFFF', borderColor: tealColor, borderWidth: 1.2 },
            ]}>
            <FileIcon size={18} color={tealColor} />
          </View>
          <Text style={[styles.attachmentOptionText, { color: theme.colors.textPrimary }]}>
            Document
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.attachmentOption}
          onPress={() => onSelectOption('camera')}
          activeOpacity={0.75}>
          <View
            style={[
              styles.attachmentIconCircle,
              { backgroundColor: '#FFFFFF', borderColor: tealColor, borderWidth: 1.2 },
            ]}>
            <CameraIcon size={16} color={tealColor} />
          </View>
          <Text style={[styles.attachmentOptionText, { color: theme.colors.textPrimary }]}>
            Camera
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.attachmentOption}
          onPress={() => onSelectOption('video')}
          activeOpacity={0.75}>
          <View
            style={[
              styles.attachmentIconCircle,
              { backgroundColor: '#FFFFFF', borderColor: tealColor, borderWidth: 1.2 },
            ]}>
            <VideoIcon size={16} color={tealColor} />
          </View>
          <Text style={[styles.attachmentOptionText, { color: theme.colors.textPrimary }]}>
            Video
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.attachmentOption}
          onPress={() => onSelectOption('gallery')}
          activeOpacity={0.75}>
          <View
            style={[
              styles.attachmentIconCircle,
              { backgroundColor: '#FFFFFF', borderColor: tealColor, borderWidth: 1.2 },
            ]}>
            <GalleryIcon size={16} color={tealColor} />
          </View>
          <Text style={[styles.attachmentOptionText, { color: theme.colors.textPrimary }]}>
            Gallery
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backdropOverlay: {
    position: 'absolute',
    top: -2000,
    bottom: -100,
    left: -500,
    right: -500,
    zIndex: 1,
    backgroundColor: 'transparent',
  },
  attachmentMenu: {
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginBottom: 6,
    borderRadius: 14,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  attachmentOption: {
    alignItems: 'center',
    gap: 4,
  },
  attachmentIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attachmentOptionText: {
    fontSize: 10,
    fontWeight: '600',
  },
});

export default AttachmentMenuPopover;
