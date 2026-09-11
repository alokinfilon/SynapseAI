import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { LeftArrowIcon } from '../../../../assets';
import { useTheme } from '../../../hooks';

export interface ScreenHeaderProps {
  /** Optional title to display in the header bar */
  title?: string;
  /** Callback fired when pressing back button */
  onBack?: () => void;
  /** Set false to hide the back button. Defaults to true. */
  showBack?: boolean;
  /** Right side action items/buttons */
  rightActions?: React.ReactNode;
  /** Optional container style override */
  style?: ViewStyle;
  /** Optional title style override */
  titleStyle?: any;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  onBack,
  showBack = true,
  rightActions,
  style,
  titleStyle,
}) => {
  const theme = useTheme();

  return (
    <View style={[styles.headerNav, style]}>
      <View style={styles.leftGroup}>
        {showBack && (
          <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
            <LeftArrowIcon size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        )}
        {title ? (
          <Text
            style={[
              styles.headerTitle,
              theme.typography.headingLg,
              { color: theme.colors.textPrimary },
              titleStyle,
            ]}>
            {title}
          </Text>
        ) : null}
      </View>
      {rightActions ? <View style={styles.rightGroup}>{rightActions}</View> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  headerNav: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});

export default ScreenHeader;
