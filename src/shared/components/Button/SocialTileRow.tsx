import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
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
      icon: (
        <View style={[styles.iconCircle, { backgroundColor: '#1877F2' }]}>
          <Text style={styles.facebookLetter}>f</Text>
        </View>
      ),
    },
    {
      type: 'google',
      icon: <Text style={styles.googleG}>G</Text>,
    },
    {
      type: 'apple',
      icon: (
        <Text
          style={[
            styles.appleLogo,
            { color: theme.isDarkMode ? '#FFFFFF' : '#000000' },
          ]}>
          
        </Text>
      ),
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
              borderColor: theme.isDarkMode ? '#35383F' : '#E8ECF4',
              borderRadius: theme.radius.card,
            },
          ]}
          onPress={() => onSelectProvider?.(p.type)}
          activeOpacity={0.7}>
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
    gap: 20,
    marginVertical: 12,
  },
  tile: {
    width: 76,
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
