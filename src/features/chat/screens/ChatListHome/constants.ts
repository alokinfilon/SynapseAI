export interface ChatThreadItem {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  unreadCount?: number;
  expression?: 'normal' | 'smile' | 'heart' | 'sad' | 'star' | 'thinking' | 'cross';
  isEnded?: boolean;
}

export const CHAT_LIST_TEXTS = {
  headerTitle: 'Lumi',
  searchPlaceholder: 'Search chats...',
  activeSectionTitle: 'Active Chats',
  endedSectionTitle: 'Ended Chats',
  seeAllLink: 'See All',
  startAnotherButton: 'Start Another Chat with Lumi',
  editAction: 'Edit',
  moreAction: '•••',
};

export const MOCK_CHAT_THREADS: ChatThreadItem[] = [
  {
    id: '1',
    title: 'Lumi',
    subtitle: "Hello Andrew! I'm Lumi 👋 How are you today??",
    time: 'Now',
    unreadCount: 1,
    expression: 'normal',
  },
  {
    id: '2',
    title: 'Lumi',
    subtitle: "I'm good too, I'm reading a book right now 📖🤓",
    time: 'Dec 19',
    isEnded: true,
    expression: 'heart',
  },
  {
    id: '3',
    title: 'Lumi',
    subtitle: 'Lumi is very sad today because of an accident',
    time: 'Dec 18',
    isEnded: true,
    expression: 'cross',
  },
  {
    id: '4',
    title: 'Lumi',
    subtitle: "Hi, how are you today? I'm ready to accompany your day!",
    time: 'Dec 18',
    isEnded: true,
    expression: 'star',
  },
];
