import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { EyeIcon, HideEyeIcon } from '../../../../assets/svg';
import { useTheme } from '../../../hooks';

export interface InputProps extends TextInputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
  error?: string;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  leftIcon,
  rightIcon,
  isPassword = false,
  error,
  containerStyle,
  onFocus,
  onBlur,
  ...rest
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const activeTealColor = theme.colors.primary || '#10D0A7';

  const getBorderColor = () => {
    if (error) {
      return theme.colors.statusError;
    }
    if (isFocused) {
      return activeTealColor;
    }
    return theme.isDarkMode ? '#262A34' : '#F5F6F8';
  };

  const getBackgroundColor = () => {
    if (isFocused) {
      return theme.isDarkMode ? 'rgba(16, 208, 167, 0.08)' : 'rgba(16, 208, 167, 0.06)';
    }
    return theme.isDarkMode ? '#1F222A' : '#FAFAFA';
  };

  const renderLeftIcon = () => {
    if (!leftIcon) return null;
    if (React.isValidElement(leftIcon)) {
      const iconColor = isFocused ? activeTealColor : (leftIcon.props as any)?.color || theme.colors.textMuted;
      return (
        <View style={styles.leftIconWrapper}>
          {React.cloneElement(leftIcon as React.ReactElement<any>, { color: iconColor })}
        </View>
      );
    }
    return <View style={styles.leftIconWrapper}>{leftIcon}</View>;
  };

  const renderRightIcon = () => {
    if (isPassword) {
      const eyeColor = isFocused ? activeTealColor : theme.colors.textSecondary;
      return (
        <TouchableOpacity
          style={styles.rightIconWrapper}
          onPress={() => setShowPassword(!showPassword)}
          activeOpacity={0.7}>
          {showPassword ? (
            <EyeIcon size={20} color={eyeColor} />
          ) : (
            <HideEyeIcon size={20} color={eyeColor} />
          )}
        </TouchableOpacity>
      );
    }
    if (rightIcon) {
      if (React.isValidElement(rightIcon)) {
        const iconColor = isFocused ? activeTealColor : (rightIcon.props as any)?.color || theme.colors.textMuted;
        return (
          <View style={styles.rightIconWrapper}>
            {React.cloneElement(rightIcon as React.ReactElement<any>, { color: iconColor })}
          </View>
        );
      }
      return <View style={styles.rightIconWrapper}>{rightIcon}</View>;
    }
    return null;
  };

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: getBackgroundColor(),
            borderColor: getBorderColor(),
            borderRadius: theme.radius.card,
          },
        ]}>
        {renderLeftIcon()}

        <TextInput
          style={[
            styles.input,
            theme.typography.bodyLg,
            { color: theme.colors.textPrimary },
          ]}
          placeholderTextColor={theme.colors.textMuted}
          secureTextEntry={isPassword && !showPassword}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          {...rest}
        />

        {renderRightIcon()}
      </View>

      {error ? (
        <Text style={[styles.errorText, { color: theme.colors.statusError }]}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginVertical: 6,
  },
  inputContainer: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderWidth: 1.5,
  },
  leftIconWrapper: {
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIconWrapper: {
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    height: '100%',
    paddingVertical: 0,
    textAlignVertical: 'center',
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default Input;
