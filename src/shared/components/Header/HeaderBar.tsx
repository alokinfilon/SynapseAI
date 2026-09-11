import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useTheme } from '../../../hooks';
import { fonts } from '../../../theme';

export interface HeaderBarProps {
  /** Title text — omit if using leftComponent with its own title */
  title?: string;
  /** Single icon placed before the title */
  leftIcon?: React.ReactNode;
  /** Full custom left section — overrides leftIcon + title */
  leftComponent?: React.ReactNode;
  /** Array of action buttons rendered on the right */
  rightActions?: React.ReactNode;
  /** Full custom right section — overrides rightActions */
  rightComponent?: React.ReactNode;
  style?: ViewStyle;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  title,
  leftIcon,
  leftComponent,
  rightActions,
  rightComponent,
  style,
}) => {
  const theme = useTheme();
  const right = rightComponent || rightActions;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.canvas },
        style,
      ]}>
      {leftComponent ? (
        <View style={styles.leftSection}>{leftComponent}</View>
      ) : (
        <View style={styles.leftSection}>
          {leftIcon ? <View style={styles.leftIconWrapper}>{leftIcon}</View> : null}
          {title ? (
            <Text
              style={[
                styles.title,
                { color: theme.colors.textPrimary, fontFamily: fonts.bold },
              ]}>
              {title}
            </Text>
          ) : null}
        </View>
      )}
      {right ? <View style={styles.rightSection}>{right}</View> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIconWrapper: {
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
});

export default HeaderBar;
