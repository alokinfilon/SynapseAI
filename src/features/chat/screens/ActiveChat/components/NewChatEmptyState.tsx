import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ComputerIcon,
  CpuIcon,
  LightIcon,
  PenIcon,
} from '../../../../../../assets/svg';
import { RobotIllustration } from '../../../../../shared/components';
import { ACTIVE_CHAT_TEXTS, NEW_CHAT_TOPICS } from '../constants';
import { useTheme } from '../../../../../hooks';

export interface NewChatEmptyStateProps {
  onTopicPress: (prompt: string) => void;
}

// Internal three-dots loader (used inside typing bubble too)
export const ThreeDotsLoader: React.FC<{ color?: string }> = ({ color = '#00D2B4' }) => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createDotAnimation = (anim: Animated.Value, delay: number) => {
      return Animated.sequence([
        Animated.delay(delay),
        Animated.loop(
          Animated.sequence([
            Animated.timing(anim, { toValue: -5, duration: 250, useNativeDriver: true }),
            Animated.timing(anim, { toValue: 0, duration: 250, useNativeDriver: true }),
            Animated.delay(350),
          ])
        ),
      ]);
    };

    const anim1 = createDotAnimation(dot1, 0);
    const anim2 = createDotAnimation(dot2, 120);
    const anim3 = createDotAnimation(dot3, 240);

    anim1.start();
    anim2.start();
    anim3.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, [dot1, dot2, dot3]);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 12, paddingVertical: 10 }}>
      <Animated.View style={{ width: 7, height: 7, borderRadius: 3.5, backgroundColor: color, transform: [{ translateY: dot1 }] }} />
      <Animated.View style={{ width: 7, height: 7, borderRadius: 3.5, backgroundColor: color, transform: [{ translateY: dot2 }] }} />
      <Animated.View style={{ width: 7, height: 7, borderRadius: 3.5, backgroundColor: color, transform: [{ translateY: dot3 }] }} />
    </View>
  );
};

const renderTopicIcon = (iconType: string, primaryColor: string) => {
  switch (iconType) {
    case 'light':   return <LightIcon size={22} color={primaryColor} />;
    case 'cpu':     return <CpuIcon size={22} color={primaryColor} />;
    case 'computer':return <ComputerIcon size={22} color={primaryColor} />;
    case 'pen':     return <PenIcon size={22} color={primaryColor} />;
    default:        return <LightIcon size={22} color={primaryColor} />;
  }
};

export const NewChatEmptyState: React.FC<NewChatEmptyStateProps> = ({ onTopicPress }) => {
  const theme = useTheme();

  return (
    <View style={styles.emptyStateContainer}>
      <View style={styles.heroRobotWrapper}>
        <RobotIllustration size={210} mode="waving" animated={false} />
      </View>

      <Text style={[styles.emptyTitle, { color: theme.colors.textPrimary }]}>
        {ACTIVE_CHAT_TEXTS.newChatTitle}
      </Text>
      <Text style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}>
        {ACTIVE_CHAT_TEXTS.newChatSubtitle}
      </Text>

      {/* 2×2 Topic Grid */}
      <View style={styles.topicsGrid}>
        {NEW_CHAT_TOPICS.map((topic) => (
          <TouchableOpacity
            key={topic.id}
            style={[
              styles.topicCard,
              {
                backgroundColor: theme.isDarkMode ? '#1F222A' : '#FFFFFF',
                borderColor: theme.isDarkMode ? '#35383F' : '#E8ECF4',
              },
            ]}
            onPress={() => onTopicPress(topic.prompt)}
            activeOpacity={0.8}>
            <View style={styles.topicIconContainer}>
              {renderTopicIcon(topic.iconType, theme.colors.primary)}
            </View>
            <View style={styles.topicTextWrapper}>
              <Text numberOfLines={1} style={[styles.topicTitle, { color: theme.colors.textPrimary }]}>
                {topic.title}
              </Text>
              <Text numberOfLines={2} style={[styles.topicSubtitle, { color: theme.colors.textMuted }]}>
                {topic.subtitle}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  heroRobotWrapper: {
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    width: '100%',
  },
  topicCard: {
    width: '47%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  topicIconContainer: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicTextWrapper: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 3,
  },
  topicSubtitle: {
    fontSize: 11,
    lineHeight: 15,
  },
});

export default NewChatEmptyState;
