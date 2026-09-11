import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RobotAvatar, RobotIllustration } from '../../../../../shared/components';
import { useTheme } from '../../../../../hooks';

export interface RobotCanvasPreviewProps {
  renderMode: '3d' | 'avatar' | 'lottie';
  expression: string;
  avatarSize: number;
  selectedGlow: string;
}

export const RobotCanvasPreview: React.FC<RobotCanvasPreviewProps> = ({
  renderMode,
  expression,
  avatarSize,
  selectedGlow,
}) => {
  const theme = useTheme();

  const modeLabel =
    renderMode === '3d'
      ? '3D Futuristic Mascot Model'
      : renderMode === 'avatar'
      ? `SVG Vector • ${expression.toUpperCase()}`
      : 'Lottie Animation';

  return (
    <View
      style={[
        styles.previewStage,
        {
          backgroundColor: theme.isDarkMode ? '#1F222A' : '#FFFFFF',
          borderColor: theme.isDarkMode ? '#35383F' : '#E8ECF4',
          borderRadius: theme.radius.card,
        },
        theme.shadows.md,
      ]}>
      <View style={styles.stageHeader}>
        <Text style={[styles.stageBadge, { color: theme.colors.primary }]}>
          LIVE PREVIEW
        </Text>
        <Text style={[styles.stageSub, { color: theme.colors.textSecondary }]}>
          {modeLabel}
        </Text>
      </View>

      <View style={styles.robotCanvas}>
        {renderMode === 'avatar' ? (
          <RobotAvatar
            size={avatarSize}
            expression={expression as any}
            glowColor={selectedGlow}
          />
        ) : (
          <RobotIllustration
            size={Math.min(avatarSize * 1.5, 280)}
            bubbleColor={selectedGlow}
            mode={renderMode === '3d' ? '3d' : 'lottie'}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  previewStage: {
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: 28,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  stageHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  stageBadge: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  stageSub: {
    fontSize: 12,
    fontWeight: '500',
  },
  robotCanvas: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RobotCanvasPreview;
