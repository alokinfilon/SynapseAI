import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { EditIcon, UserProfileIcon } from '../../../../assets/svg';
import { useTheme } from '../../../hooks';

export interface AvatarPickerProps {
  imageUri?: string;
  size?: number;
  onPressEdit?: () => void;
  onPickImage?: () => void;
  style?: ViewStyle;
}

export const AvatarPicker: React.FC<AvatarPickerProps> = ({
  imageUri,
  size = 130,
  onPressEdit,
  style,
}) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      {/* Main Avatar Surface */}
      <View
        style={[
          styles.avatarCircle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: theme.isDarkMode ? '#262A34' : '#F0F3F8',
          },
        ]}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={[
              styles.image,
              { width: size, height: size, borderRadius: size / 2 },
            ]}
          />
        ) : (
          <UserProfileIcon size={size * 0.5} color={theme.colors.textMuted} />
        )}
      </View>

      {/* Edit Badge Button */}
      <TouchableOpacity
        style={[
          styles.editBadge,
          {
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.canvas,
          },
        ]}
        onPress={onPressEdit}
        activeOpacity={0.8}>
        <EditIcon size={16} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    position: 'relative',
    marginVertical: 16,
  },
  avatarCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
  placeholderSilhouette: {
    fontSize: 64,
  },
  editBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 34,
    height: 34,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editPencil: {
    fontSize: 14,
  },
});

export default AvatarPicker;
