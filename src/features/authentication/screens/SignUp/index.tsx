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
import { EmailIcon, LockIcon, UserProfileIcon } from '../../../../../assets';
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
import { SIGN_UP_TEXTS } from './constants';
import { styles } from './styles';
import { useSignUp, UseSignUpProps } from './useSignUp';

export interface SignUpScreenProps extends UseSignUpProps { }

export const SignUpScreen: React.FC<SignUpScreenProps> = (props) => {
  const {
    theme,
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    rememberMe,
    setRememberMe,
    showSuccessModal,
    setShowSuccessModal,
    showComingSoonModal,
    setShowComingSoonModal,
    confirmSignUp,
    onBack,
    handleSignUpSubmit,
    onSignInPress,
    handleSocialLogin,
  } = useSignUp(props);

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

          {/* Main Heading */}
          <Text style={[styles.title, theme.typography.displayXl, { color: theme.colors.textPrimary }]}>
            {SIGN_UP_TEXTS.title}
          </Text>

          {/* Form Fields */}
          <View style={styles.form}>
            <Input
              placeholder={SIGN_UP_TEXTS.fullNamePlaceholder}
              value={fullName}
              onChangeText={setFullName}
              leftIcon={<UserProfileIcon size={18} color={theme.colors.textMuted} />}
            />

            <Input
              placeholder={SIGN_UP_TEXTS.emailPlaceholder}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={<EmailIcon size={18} color={theme.colors.textMuted} />}
            />

            <Input
              placeholder={SIGN_UP_TEXTS.passwordPlaceholder}
              value={password}
              onChangeText={setPassword}
              isPassword
              leftIcon={<LockIcon size={18} color={theme.colors.textMuted} />}
            />

            <Input
              placeholder={SIGN_UP_TEXTS.confirmPasswordPlaceholder}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              isPassword
              leftIcon={<LockIcon size={18} color={theme.colors.textMuted} />}
            />

            <Checkbox
              label={SIGN_UP_TEXTS.rememberMeLabel}
              checked={rememberMe}
              onToggle={setRememberMe}
              style={styles.checkbox}
            />

            <Button
              title={SIGN_UP_TEXTS.signUpButton}
              onPress={handleSignUpSubmit}
              style={styles.signUpButton}
            />
          </View>

          {/* Social Sign In Option */}
          <Divider label={SIGN_UP_TEXTS.dividerLabel} style={styles.divider} />

          <SocialTileRow style={styles.socialRow} onSelectProvider={handleSocialLogin} />

          {/* Footer Link */}
          <AuthFooterLink
            promptText={SIGN_UP_TEXTS.alreadyHaveAccountPrompt}
            linkText={SIGN_UP_TEXTS.signInLink}
            onPress={onSignInPress}
          />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* SignUp Success Modal */}
      <AuthSuccessModal
        visible={showSuccessModal}
        title="Congratulations!"
        subtitle="Your account is ready to use. You will be redirected to the Home page in a few seconds."
        onConfirm={confirmSignUp}
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

export default SignUpScreen;
