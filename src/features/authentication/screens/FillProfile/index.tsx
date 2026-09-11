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
import { MessageIcon } from '../../../../../assets';
import { AvatarPicker, Button, Input, ScreenHeader } from '../../../../shared/components';
import { FILL_PROFILE_TEXTS } from './constants';
import { styles } from './styles';
import { useFillProfile, UseFillProfileProps } from './useFillProfile';

export interface FillProfileScreenProps extends UseFillProfileProps {}

export const FillProfileScreen: React.FC<FillProfileScreenProps> = (props) => {
  const {
    theme,
    fullName,
    setFullName,
    nickname,
    setNickname,
    email,
    setEmail,
    phone,
    setPhone,
    avatarUri,
    onBack,
    handleContinue,
  } = useFillProfile(props);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.canvas }]}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {/* Header */}
            <ScreenHeader
              title={FILL_PROFILE_TEXTS.headerTitle}
              onBack={onBack}
            />

            <ScrollView contentContainerStyle={styles.scrollContent}>
              <View style={styles.avatarWrapper}>
                <AvatarPicker
                  imageUri={avatarUri}
                  onPickImage={() => {}}
                />
              </View>

              <View style={styles.form}>
                <Input
                  placeholder={FILL_PROFILE_TEXTS.fullNamePlaceholder}
                  value={fullName}
                  onChangeText={setFullName}
                  style={styles.input}
                />
                <Input
                  placeholder={FILL_PROFILE_TEXTS.nicknamePlaceholder}
                  value={nickname}
                  onChangeText={setNickname}
                  style={styles.input}
                />
                <Input
                  placeholder={FILL_PROFILE_TEXTS.emailPlaceholder}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  leftIcon={<MessageIcon width={18} height={18} color={theme.colors.textMuted} />}
                  style={styles.input}
                />
                <Input
                  placeholder={FILL_PROFILE_TEXTS.phonePlaceholder}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  style={styles.input}
                />
              </View>

              <Button
                title={FILL_PROFILE_TEXTS.continueButton}
                onPress={handleContinue}
                style={styles.continueButton}
              />
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FillProfileScreen;
