import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useTheme } from '../../../hooks';

export interface NumericKeypadProps {
  onKeyPress: (val: string) => void;
  onDelete: () => void;
  style?: ViewStyle;
}

export const NumericKeypad: React.FC<NumericKeypadProps> = ({
  onKeyPress,
  onDelete,
  style,
}) => {
  const theme = useTheme();

  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '⌫'],
  ];

  return (
    <View style={[styles.container, style]}>
      {keys.map((row, rIdx) => (
        <View key={rIdx} style={styles.row}>
          {row.map((k) => {
            const isDelete = k === '⌫';
            return (
              <TouchableOpacity
                key={k}
                style={styles.keyButton}
                onPress={() => {
                  if (isDelete) {
                    onDelete();
                  } else {
                    onKeyPress(k);
                  }
                }}
                activeOpacity={0.6}>
                <Text
                  style={[
                    styles.keyText,
                    { color: theme.colors.textPrimary },
                  ]}>
                  {k}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 8,
  },
  keyButton: {
    width: 72,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default NumericKeypad;
