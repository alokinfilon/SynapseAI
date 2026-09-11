import React from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LeftArrowIcon } from '../../../../../assets';
import { Button, ComingSoonModal, Divider, RobotIllustration, ScreenHeader, SocialButton } from '../../../../shared/components';
import { LETS_IN_TEXTS } from './constants';
import { styles } from './styles';
import { useLetsIn, UseLetsInProps } from './useLetsIn';

export interface LetsInScreenProps extends UseLetsInProps {}

export const LetsInScreen: React.FC<LetsInScreenProps> = (props) => {
  const {
    theme,
    showComingSoonModal,
    setShowComingSoonModal,
    handleFacebookLogin,
    handleGoogleLogin,
    handleAppleLogin,
    onBack,
    onSignInWithPassword,
    onSignUpPress,
  } = useLetsIn(props);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.canvas }]}>
      <StatusBar barStyle={theme.isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Top Header Navigation */}
      <ScreenHeader onBack={onBack} />

      <View style={styles.content}>
        {/* Bobo AI Robot Illustration */}
        <View style={styles.illustrationWrapper}>
          <RobotIllustration size={200} />
        </View>

        {/* Title */}
        <Text style={[styles.title, theme.typography.displayXl, { color: theme.colors.textPrimary }]}>
          {LETS_IN_TEXTS.title}
        </Text>

        {/* Social Login Buttons Stack */}
        <View style={styles.socialStack}>
          <SocialButton
            provider="facebook"
            title={LETS_IN_TEXTS.facebookButton}
            onPress={handleFacebookLogin}
            style={styles.socialButton}
          />
          <SocialButton
            provider="google"
            title={LETS_IN_TEXTS.googleButton}
            onPress={handleGoogleLogin}
            style={styles.socialButton}
          />
          <SocialButton
            provider="apple"
            title={LETS_IN_TEXTS.appleButton}
            onPress={handleAppleLogin}
            style={styles.socialButton}
          />
        </View>

        {/* Divider */}
        <Divider label={LETS_IN_TEXTS.dividerLabel} style={styles.divider} />

        {/* Sign in with Password Button */}
        <Button
          title={LETS_IN_TEXTS.signInButton}
          onPress={onSignInWithPassword}
          style={styles.signInButton}
        />

        {/* Footer Sign Up Prompt */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, theme.typography.bodyMd, { color: theme.colors.textSecondary }]}>
            {LETS_IN_TEXTS.noAccountPrompt}
          </Text>
          <TouchableOpacity onPress={onSignUpPress} activeOpacity={0.7}>
            <Text style={[styles.signUpLink, theme.typography.headingSm, { color: theme.colors.primary }]}>
              {LETS_IN_TEXTS.signUpLink}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Social Login Coming Soon Modal */}
      <ComingSoonModal
        visible={showComingSoonModal}
        onClose={() => setShowComingSoonModal(false)}
      />
    </SafeAreaView>
  );
};

export default LetsInScreen;
