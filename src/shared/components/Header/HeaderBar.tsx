import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useTheme } from '../../../hooks';
import { fonts } from '../../../theme';

export interface HeaderBarProps {
  title: string;
  leftIcon?: React.ReactNode;
  leftComponent?: React.ReactNode;
  rightActions?: React.ReactNode;
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
  const left = leftComponent || leftIcon;
  const right = rightComponent || rightActions;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.canvas,
          borderColor: theme.isDarkMode ? '#262A34' : '#F0F3F8',
        },
        style,
      ]}>
      <View style={styles.leftSection}>
        {left ? <View style={styles.leftIconWrapper}>{left}</View> : null}
        <Text
          style={[
            styles.title,
            { color: theme.colors.textPrimary, fontFamily: fonts.bold },
          ]}>
          {title}
        </Text>
      </View>
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
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
});

export default HeaderBar;
