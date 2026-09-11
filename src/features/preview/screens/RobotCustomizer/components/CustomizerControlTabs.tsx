import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from '../../../../../shared/components';
import {
  EXPRESSIONS_LIST,
  GLOW_COLORS_LIST,
  SIZES_LIST,
} from '../constants';
import { useTheme } from '../../../../../hooks';
import { RobotExpression } from '../../../../../shared/components';

export interface CustomizerControlTabsProps {
  renderMode: '3d' | 'avatar' | 'lottie';
  expression: RobotExpression;
  avatarSize: number;
  selectedGlow: string;
  onSetRenderMode: (mode: '3d' | 'avatar' | 'lottie') => void;
  onSetExpression: (exp: RobotExpression) => void;
  onSetAvatarSize: (size: number) => void;
  onSetSelectedGlow: (color: string) => void;
  onSaveDone: () => void;
}

export const CustomizerControlTabs: React.FC<CustomizerControlTabsProps> = ({
  renderMode,
  expression,
  avatarSize,
  selectedGlow,
  onSetRenderMode,
  onSetExpression,
  onSetAvatarSize,
  onSetSelectedGlow,
  onSaveDone,
}) => {
  const theme = useTheme();

  return (
    <>
      {/* Render Mode Selector Tabs */}
      <View style={styles.controlGroup}>
        <Text style={[styles.groupTitle, { color: theme.colors.textSecondary }]}>
          RENDER MODE
        </Text>
        <View style={styles.tabRow}>
          {(['3d', 'avatar', 'lottie'] as const).map((mode) => (
            <TouchableOpacity
              key={mode}
              style={[
                styles.tabButton,
                renderMode === mode && { backgroundColor: theme.colors.primary },
                { borderRadius: theme.radius.card },
              ]}
              onPress={() => onSetRenderMode(mode)}>
              <Text
                style={[
                  styles.tabText,
                  { color: renderMode === mode ? '#FFFFFF' : theme.colors.textPrimary },
                ]}>
                {mode === '3d' ? '3D Mascot' : mode === 'avatar' ? 'SVG Vector' : 'Lottie'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Expressions (avatar mode only) */}
      {renderMode === 'avatar' && (
        <View style={styles.controlGroup}>
          <Text style={[styles.groupTitle, { color: theme.colors.textSecondary }]}>
            EXPRESSIONS & MOOD
          </Text>
          <View style={styles.expressionRow}>
            {EXPRESSIONS_LIST.map((exp) => (
              <TouchableOpacity
                key={exp.id}
                style={[
                  styles.chip,
                  {
                    backgroundColor:
                      expression === exp.id
                        ? theme.colors.primaryGlow
                        : theme.isDarkMode
                        ? '#262A34'
                        : '#F5F6F8',
                    borderColor:
                      expression === exp.id ? theme.colors.primary : 'transparent',
                  },
                ]}
                onPress={() => onSetExpression(exp.id)}>
                <Text style={styles.chipEmoji}>{exp.icon}</Text>
                <Text
                  style={[
                    styles.chipLabel,
                    {
                      color:
                        expression === exp.id
                          ? theme.colors.primary
                          : theme.colors.textPrimary,
                    },
                  ]}>
                  {exp.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Aura Glow Color */}
      <View style={styles.controlGroup}>
        <Text style={[styles.groupTitle, { color: theme.colors.textSecondary }]}>
          AURA GLOW COLOR
        </Text>
        <View style={styles.colorRow}>
          {GLOW_COLORS_LIST.map((g) => (
            <TouchableOpacity
              key={g.id}
              style={[
                styles.colorDot,
                { backgroundColor: g.color },
                selectedGlow === g.color && styles.colorDotSelected,
              ]}
              onPress={() => onSetSelectedGlow(g.color)}
            />
          ))}
        </View>
      </View>

      {/* Avatar Size */}
      <View style={styles.controlGroup}>
        <Text style={[styles.groupTitle, { color: theme.colors.textSecondary }]}>
          AVATAR DISPLAY SIZE ({avatarSize}px)
        </Text>
        <View style={styles.sizeRow}>
          {SIZES_LIST.map((sz) => (
            <TouchableOpacity
              key={sz}
              style={[
                styles.sizeChip,
                {
                  backgroundColor:
                    avatarSize === sz
                      ? theme.colors.primary
                      : theme.isDarkMode
                      ? '#262A34'
                      : '#F5F6F8',
                },
              ]}
              onPress={() => onSetAvatarSize(sz)}>
              <Text
                style={[
                  styles.sizeText,
                  { color: avatarSize === sz ? '#FFFFFF' : theme.colors.textPrimary },
                ]}>
                {sz}px
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Discussion panel */}
      <View
        style={[
          styles.discussionBox,
          { backgroundColor: theme.isDarkMode ? '#1F222A' : '#F0F4FA' },
        ]}>
        <Text style={[styles.discussionTitle, { color: theme.colors.textPrimary }]}>
          💬 Lumi Look & Feel Discussion
        </Text>
        <Text style={[styles.discussionBody, { color: theme.colors.textSecondary }]}>
          Test different expressions, colors, and render modes above. When you are happy with
          the look, click{' '}
          <Text style={{ fontWeight: '700', color: theme.colors.primary }}>Save & Done</Text>{' '}
          below to apply your preferences!
        </Text>
      </View>

      {/* Save Button */}
      <View style={styles.saveContainer}>
        <Button title="Save & Done" onPress={onSaveDone} style={styles.saveButton} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  controlGroup: {
    marginBottom: 20,
  },
  groupTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  tabRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
  },
  expressionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  chipEmoji: {
    fontSize: 16,
  },
  chipLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  colorRow: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  colorDot: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  colorDotSelected: {
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  sizeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  sizeChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  sizeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  discussionBox: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  discussionTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  discussionBody: {
    fontSize: 13,
    lineHeight: 19,
  },
  saveContainer: {
    marginBottom: 24,
  },
  saveButton: {
    width: '100%',
  },
});

export default CustomizerControlTabs;
