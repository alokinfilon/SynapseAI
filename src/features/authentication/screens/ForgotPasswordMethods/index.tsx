import React from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmailIcon, LeftArrowIcon, MessageIcon } from '../../../../../assets/svg';
import { Button, OptionCard, RobotAvatar } from '../../../../shared/components';
import { FORGOT_PASSWORD_TEXTS } from './constants';
import { styles } from './styles';
import {
  ResetMethod,
  useForgotPasswordMethods,
  UseForgotPasswordMethodsProps,
} from './useForgotPasswordMethods';

export type { ResetMethod };
export interface ForgotPasswordMethodsScreenProps extends UseForgotPasswordMethodsProps {}

export const ForgotPasswordMethodsScreen: React.FC<ForgotPasswordMethodsScreenProps> = (props) => {
  const {
    theme,
    selectedMethod,
    setSelectedMethod,
    onBack,
    handleContinueSubmit,
  } = useForgotPasswordMethods(props);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.canvas }]}>
      <StatusBar barStyle={theme.isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={styles.headerNav}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
          <LeftArrowIcon size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, theme.typography.headingLg, { color: theme.colors.textPrimary }]}>
          {FORGOT_PASSWORD_TEXTS.headerTitle}
        </Text>
      </View>

      <View style={styles.content}>
        {/* Bobo AI Robot Hero */}
        <View style={styles.illustrationWrapper}>
          <RobotAvatar size={105} expression="smile" showParticles={false} />
        </View>

        {/* Instruction Subtitle */}
        <Text style={[styles.instructionText, theme.typography.bodyLg, { color: theme.colors.textSecondary }]}>
          {FORGOT_PASSWORD_TEXTS.instruction}
        </Text>

        {/* Method Option Cards Stack */}
        <View style={styles.cardsStack}>
          <OptionCard
            title={FORGOT_PASSWORD_TEXTS.smsTitle}
            detail={FORGOT_PASSWORD_TEXTS.smsDetail}
            icon={<MessageIcon size={24} color={theme.colors.primary} />}
            selected={selectedMethod === 'sms'}
            onPress={() => setSelectedMethod('sms')}
          />

          <OptionCard
            title={FORGOT_PASSWORD_TEXTS.emailTitle}
            detail={FORGOT_PASSWORD_TEXTS.emailDetail}
            icon={<EmailIcon size={24} color={theme.colors.primary} />}
            selected={selectedMethod === 'email'}
            onPress={() => setSelectedMethod('email')}
          />
        </View>

        {/* Bottom Action Button */}
        <View style={styles.buttonWrapper}>
          <Button
            title={FORGOT_PASSWORD_TEXTS.continueButton}
            onPress={handleContinueSubmit}
            style={styles.continueButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordMethodsScreen;
