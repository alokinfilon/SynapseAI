import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../hooks';
import { RobotAvatar } from '../Icon';
import { Modal } from './Modal';

export interface AuthSuccessModalProps {
  visible: boolean;
  title?: string;
  subtitle?: string;
  autoRedirectMs?: number;
  onConfirm?: () => void;
  onClose?: () => void;
}

export const AuthSuccessModal: React.FC<AuthSuccessModalProps> = ({
  visible,
  title = 'Congratulations!',
  subtitle = 'Your account is ready to use. You will be redirected to the Home page in a few seconds.',
  autoRedirectMs = 2000,
  onConfirm,
  onClose,
}) => {
  const theme = useTheme();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (visible && onConfirm) {
      timer = setTimeout(() => {
        onConfirm();
      }, autoRedirectMs);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [visible, onConfirm, autoRedirectMs]);

  return (
    <Modal visible={visible} onClose={onClose}>
      <View style={styles.content}>
        {/* Robot Head Avatar */}
        <View style={styles.avatarWrapper}>
          <RobotAvatar size={145} expression="normal" showParticles={false} />
        </View>

        {/* Title */}
        <Text
          style={[
            styles.title,
            { color: theme.colors.textPrimary },
          ]}>
          {title}
        </Text>

        {/* Subtitle */}
        <Text
          style={[
            styles.subtitle,
            { color: theme.colors.textSecondary },
          ]}>
          {subtitle}
        </Text>

        {/* Loading Spinner */}
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary || '#00D2B4'} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  avatarWrapper: {
    marginTop: 8,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 10,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  loaderContainer: {
    marginTop: 8,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AuthSuccessModal;
