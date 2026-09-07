import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useTheme } from '../../../hooks';

export interface DividerProps {
  label?: string;
  text?: string;
  style?: ViewStyle;
}

export const Divider: React.FC<DividerProps> = ({ label, text, style }) => {
  const theme = useTheme();
  const titleText = text || label;

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.line,
          { backgroundColor: theme.isDarkMode ? '#35383F' : '#E8ECF4' },
        ]}
      />
      {titleText ? (
        <Text
          style={[
            styles.label,
            theme.typography.caption,
            { color: theme.colors.textSecondary },
          ]}>
          {titleText}
        </Text>
      ) : null}
      <View
        style={[
          styles.line,
          { backgroundColor: theme.isDarkMode ? '#35383F' : '#E8ECF4' },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
  },
  label: {
    paddingHorizontal: 16,
    fontWeight: '600',
  },
});

export default Divider;
