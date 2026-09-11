import React from 'react';
import {
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GraphUpIcon, IMAGES, SettingIcon } from '../../../../../assets';
import { ComingSoonModal, HeaderBar, RobotAvatar } from '../../../../shared/components';
import { WELCOME_HOME_TEXTS } from './constants';
import { styles } from './styles';
import { useWelcomeHome, UseWelcomeHomeProps } from './useWelcomeHome';

export interface WelcomeHomeScreenProps extends UseWelcomeHomeProps {}

export const WelcomeHomeScreen: React.FC<WelcomeHomeScreenProps> = (props) => {
  const {
    theme,
    userName,
    onNewChat,
    onCustomizeRobot,
    onOpenMenu,
    comingSoonModalVisible,
    comingSoonTitle,
    comingSoonSubtitle,
    onCloseComingSoonModal,
  } = useWelcomeHome(props);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.canvas }]}>
      <StatusBar barStyle={theme.isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Shared Header */}
      <HeaderBar
        title={WELCOME_HOME_TEXTS.brandName}
        leftIcon={<RobotAvatar size={46} expression="normal" showParticles={false} />}
        rightActions={
          <>
            <TouchableOpacity onPress={onCustomizeRobot} style={styles.actionIconBtn} activeOpacity={0.7}>
              <GraphUpIcon size={22} color={theme.colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onOpenMenu} style={styles.actionIconBtn} activeOpacity={0.7}>
              <SettingIcon size={22} color={theme.colors.textPrimary} />
            </TouchableOpacity>
          </>
        }
      />

      {/* Main Content — vertically centered */}
      <View style={styles.body}>
        {/* Full body waving robot */}
        <View style={styles.avatarArea}>
          <Image source={IMAGES.robotWaving} style={styles.robotImage} resizeMode="contain" />
        </View>

        {/* Text */}
        <View style={styles.textArea}>
          <Text style={[styles.greeting, { color: theme.colors.textPrimary }]}>
            {WELCOME_HOME_TEXTS.welcomePrefix}{userName}{WELCOME_HOME_TEXTS.welcomeSuffix}
          </Text>
          <Text style={[styles.tagline, { color: theme.colors.textPrimary }]}>
            {WELCOME_HOME_TEXTS.funHeading}
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            {WELCOME_HOME_TEXTS.questionSubtitle}
          </Text>
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={[styles.ctaButton, { backgroundColor: theme.colors.primary }]}
          onPress={onNewChat}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaText}>{WELCOME_HOME_TEXTS.startButton}</Text>
        </TouchableOpacity>
      </View>

      {/* Coming Soon Modal for Settings / Trends */}
      <ComingSoonModal
        visible={comingSoonModalVisible}
        onClose={onCloseComingSoonModal}
        title={comingSoonTitle}
        subtitle={comingSoonSubtitle}
      />
    </SafeAreaView>
  );
};

export default WelcomeHomeScreen;
