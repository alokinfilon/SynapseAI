import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useTheme } from '../../../hooks';

export interface OptionCardProps {
  icon: React.ReactNode;
  title: string;
  detail: string;
  selected?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  icon,
  title,
  detail,
  selected = false,
  onPress,
  style,
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.isDarkMode ? '#1F222A' : '#FFFFFF',
          borderColor: selected
            ? theme.colors.primary
            : theme.isDarkMode
            ? '#35383F'
            : '#E8ECF4',
          borderWidth: selected ? 2 : 1,
          borderRadius: theme.radius.card,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}>
      {/* Icon Circle */}
      <View
        style={[
          styles.iconCircle,
          {
            backgroundColor: selected
              ? theme.colors.primaryGlow
              : theme.isDarkMode
              ? '#262A34'
              : '#F5F6F8',
          },
        ]}>
        {icon}
      </View>

      {/* Text Details */}
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.title,
            theme.typography.caption,
            { color: theme.colors.textSecondary },
          ]}>
          {title}
        </Text>
        <Text
          style={[
            styles.detail,
            theme.typography.headingSm,
            { color: theme.colors.textPrimary },
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit>
          {detail}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginVertical: 8,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 13,
    marginBottom: 4,
  },
  detail: {
    fontWeight: '700',
  },
});

export default OptionCard;
