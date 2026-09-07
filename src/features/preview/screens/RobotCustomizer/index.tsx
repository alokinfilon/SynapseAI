import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LeftArrowIcon } from '../../../../../assets/svg';
import { Button, RobotAvatar, RobotIllustration } from '../../../../shared/components';
import { EXPRESSIONS_LIST, GLOW_COLORS_LIST, SIZES_LIST } from './constants';
import { styles } from './styles';
import { RobotCustomizerScreenProps, useRobotCustomizer } from './useRobotCustomizer';

export type { RobotCustomizerScreenProps };

export const RobotCustomizerScreen: React.FC<RobotCustomizerScreenProps> = (props) => {
  const {
    theme,
    renderMode,
    setRenderMode,
    expression,
    setExpression,
    avatarSize,
    setAvatarSize,
    selectedGlow,
    setSelectedGlow,
    handleSaveDone,
    onBack,
  } = useRobotCustomizer(props);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.canvas }]}>
      <StatusBar barStyle={theme.isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Top Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
          <LeftArrowIcon size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text
          style={[
            styles.headerTitle,
            theme.typography.headingSm,
            { color: theme.colors.textPrimary },
          ]}>
          Bobo AI Studio & Playground
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Main Live Preview Canvas */}
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
              {renderMode === 'avatar' ? `SVG Vector • ${expression.toUpperCase()}` : 'Lottie Animation'}
            </Text>
          </View>

          <View style={styles.robotCanvas}>
            {renderMode === 'avatar' ? (
              <RobotAvatar
                size={avatarSize}
                expression={expression}
                glowColor={selectedGlow}
              />
            ) : (
              <RobotIllustration
                size={Math.min(avatarSize * 1.4, 260)}
                bubbleColor={selectedGlow}
              />
            )}
          </View>
        </View>

        {/* Mode Selector Tabs */}
        <View style={styles.controlGroup}>
          <Text style={[styles.groupTitle, { color: theme.colors.textSecondary }]}>
            RENDER MODE
          </Text>
          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                renderMode === 'avatar' && { backgroundColor: theme.colors.primary },
                { borderRadius: theme.radius.card },
              ]}
              onPress={() => setRenderMode('avatar')}>
              <Text
                style={[
                  styles.tabText,
                  { color: renderMode === 'avatar' ? '#FFFFFF' : theme.colors.textPrimary },
                ]}>
                SVG Vector Face
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabButton,
                renderMode === 'lottie' && { backgroundColor: theme.colors.primary },
                { borderRadius: theme.radius.card },
              ]}
              onPress={() => setRenderMode('lottie')}>
              <Text
                style={[
                  styles.tabText,
                  { color: renderMode === 'lottie' ? '#FFFFFF' : theme.colors.textPrimary },
                ]}>
                Lottie Animated
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Expressions Selection */}
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
                      backgroundColor: expression === exp.id ? theme.colors.primaryGlow : (theme.isDarkMode ? '#262A34' : '#F5F6F8'),
                      borderColor: expression === exp.id ? theme.colors.primary : 'transparent',
                    },
                  ]}
                  onPress={() => setExpression(exp.id)}>
                  <Text style={styles.chipEmoji}>{exp.icon}</Text>
                  <Text
                    style={[
                      styles.chipLabel,
                      { color: expression === exp.id ? theme.colors.primary : theme.colors.textPrimary },
                    ]}>
                    {exp.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Glow Color Accents */}
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
                onPress={() => setSelectedGlow(g.color)}
              />
            ))}
          </View>
        </View>

        {/* Scale Size Selector */}
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
                    backgroundColor: avatarSize === sz ? theme.colors.primary : (theme.isDarkMode ? '#262A34' : '#F5F6F8'),
                  },
                ]}
                onPress={() => setAvatarSize(sz)}>
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

        {/* Discussion / Instructions Panel */}
        <View style={[styles.discussionBox, { backgroundColor: theme.isDarkMode ? '#1F222A' : '#F0F4FA' }]}>
          <Text style={[styles.discussionTitle, { color: theme.colors.textPrimary }]}>
            💬 Bobo Look & Feel Discussion
          </Text>
          <Text style={[styles.discussionBody, { color: theme.colors.textSecondary }]}>
            Test different expressions, colors, and render modes above. When you are happy with the look, click <Text style={{ fontWeight: '700', color: theme.colors.primary }}>Save & Done</Text> below to apply your preferences!
          </Text>
        </View>

        {/* Save / Done Action Button */}
        <View style={styles.saveContainer}>
          <Button
            title="Save & Done"
            onPress={handleSaveDone}
            style={styles.saveButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RobotCustomizerScreen;
