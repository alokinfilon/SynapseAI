import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, HeaderBar, RobotAvatar, RobotIllustration } from '../../../../shared/components';
import { WELCOME_HOME_TEXTS } from './constants';
import { styles } from './styles';
import { useWelcomeHome, UseWelcomeHomeProps } from './useWelcomeHome';

export interface WelcomeHomeScreenProps extends UseWelcomeHomeProps {}

export const WelcomeHomeScreen: React.FC<WelcomeHomeScreenProps> = (props) => {
  const {
    theme,
    userName,
    isOnline,
    onNewChat,
    onCustomizeRobot,
    onOpenMenu,
  } = useWelcomeHome(props);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.canvas }]}>
      <StatusBar barStyle="dark-content" />
      <HeaderBar
        leftComponent={
          <View style={styles.headerAvatarWrapper}>
            <RobotAvatar size={36} />
            {isOnline && <View style={[styles.statusDot, { backgroundColor: theme.colors.statusOnline }]} />}
          </View>
        }
        title={`${WELCOME_HOME_TEXTS.greetingPrefix}${userName}${WELCOME_HOME_TEXTS.greetingSuffix}`}
        rightComponent={
          <View style={styles.rightActionsRow}>
            <TouchableOpacity onPress={onCustomizeRobot}>
              <Text style={[styles.actionTextEdit, { color: theme.colors.textPrimary }]}>
                {WELCOME_HOME_TEXTS.editAction}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onOpenMenu}>
              <Text style={[styles.actionTextMore, { color: theme.colors.textPrimary }]}>
                {WELCOME_HOME_TEXTS.moreAction}
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
      <View style={styles.content}>
        <View style={styles.illustrationWrapper}>
          <RobotIllustration size={220} />
          <Text style={[styles.greetingTitle, { color: theme.colors.textPrimary }]}>
            {WELCOME_HOME_TEXTS.questionTitle}
          </Text>
          <Text style={[styles.greetingSubtitle, { color: theme.colors.textSecondary }]}>
            {WELCOME_HOME_TEXTS.questionSubtitle}
          </Text>
        </View>
        <Button title={WELCOME_HOME_TEXTS.startButton} onPress={onNewChat} style={styles.button} />
      </View>
    </SafeAreaView>
  );
};

export default WelcomeHomeScreen;
