import React from 'react';
import { SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Button, NumericKeypad, OTPInput } from '../../../../shared/components';
import { OTP_TEXTS } from './constants';
import { styles } from './styles';
import { useOTPVerification, UseOTPVerificationProps } from './useOTPVerification';

export interface OTPVerificationScreenProps extends UseOTPVerificationProps {}

export const OTPVerificationScreen: React.FC<OTPVerificationScreenProps> = (props) => {
  const {
    theme,
    contactDetail,
    code,
    seconds,
    handleKeyPress,
    handleDelete,
    handleResendPress,
    handleVerifySubmit,
    onBack,
  } = useOTPVerification(props);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.canvas }]}>
      <StatusBar barStyle={theme.isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
          <Text style={[styles.backArrow, { color: theme.colors.textPrimary }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, theme.typography.displayLg, { color: theme.colors.textPrimary }]}>
          {OTP_TEXTS.headerTitle}
        </Text>
      </View>

      <View style={styles.content}>
        {/* Subtitle Contact Message */}
        <Text style={[styles.subtitle, theme.typography.bodyMd, { color: theme.colors.textSecondary }]}>
          {OTP_TEXTS.subtitlePrefix}{contactDetail}
        </Text>

        {/* 4-digit OTP Code Input */}
        <OTPInput code={code} length={4} />

        {/* Resend Timer Text */}
        <TouchableOpacity onPress={handleResendPress} disabled={seconds > 0} activeOpacity={0.7}>
          <Text style={[styles.resendText, theme.typography.bodyMd, { color: theme.colors.textPrimary }]}>
            {seconds > 0 ? (
              <>
                {OTP_TEXTS.resendPrefix}
                <Text style={{ color: theme.colors.primary, fontFamily: theme.fonts.bold }}>
                  {seconds} s
                </Text>
              </>
            ) : (
              <Text style={{ color: theme.colors.primary, fontFamily: theme.fonts.bold }}>
                {OTP_TEXTS.resendAction}
              </Text>
            )}
          </Text>
        </TouchableOpacity>

        {/* Verify CTA Button */}
        <View style={styles.buttonWrapper}>
          <Button
            title={OTP_TEXTS.verifyButton}
            onPress={handleVerifySubmit}
            disabled={code.length < 4}
            style={styles.verifyButton}
          />
        </View>

        {/* Custom Numeric Keypad */}
        <NumericKeypad onKeyPress={handleKeyPress} onDelete={handleDelete} />
      </View>
    </SafeAreaView>
  );
};

export default OTPVerificationScreen;
