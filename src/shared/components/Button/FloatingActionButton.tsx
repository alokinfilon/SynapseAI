import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { PlusIcon } from '../../../../assets';
import { useTheme } from '../../../hooks';

export interface FloatingActionButtonProps {
  onPress: () => void;
  icon?: React.ReactNode;
  size?: number;
  style?: ViewStyle;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  icon,
  size = 56,
  style,
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.fab,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: theme.colors.primary,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.85}>
      {icon || <PlusIcon size={28} color="#FFFFFF" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
});

export default FloatingActionButton;
