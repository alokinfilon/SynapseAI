import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import { AppleIcon, FacebookIcon, GoogleIcon } from '../../../../assets/svg';
import { useTheme } from '../../../hooks';

export type SocialProvider = 'facebook' | 'google' | 'apple';

export interface SocialButtonProps extends TouchableOpacityProps {
  provider: SocialProvider;
  title: string;
  style?: ViewStyle;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  title,
  style,
  onPress,
  ...rest
}) => {
  const theme = useTheme();

  const renderIcon = () => {
    switch (provider) {
      case 'facebook':
        return <FacebookIcon width={24} height={24} color="#1877F2" />;
      case 'google':
        return <GoogleIcon width={24} height={24} />;
      case 'apple':
        return <AppleIcon width={24} height={24} color={theme.isDarkMode ? '#FFFFFF' : '#000000'} />;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.isDarkMode ? '#1F222A' : '#FFFFFF',
          borderColor: theme.isDarkMode ? '#262A35' : '#EEEEEE',
          borderRadius: 16,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.75}
      {...rest}>
      <View style={styles.iconWrapper}>{renderIcon()}</View>
      <Text
        style={[
          styles.text,
          theme.typography.headingSm,
          { color: theme.colors.textPrimary },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderWidth: 1,
  },
  iconWrapper: {
    position: 'absolute',
    left: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookLetter: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 18,
  },
  googleContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleG: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4285F4',
  },
  appleLogo: {
    fontSize: 22,
    fontWeight: '700',
  },
  text: {
    fontWeight: '600',
  },
});

export default SocialButton;
