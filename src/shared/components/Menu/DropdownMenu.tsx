import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useTheme } from '../../../hooks';

export interface DropdownMenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  isDestructive?: boolean;
  onPress?: () => void;
}

export interface DropdownMenuProps {
  visible: boolean;
  items: DropdownMenuItem[];
  onClose?: () => void;
  style?: ViewStyle;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  visible,
  items,
  onClose,
  style,
}) => {
  const theme = useTheme();

  if (!visible) return null;

  return (
    <TouchableOpacity
      style={styles.overlay}
      activeOpacity={1}
      onPress={onClose}>
      <View
        style={[
          styles.menuContainer,
          {
            backgroundColor: theme.isDarkMode ? '#1F222A' : '#FFFFFF',
            borderColor: theme.isDarkMode ? '#35383F' : '#E8ECF4',
            borderRadius: theme.radius.card,
          },
          theme.shadows.md,
          style,
        ]}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              index < items.length - 1 && {
                borderBottomWidth: 1,
                borderBottomColor: theme.isDarkMode ? '#262A34' : '#F5F6F8',
              },
            ]}
            onPress={() => {
              item.onPress?.();
              onClose?.();
            }}
            activeOpacity={0.7}>
            <View style={styles.itemIconWrapper}>
              {typeof item.icon === 'string' ? (
                <Text
                  style={[
                    styles.itemIcon,
                    {
                      color: item.isDestructive
                        ? theme.colors.statusError
                        : theme.colors.textPrimary,
                    },
                  ]}>
                  {item.icon}
                </Text>
              ) : (
                item.icon
              )}
            </View>
            <Text
              style={[
                styles.itemLabel,
                theme.typography.headingSm,
                {
                  color: item.isDestructive
                    ? theme.colors.statusError
                    : theme.colors.textPrimary,
                },
              ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  menuContainer: {
    position: 'absolute',
    top: 56,
    right: 20,
    width: 170,
    borderWidth: 1,
    paddingVertical: 4,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  itemIconWrapper: {
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemIcon: {
    fontSize: 16,
  },
  itemLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default DropdownMenu;
