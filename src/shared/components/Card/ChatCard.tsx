import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { DeleteIcon, MessageIcon } from '../../../../assets/svg';
import { useTheme } from '../../../hooks';
import { RobotAvatar, RobotExpression } from '../Icon';

export interface ChatCardProps {
  title: string;
  subtitle: string;
  expression?: RobotExpression;
  isActive?: boolean;
  isSwiped?: boolean;
  time?: string;
  unreadCount?: number;
  onPress?: () => void;
  onDeletePress?: () => void;
  style?: ViewStyle;
}

export const ChatCard: React.FC<ChatCardProps> = ({
  title,
  subtitle,
  expression = 'smile',
  isActive = false,
  isSwiped = false,
  time,
  onPress,
  onDeletePress,
  style,
}) => {
  const theme = useTheme();

  // Helper for expression background tint
  const getExpressionBg = () => {
    switch (expression) {
      case 'heart':
        return theme.isDarkMode ? 'rgba(255, 105, 180, 0.15)' : 'rgba(255, 105, 180, 0.1)';
      case 'sad':
        return theme.isDarkMode ? 'rgba(99, 102, 241, 0.18)' : 'rgba(99, 102, 241, 0.1)';
      case 'star':
        return theme.isDarkMode ? 'rgba(245, 158, 11, 0.18)' : 'rgba(245, 158, 11, 0.1)';
      case 'smile':
      default:
        return theme.isDarkMode ? 'rgba(0, 210, 180, 0.15)' : 'rgba(0, 210, 180, 0.1)';
    }
  };

  return (
    <View style={styles.outerWrapper}>
      <TouchableOpacity
        style={[
          styles.card,
          {
            backgroundColor: isActive
              ? (theme.isDarkMode ? '#1E293B' : '#F0FDFA')
              : (theme.isDarkMode ? '#1F222A' : '#FFFFFF'),
            borderColor: isActive
              ? theme.colors.primary
              : (theme.isDarkMode ? '#35383F' : '#E8ECF4'),
            borderRadius: theme.radius.card,
          },
          theme.shadows.sm,
          style,
        ]}
        onPress={onPress}
        activeOpacity={0.85}>
        {/* Avatar Badge */}
        <View style={styles.avatarContainer}>
          <RobotAvatar
            size={42}
            expression={expression}
            showParticles={false}
            glowColor={isActive ? theme.colors.primary : undefined}
          />
          {isActive ? (
            <View style={[styles.onlineDot, { backgroundColor: theme.colors.statusOnline, borderColor: theme.isDarkMode ? '#1F222A' : '#FFFFFF' }]} />
          ) : null}
        </View>

        {/* Content Info */}
        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <Text
              numberOfLines={1}
              style={[
                styles.title,
                theme.typography.headingSm,
                { color: theme.colors.textPrimary, fontSize: 14 },
              ]}>
              {title}
            </Text>
            {time ? (
              <Text
                style={[
                  styles.timeText,
                  theme.typography.bodySm,
                  { color: theme.colors.textMuted, fontSize: 11 },
                ]}>
                {time}
              </Text>
            ) : null}
          </View>

          <Text
            numberOfLines={2}
            style={[
              styles.subtitle,
              theme.typography.bodySm,
              { color: theme.colors.textSecondary, fontSize: 12, lineHeight: 16 },
            ]}>
            {subtitle}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Swipe Left Red Delete Action */}
      {isSwiped ? (
        <TouchableOpacity
          style={[
            styles.deleteButton,
            { borderTopRightRadius: theme.radius.card, borderBottomRightRadius: theme.radius.card },
          ]}
          onPress={onDeletePress}
          activeOpacity={0.8}>
          <DeleteIcon size={20} color="#FFFFFF" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  outerWrapper: {
    width: '100%',
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 10,
  },
  avatarBgRing: {
    borderRadius: 24,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  title: {
    fontWeight: '700',
    flex: 1,
    marginRight: 6,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '500',
  },
  subtitle: {
    lineHeight: 16,
  },
  activeStatus: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  deleteButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 60,
    backgroundColor: '#FF4D4D',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatCard;
