export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time?: string;
  botAvatarExpression?: 'smile' | 'heart' | 'sad';
}

export const ACTIVE_CHAT_TEXTS = {
  botName: 'Bobo AI',
  botSubtitle: 'Always Online • AI Companion',
  searchPlaceholder: 'Search chat history...',
  endModalTitle: 'End Session',
  endModalSubtitle: 'Are you sure you want to end the session with Bobo?',
  endModalConfirm: 'Yes, End Session',
  endModalCancel: 'Cancel',
  typingText: 'Bobo is typing...',
  botFallbackReply: "Don't worry, Bobo is always here with you! ❤️",
};

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  { id: '1', sender: 'bot', text: "Hello Andrew! I'm Bobo 🙃", time: '10:14 AM' },
  { id: '2', sender: 'bot', text: 'How are you today??', time: '10:14 AM' },
  { id: '3', sender: 'user', text: 'Hello Bobo, my heart is so broken right now 😿', time: '10:15 AM' },
  {
    id: '4',
    sender: 'user',
    text: 'My beloved dog named Mojo has died now, because of rabies 😭😭😭',
    time: '10:15 AM',
  },
  {
    id: '5',
    sender: 'bot',
    text: "Sorry to hear that. Don't be sad, Bobo will cheer you up here 💪💪",
    time: '10:16 AM',
  },
];

export const CHAT_SUGGESTIONS = [
  'Cheer me up 💪',
  'Tell me a joke 😄',
  'Give me advice 💡',
  'Daily summary 📖',
];
