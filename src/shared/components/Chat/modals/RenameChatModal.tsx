import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../../hooks';
import { Button } from '../../Button';
import { RobotAvatar, RobotExpression } from '../../Icon';
import { Input } from '../../Input';
import { Modal } from '../../Modal';

export interface RenameChatModalProps {
  visible: boolean;
  titleText: string;
  expression?: RobotExpression;
  onChangeTitleText: (text: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const RenameChatModal: React.FC<RenameChatModalProps> = ({
  visible,
  titleText,
  expression = 'smile',
  onChangeTitleText,
  onSave,
  onCancel,
}) => {
  const theme = useTheme();

  return (
    <Modal visible={visible} onClose={onCancel}>
      <View style={styles.modalContent}>
        <RobotAvatar size={64} expression={expression} showParticles={false} />
        <Text style={[styles.modalTitle, { color: theme.colors.textPrimary }]}>
          Rename Conversation
        </Text>
        <Text style={[styles.modalSubtitle, { color: theme.colors.textSecondary }]}>
          Update the title for this chat with Bobo
        </Text>
        <Input
          value={titleText}
          onChangeText={onChangeTitleText}
          placeholder="Enter new chat title..."
          containerStyle={styles.editInput}
        />
        <View style={styles.modalButtonsRow}>
          <Button
            title="Cancel"
            variant="secondary"
            onPress={onCancel}
            style={styles.flexBtn}
          />
          <Button
            title="Save"
            onPress={onSave}
            style={styles.flexBtn}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 6,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    marginBottom: 18,
    textAlign: 'center',
  },
  editInput: {
    width: '100%',
    marginBottom: 20,
  },
  modalButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },
  flexBtn: {
    flex: 1,
  },
});

export default RenameChatModal;
