import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../../hooks';

export interface PaginationIndicatorProps {
  count?: number;
  total?: number;
  activeIndex: number;
  style?: any;
}

export const PaginationIndicator: React.FC<PaginationIndicatorProps> = ({
  count,
  total,
  activeIndex,
  style,
}) => {
  const theme = useTheme();
  const dotsCount = total || count || 3;

  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: dotsCount }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            i === activeIndex
              ? [styles.activeDot, { backgroundColor: theme.colors.primary }]
              : { backgroundColor: theme.colors.surface2 },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    width: 24,
    borderRadius: 4,
  },
});

export default PaginationIndicator;
