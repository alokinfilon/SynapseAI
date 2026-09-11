import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CrossIcon, FileIcon, PlusIcon, VideoIcon } from '../../../../../assets/svg';
import { useTheme } from '../../../../hooks';

export interface PendingAttachmentItem {
  id: string;
  type: 'image' | 'document' | 'video';
  uri?: string;
  name: string;
}

export interface AttachmentPreviewTrayProps {
  pendingAttachments: PendingAttachmentItem[];
  onRemoveAttachment: (id: string) => void;
  onClearAll: () => void;
  onAddMore: () => void;
}

export const AttachmentPreviewTray: React.FC<AttachmentPreviewTrayProps> = ({
  pendingAttachments,
  onRemoveAttachment,
  onClearAll,
  onAddMore,
}) => {
  const theme = useTheme();

  if (pendingAttachments.length === 0) return null;

  return (
    <View
      style={[
        styles.pendingAttachmentsBanner,
        {
          backgroundColor: theme.isDarkMode ? '#1E293B' : '#F0FDFA',
          borderColor: theme.isDarkMode ? '#334155' : '#00A884',
        },
      ]}>
      <View style={styles.pendingHeaderRow}>
        <Text style={[styles.pendingHeaderTitle, { color: theme.colors.textPrimary }]}>
          📷 {pendingAttachments.length}{' '}
          {pendingAttachments.length === 1 ? 'Attachment' : 'Attachments'} Selected
        </Text>
        <TouchableOpacity onPress={onClearAll} style={styles.clearAllBtn}>
          <Text style={{ fontSize: 12, fontWeight: '700', color: theme.colors.textMuted }}>
            Clear All
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pendingThumbsRow}>
        {pendingAttachments.map((item) => (
          <View key={item.id} style={styles.thumbItemWrapper}>
            {item.type === 'image' && item.uri ? (
              <Image source={{ uri: item.uri }} style={styles.multiThumbImg} />
            ) : item.type === 'video' ? (
              <View style={[styles.thumbIconBox, { backgroundColor: 'rgba(0, 168, 132, 0.12)' }]}>
                <VideoIcon size={20} color="#00A884" />
              </View>
            ) : (
              <View style={[styles.thumbIconBox, { backgroundColor: 'rgba(0, 168, 132, 0.12)' }]}>
                <FileIcon size={20} color="#00A884" />
              </View>
            )}

            <TouchableOpacity
              style={styles.thumbDeleteBadge}
              onPress={() => onRemoveAttachment(item.id)}
              hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
              <CrossIcon size={10} color="#00A884" />
            </TouchableOpacity>
          </View>
        ))}

        {/* + Add More Attachments Chip */}
        <TouchableOpacity
          style={[styles.addMoreCard, { borderColor: theme.colors.primary }]}
          onPress={onAddMore}>
          <PlusIcon size={18} color={theme.colors.primary} />
          <Text style={[styles.addMoreLabel, { color: theme.colors.primary }]}>+ Add</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pendingAttachmentsBanner: {
    marginHorizontal: 12,
    marginBottom: 8,
    borderRadius: 16,
    borderWidth: 1,
    padding: 10,
  },
  pendingHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 2,
  },
  pendingHeaderTitle: {
    fontSize: 12,
    fontWeight: '700',
  },
  clearAllBtn: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  pendingThumbsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 2,
  },
  thumbItemWrapper: {
    position: 'relative',
    width: 52,
    height: 52,
    borderRadius: 12,
    overflow: 'visible',
  },
  multiThumbImg: {
    width: 52,
    height: 52,
    borderRadius: 12,
  },
  thumbIconBox: {
    width: 52,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbDeleteBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#00A884',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  addMoreCard: {
    width: 52,
    height: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  addMoreLabel: {
    fontSize: 9,
    fontWeight: '700',
  },
});

export default AttachmentPreviewTray;
