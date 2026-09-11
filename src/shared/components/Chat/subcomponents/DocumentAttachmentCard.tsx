import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FileIcon } from '../../../../../assets/svg';
import { useTheme } from '../../../../hooks';

export interface DocumentAttachmentCardProps {
  text: string;
  isUser: boolean;
}

export const DocumentAttachmentCard: React.FC<DocumentAttachmentCardProps> = ({
  text,
  isUser,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.documentCardRow}>
      <View
        style={[
          styles.documentIconWrapper,
          {
            backgroundColor: isUser
              ? 'rgba(255, 255, 255, 0.25)'
              : 'rgba(0, 168, 132, 0.12)',
          },
        ]}>
        <FileIcon size={20} color={isUser ? '#FFFFFF' : '#00A884'} />
      </View>
      <Text
        style={[
          styles.messageText,
          theme.typography.bodyMd,
          {
            color: isUser ? '#FFFFFF' : theme.colors.textPrimary,
          },
        ]}>
        {text.replace(/^📄\s*/, '')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  documentCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  documentIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageText: {
    fontSize: 15,
    lineHeight: 21,
    flex: 1,
  },
});

export default DocumentAttachmentCard;
