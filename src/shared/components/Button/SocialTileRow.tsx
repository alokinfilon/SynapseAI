import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { AppleIcon, FacebookIcon, GoogleIcon } from '../../../../assets/svg';
import { useTheme } from '../../../hooks';
import { SocialProvider } from './SocialButton';

export interface SocialTileRowProps {
  onSelectProvider?: (provider: SocialProvider) => void;
  style?: ViewStyle;
}

export const SocialTileRow: React.FC<SocialTileRowProps> = ({
  onSelectProvider,
  style,
}) => {
  const theme = useTheme();

  const providers: { type: SocialProvider; icon: React.ReactNode }[] = [
    {
      type: 'facebook',
      icon: <FacebookIcon width={28} height={28} color="#1877F2" />,
    },
    {
      type: 'google',
      icon: <GoogleIcon width={28} height={28} />,
    },
    {
      type: 'apple',
      icon: <AppleIcon width={28} height={28} color={theme.isDarkMode ? '#FFFFFF' : '#000000'} />,
    },
  ];

  return (
    <View style={[styles.row, style]}>
      {providers.map((p) => (
        <TouchableOpacity
          key={p.type}
          style={[
            styles.tile,
            {
              backgroundColor: theme.isDarkMode ? '#1F222A' : '#FFFFFF',
              borderColor: theme.isDarkMode ? '#262A35' : '#EEEEEE',
              borderRadius: 16,
            },
          ]}
          onPress={() => onSelectProvider?.(p.type)}
          activeOpacity={0.75}>
          {p.icon}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginVertical: 16,
  },
  tile: {
    width: 86,
    height: 56,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookLetter: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 20,
  },
  googleG: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4285F4',
  },
  appleLogo: {
    fontSize: 24,
    fontWeight: '700',
  },
});

export default SocialTileRow;
