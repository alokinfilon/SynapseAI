import React from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, NumericKeypad, OTPInput, ScreenHeader } from '../../../../shared/components';
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
    handleAutoFill,
    handleResendPress,
    handleVerifySubmit,
    onBack,
  } = useOTPVerification(props);

  return (
    <SafeAreaView edges={['top', 'bottom']} style={[styles.container, { backgroundColor: theme.colors.canvas }]}>
      <StatusBar barStyle={theme.isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <ScreenHeader
        title={OTP_TEXTS.headerTitle}
        onBack={onBack}
      />

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
          <TouchableOpacity
            style={{
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 20,
              backgroundColor: theme.isDarkMode ? '#1F2937' : '#E6FFFA',
              marginBottom: 12,
              alignSelf: 'center',
              borderWidth: 1,
              borderColor: theme.colors.primary,
            }}
            onPress={handleAutoFill}
            activeOpacity={0.8}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: theme.colors.primary }}>
              ⚡ Auto-fill OTP Code (5521)
            </Text>
          </TouchableOpacity>

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
