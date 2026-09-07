import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { CheckIcon } from '../../../../assets/svg';
import { useTheme } from '../../../hooks';

export interface CheckboxProps {
  label: string;
  checked: boolean;
  onToggle?: (checked: boolean) => void;
  onChange?: (checked: boolean) => void;
  style?: ViewStyle;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onToggle,
  onChange,
  style,
}) => {
  const theme = useTheme();
  const handlePress = () => {
    const next = !checked;
    onToggle?.(next);
    onChange?.(next);
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      activeOpacity={0.8}>
      <View
        style={[
          styles.box,
          {
            backgroundColor: checked ? theme.colors.primary : 'transparent',
            borderColor: checked
              ? theme.colors.primary
              : theme.isDarkMode
              ? '#35383F'
              : '#00D2B4',
          },
        ]}>
        {checked ? <CheckIcon size={14} color="#FFFFFF" /> : null}
      </View>
      <Text
        style={[
          styles.label,
          theme.typography.bodyMd,
          { color: theme.colors.textPrimary },
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  label: {
    fontWeight: '600',
  },
});

export default Checkbox;
