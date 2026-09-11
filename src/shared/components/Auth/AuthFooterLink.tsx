import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useTheme } from '../../../hooks';

export interface AuthFooterLinkProps {
  promptText: string;
  linkText: string;
  onPress: () => void;
  style?: ViewStyle;
}

export const AuthFooterLink: React.FC<AuthFooterLinkProps> = ({
  promptText,
  linkText,
  onPress,
  style,
}) => {
  const theme = useTheme();

  return (
    <View style={[styles.footer, style]}>
      <Text style={[styles.footerText, theme.typography.bodyMd, { color: theme.colors.textSecondary }]}>
        {promptText}{' '}
      </Text>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Text style={[styles.linkText, theme.typography.headingSm, { color: theme.colors.primary }]}>
          {linkText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  footerText: {
    fontSize: 14,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '700',
  },
});

export default AuthFooterLink;
