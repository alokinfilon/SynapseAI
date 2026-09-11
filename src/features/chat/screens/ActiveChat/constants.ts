export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  imageUrl?: string;
  images?: string[];
  time?: string;
  botAvatarExpression?: 'smile' | 'heart' | 'sad';
}

export interface TopicSuggestion {
  id: string;
  iconType: 'light' | 'cpu' | 'computer' | 'pen';
  title: string;
  subtitle: string;
  prompt: string;
}

export const ACTIVE_CHAT_TEXTS = {
  botName: 'Lumi AI',
  botSubtitle: 'Always Online • AI Companion',
  searchPlaceholder: 'Search chat history...',
  endModalTitle: 'End Session',
  endModalSubtitle: 'Are you sure you want to end the session with Lumi?',
  endModalConfirm: 'Yes, End Session',
  endModalCancel: 'Cancel',
  typingText: 'Lumi is typing...',
  botFallbackReply: "Don't worry, Lumi is always here with you! ❤️",
  newChatTitle: 'How can Lumi help you today?',
  newChatSubtitle: 'Select a topic below or type a message to start',
};

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  { id: '1', sender: 'bot', text: "Hello Andrew! I'm Lumi 🙃", time: '10:14 AM' },
  { id: '2', sender: 'bot', text: 'How are you today??', time: '10:14 AM' },
  { id: '3', sender: 'user', text: 'Hello Lumi, my heart is so broken right now 😿', time: '10:15 AM' },
  {
    id: '4',
    sender: 'user',
    text: 'My beloved dog named Mojo has died now, because of rabies 😭😭😭',
    time: '10:15 AM',
  },
  {
    id: '5',
    sender: 'bot',
    text: "Sorry to hear that. Don't be sad, Lumi will cheer you up here 💪💪",
    time: '10:16 AM',
  },
];

export const CHAT_SUGGESTIONS = [
  'Cheer me up 💪',
  'Tell me a joke 😄',
  'Give me advice 💡',
  'Daily summary 📖',
];

export const NEW_CHAT_TOPICS: TopicSuggestion[] = [
  {
    id: '1',
    iconType: 'light',
    title: 'Idea Generation',
    subtitle: 'Generate innovative concepts & tech ideas',
    prompt: 'Give me 5 innovative ideas for a new tech startup.',
  },
  {
    id: '2',
    iconType: 'cpu',
    title: 'Brainstorming',
    subtitle: 'Brainstorm creative solutions to problems',
    prompt: "Let's brainstorm creative solutions to improve daily productivity.",
  },
  {
    id: '3',
    iconType: 'computer',
    title: 'Code & Tech',
    subtitle: 'Get help with code, architecture & bugs',
    prompt: 'Explain how React Native re-renders components efficiently.',
  },
  {
    id: '4',
    iconType: 'pen',
    title: 'Writing & Content',
    subtitle: 'Draft emails, blogs, essays & stories',
    prompt: 'Help me draft an engaging introduction for my blog post.',
  },
];
