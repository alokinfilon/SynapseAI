import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useTheme } from '../../../hooks';

export interface OTPInputProps {
  code: string;
  length?: number;
  focusedIndex?: number;
  onPressIndex?: (index: number) => void;
  style?: ViewStyle;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  code = '',
  length = 4,
  focusedIndex = -1,
  onPressIndex,
  style,
}) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, style]}>
      {Array.from({ length }).map((_, index) => {
        const digit = code[index] || '';
        const isFocused =
          focusedIndex >= 0 ? focusedIndex === index : code.length === index;

        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.box,
              {
                backgroundColor: isFocused
                  ? theme.isDarkMode
                    ? 'rgba(0, 210, 180, 0.08)'
                    : 'rgba(0, 210, 180, 0.05)'
                  : theme.isDarkMode
                  ? '#1F222A'
                  : '#FAFAFA',
                borderColor: isFocused
                  ? theme.colors.primary
                  : theme.isDarkMode
                  ? '#35383F'
                  : '#E8ECF4',
                borderWidth: isFocused ? 2 : 1,
                borderRadius: theme.radius.card,
              },
            ]}
            onPress={() => onPressIndex?.(index)}
            activeOpacity={0.8}>
            <Text
              style={[
                styles.digitText,
                theme.typography.displayXl,
                { color: theme.colors.textPrimary },
              ]}>
              {digit}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginVertical: 20,
  },
  box: {
    width: 68,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  digitText: {
    fontSize: 26,
    fontWeight: '700',
  },
});

export default OTPInput;
