import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../hooks';
import { Button } from '../Button';
import { RobotAvatar } from '../Icon';
import { Modal } from './Modal';

export interface ComingSoonModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

export const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
  visible,
  onClose,
  title = 'Coming Soon!',
  subtitle = 'This feature will be available in an upcoming release. Stay tuned!',
}) => {
  const theme = useTheme();

  return (
    <Modal visible={visible} onClose={onClose}>
      <View style={styles.content}>
        <RobotAvatar size={100} expression="star" showParticles={false} />
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
          {title}
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          {subtitle}
        </Text>
        <Button title="Got it!" onPress={onClose} style={styles.button} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  button: {
    width: '100%',
  },
});

export default ComingSoonModal;
