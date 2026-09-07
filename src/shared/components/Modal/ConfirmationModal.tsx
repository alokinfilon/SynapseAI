import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../hooks';
import { Button } from '../Button';
import { RobotIllustration } from '../Icon';
import { Modal } from './Modal';

export interface ConfirmationModalProps {
  visible: boolean;
  title: string;
  subtitle: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  title,
  subtitle,
  confirmText = 'Yes, End Session',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  const theme = useTheme();

  return (
    <Modal visible={visible} onClose={onCancel}>
      <View style={styles.content}>
        {/* Robot Illustration */}
        <RobotIllustration size={160} style={styles.illustration} />

        {/* Title */}
        <Text
          style={[
            styles.title,
            theme.typography.displayLg,
            { color: theme.colors.primary },
          ]}>
          {title}
        </Text>

        {/* Subtitle */}
        <Text
          style={[
            styles.subtitle,
            theme.typography.bodyMd,
            { color: theme.colors.textSecondary },
          ]}>
          {subtitle}
        </Text>

        {/* Buttons */}
        <View style={styles.buttonStack}>
          <Button
            title={confirmText}
            onPress={onConfirm}
            style={styles.confirmButton}
          />
          <Button
            title={cancelText}
            variant="secondary"
            onPress={onCancel}
            style={styles.cancelButton}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  illustration: {
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginVertical: 10,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  buttonStack: {
    width: '100%',
    gap: 10,
  },
  confirmButton: {
    width: '100%',
  },
  cancelButton: {
    width: '100%',
  },
});

export default ConfirmationModal;
