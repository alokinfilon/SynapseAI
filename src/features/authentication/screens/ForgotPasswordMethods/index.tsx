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
import { EmailIcon, MessageIcon } from '../../../../../assets';
import { Button, Input, OptionCard, RobotAvatar, ScreenHeader } from '../../../../shared/components';
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
    contactInput,
    setContactInput,
    onBack,
    handleContinueSubmit,
  } = useForgotPasswordMethods(props);

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={[styles.container, { backgroundColor: theme.colors.canvas }]}>
      <StatusBar barStyle={theme.isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <ScreenHeader
        title={FORGOT_PASSWORD_TEXTS.headerTitle}
        onBack={onBack}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag">
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

              {/* Custom Email or Phone Input */}
              <View style={{ width: '100%', marginTop: 16 }}>
                <Input
                  placeholder={
                    selectedMethod === 'email'
                      ? 'Enter your email address...'
                      : 'Enter your phone number...'
                  }
                  value={contactInput}
                  onChangeText={setContactInput}
                  keyboardType={selectedMethod === 'email' ? 'email-address' : 'phone-pad'}
                  leftIcon={
                    selectedMethod === 'email' ? (
                      <EmailIcon size={18} color={theme.colors.textMuted} />
                    ) : (
                      <MessageIcon size={18} color={theme.colors.textMuted} />
                    )
                  }
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
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPasswordMethodsScreen;
