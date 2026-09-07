import React, { useState } from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { SendArrowIcon } from '../../../../assets/svg';
import { useTheme } from '../../../hooks';

export interface ChatInputBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onSend?: (text: string) => void;
  suggestions?: string[];
  onSelectSuggestion?: (suggestion: string) => void;
  placeholder?: string;
  style?: ViewStyle;
}

export const ChatInputBar: React.FC<ChatInputBarProps> = ({
  value: externalValue,
  onChangeText: externalOnChangeText,
  onSend,
  suggestions,
  onSelectSuggestion,
  placeholder = 'Type a message to Bobo ...',
  style,
}) => {
  const theme = useTheme();
  const [internalValue, setInternalValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const value = externalValue !== undefined ? externalValue : internalValue;
  const hasText = value.trim().length > 0;

  const handleChangeText = (text: string) => {
    if (externalOnChangeText) {
      externalOnChangeText(text);
    } else {
      setInternalValue(text);
    }
  };

  const handleSend = () => {
    if (value.trim()) {
      Keyboard.dismiss();
      onSend?.(value);
      if (externalValue === undefined) {
        setInternalValue('');
      }
    }
  };

  return (
    <View style={styles.wrapper}>
      {/* Suggestions Row if provided */}
      {suggestions && suggestions.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.suggestionsContainer}>
          {suggestions.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.suggestionChip,
                {
                  backgroundColor: theme.isDarkMode ? '#262A34' : '#F1F5F9',
                  borderColor: theme.isDarkMode ? '#35383F' : '#E2E8F0',
                },
              ]}
              onPress={() => {
                Keyboard.dismiss();
                if (onSelectSuggestion) {
                  onSelectSuggestion(item);
                } else {
                  handleChangeText(item);
                }
              }}
              activeOpacity={0.75}>
              <Text
                style={[
                  styles.suggestionText,
                  theme.typography.bodySm,
                  { color: theme.colors.primary },
                ]}>
                ✨ {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : null}

      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.canvas,
            borderColor: theme.isDarkMode ? '#262A34' : '#F0F3F8',
          },
          style,
        ]}>
        {/* Text Input Container */}
        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: theme.isDarkMode ? '#1F222A' : '#FAFAFA',
              borderColor: isFocused
                ? theme.colors.primary
                : (theme.isDarkMode ? '#35383F' : '#E8ECF4'),
              borderRadius: theme.radius.card,
            },
          ]}>
          <TextInput
            style={[
              styles.input,
              theme.typography.bodyMd,
              { color: theme.colors.textPrimary },
            ]}
            value={value}
            onChangeText={handleChangeText}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.textMuted}
            onSubmitEditing={handleSend}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            returnKeyType="send"
          />
        </View>

        {/* Circular Send Button */}
        <TouchableOpacity
          style={[
            styles.sendButton,
            {
              backgroundColor: hasText
                ? theme.colors.primary
                : (theme.isDarkMode ? '#262A34' : '#CBD5E1'),
              opacity: hasText ? 1 : 0.65,
            },
            hasText ? theme.shadows.sm : undefined,
          ]}
          onPress={handleSend}
          disabled={!hasText}
          activeOpacity={0.8}>
          <SendArrowIcon size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  suggestionsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  suggestionChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  suggestionText: {
    fontWeight: '600',
    fontSize: 12,
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  inputContainer: {
    flex: 1,
    height: 52,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  input: {
    height: '100%',
    paddingVertical: 0,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatInputBar;
