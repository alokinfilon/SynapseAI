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
import { Button, Checkbox, Input, RobotIllustration } from '../../../../shared/components';
import { CREATE_PASSWORD_TEXTS } from './constants';
import { styles } from './styles';
import { useCreateNewPassword, UseCreateNewPasswordProps } from './useCreateNewPassword';

export interface CreateNewPasswordScreenProps extends UseCreateNewPasswordProps {}

export const CreateNewPasswordScreen: React.FC<CreateNewPasswordScreenProps> = (props) => {
  const {
    theme,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    rememberMe,
    setRememberMe,
    onBack,
    handleSubmit,
  } = useCreateNewPassword(props);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.canvas }]}>
      <StatusBar barStyle={theme.isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
          <Text style={[styles.backArrow, { color: theme.colors.textPrimary }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, theme.typography.displayLg, { color: theme.colors.textPrimary }]}>
          {CREATE_PASSWORD_TEXTS.headerTitle}
        </Text>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          
          {/* Bobo AI Robot Illustration */}
          <View style={styles.illustrationWrapper}>
            <RobotIllustration size={200} />
          </View>

          {/* Section Label */}
          <Text style={[styles.label, theme.typography.bodyLg, { color: theme.colors.textPrimary }]}>
            {CREATE_PASSWORD_TEXTS.label}
          </Text>

          {/* Password Input Fields */}
          <View style={styles.form}>
            <Input
              placeholder={CREATE_PASSWORD_TEXTS.newPasswordPlaceholder}
              value={password}
              onChangeText={setPassword}
              isPassword
              leftIcon={
                <Text style={[styles.inputIcon, { color: theme.colors.textMuted }]}>🔒</Text>
              }
            />

            <Input
              placeholder={CREATE_PASSWORD_TEXTS.confirmPasswordPlaceholder}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              isPassword
              leftIcon={
                <Text style={[styles.inputIcon, { color: theme.colors.textMuted }]}>🔒</Text>
              }
            />

            <Checkbox
              label={CREATE_PASSWORD_TEXTS.rememberMeLabel}
              checked={rememberMe}
              onToggle={setRememberMe}
              style={styles.checkbox}
            />
          </View>

          {/* Bottom Action Button */}
          <View style={styles.buttonWrapper}>
            <Button
              title={CREATE_PASSWORD_TEXTS.continueButton}
              onPress={handleSubmit}
              style={styles.continueButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateNewPasswordScreen;
