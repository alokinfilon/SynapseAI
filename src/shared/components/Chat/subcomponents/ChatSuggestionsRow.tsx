import React from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../../../hooks';

export interface ChatSuggestionsRowProps {
  suggestions?: string[];
  onSelectSuggestion?: (suggestion: string) => void;
  onSelectDefaultSuggestion?: (suggestion: string) => void;
  onCloseAttachments?: () => void;
}

export const ChatSuggestionsRow: React.FC<ChatSuggestionsRowProps> = ({
  suggestions,
  onSelectSuggestion,
  onSelectDefaultSuggestion,
  onCloseAttachments,
}) => {
  const theme = useTheme();

  if (!suggestions || suggestions.length === 0) return null;

  return (
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
            onCloseAttachments?.();
            if (onSelectSuggestion) {
              onSelectSuggestion(item);
            } else if (onSelectDefaultSuggestion) {
              onSelectDefaultSuggestion(item);
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
  );
};

const styles = StyleSheet.create({
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
});

export default ChatSuggestionsRow;
