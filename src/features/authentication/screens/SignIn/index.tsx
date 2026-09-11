import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmailIcon, LockIcon } from '../../../../../assets';
import {
  AuthFooterLink,
  AuthSuccessModal,
  Button,
  Checkbox,
  ComingSoonModal,
  Divider,
  Input,
  RobotAvatar,
  ScreenHeader,
  SocialTileRow,
} from '../../../../shared/components';
import { SIGN_IN_TEXTS } from './constants';
import { styles } from './styles';
import { useSignIn, UseSignInProps } from './useSignIn';

export interface SignInScreenProps extends UseSignInProps { }

export const SignInScreen: React.FC<SignInScreenProps> = (props) => {
  const {
    theme,
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    showSuccessModal,
    setShowSuccessModal,
    showComingSoonModal,
    setShowComingSoonModal,
    confirmSignIn,
    onBack,
    handleSignInSubmit,
    onForgotPassword,
    onSignUpPress,
    handleSocialLogin,
  } = useSignIn(props);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.canvas }]}>
      <StatusBar barStyle={theme.isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Top Header Navigation */}
      <ScreenHeader onBack={onBack} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag">

            {/* Bobo Robot Brand Hero */}
            <View style={styles.brandHero}>
              <RobotAvatar size={220} expression="normal" showParticles={false} />
            </View>

            {/* Heading */}
            <View style={styles.headingWrapper}>
              <Text style={[styles.title, theme.typography.displayXl, { color: theme.colors.textPrimary }]}>
                {SIGN_IN_TEXTS.title}
              </Text>
              <Text style={[styles.subtitle, theme.typography.bodyMd, { color: theme.colors.textSecondary }]}>
                {SIGN_IN_TEXTS.subtitle}
              </Text>
            </View>

            {/* Form Fields */}
            <View style={styles.form}>
              <Input
                placeholder={SIGN_IN_TEXTS.emailPlaceholder}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon={<EmailIcon size={18} color={theme.colors.textMuted} />}
              />

              <Input
                placeholder={SIGN_IN_TEXTS.passwordPlaceholder}
                value={password}
                onChangeText={setPassword}
                isPassword
                leftIcon={<LockIcon size={18} color={theme.colors.textMuted} />}
              />

              {/* Remember Me & Forgot Password Row */}
              <View style={styles.optionsRow}>
                <Checkbox
                  label={SIGN_IN_TEXTS.rememberMeLabel}
                  checked={rememberMe}
                  onToggle={setRememberMe}
                  style={styles.checkbox}
                />

                <TouchableOpacity onPress={onForgotPassword} activeOpacity={0.7}>
                  <Text style={[styles.forgotPasswordText, theme.typography.headingSm, { color: theme.colors.primary }]}>
                    {SIGN_IN_TEXTS.forgotPasswordLink}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Primary Sign In Button */}
              <Button
                title={SIGN_IN_TEXTS.signInButton}
                onPress={handleSignInSubmit}
                style={styles.signInButton}
              />
            </View>

            {/* Social Sign In Option */}
            <Divider label={SIGN_IN_TEXTS.dividerLabel} style={styles.divider} />

            <SocialTileRow style={styles.socialRow} onSelectProvider={handleSocialLogin} />

            {/* Footer Link */}
            <AuthFooterLink
              promptText={SIGN_IN_TEXTS.noAccountPrompt}
              linkText={SIGN_IN_TEXTS.signUpLink}
              onPress={onSignUpPress}
            />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* Login Success Modal */}
      <AuthSuccessModal
        visible={showSuccessModal}
        title="Congratulations!"
        subtitle="Your account is ready to use. You will be redirected to the Home page in a few seconds."
        onConfirm={confirmSignIn}
        onClose={() => setShowSuccessModal(false)}
      />

      {/* Social Login Coming Soon Modal */}
      <ComingSoonModal
        visible={showComingSoonModal}
        onClose={() => setShowComingSoonModal(false)}
      />
    </SafeAreaView>
  );
};

export default SignInScreen;
