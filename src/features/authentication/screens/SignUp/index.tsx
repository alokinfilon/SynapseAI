import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Checkbox, Divider, Input, SocialTileRow } from '../../../../shared/components';
import { SIGN_UP_TEXTS } from './constants';
import { styles } from './styles';
import { useSignUp, UseSignUpProps } from './useSignUp';

export interface SignUpScreenProps extends UseSignUpProps {}

export const SignUpScreen: React.FC<SignUpScreenProps> = (props) => {
  const {
    theme,
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    onBack,
    handleSignUpSubmit,
    onSignInPress,
  } = useSignUp(props);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.canvas }]}>
      <StatusBar barStyle={theme.isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Top Header Navigation */}
      <View style={styles.headerNav}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
          <Text style={[styles.backArrow, { color: theme.colors.textPrimary }]}>←</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          
          {/* Main Heading */}
          <Text style={[styles.title, theme.typography.displayXl, { color: theme.colors.textPrimary }]}>
            {SIGN_UP_TEXTS.title}
          </Text>

          {/* Form Fields */}
          <View style={styles.form}>
            <Input
              placeholder={SIGN_UP_TEXTS.emailPlaceholder}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={
                <Text style={[styles.inputIcon, { color: theme.colors.textMuted }]}>
                  ✉
                </Text>
              }
            />

            <Input
              placeholder={SIGN_UP_TEXTS.passwordPlaceholder}
              value={password}
              onChangeText={setPassword}
              isPassword
              leftIcon={
                <Text style={[styles.inputIcon, { color: theme.colors.textMuted }]}>
                  🔒
                </Text>
              }
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

          <SocialTileRow style={styles.socialRow} />

          {/* Footer Link */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, theme.typography.bodyMd, { color: theme.colors.textSecondary }]}>
              {SIGN_UP_TEXTS.alreadyHaveAccountPrompt}
            </Text>
            <TouchableOpacity onPress={onSignInPress} activeOpacity={0.7}>
              <Text style={[styles.signInLink, theme.typography.headingSm, { color: theme.colors.primary }]}>
                {SIGN_UP_TEXTS.signInLink}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
