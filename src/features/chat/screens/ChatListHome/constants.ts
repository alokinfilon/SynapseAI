export interface ChatThreadItem {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  unreadCount?: number;
  expression?: 'smile' | 'heart' | 'sad' | 'star' | 'thinking' | 'cross';
  isEnded?: boolean;
}

export const CHAT_LIST_TEXTS = {
  headerTitle: 'Chats',
  searchPlaceholder: 'Search chats...',
  activeSectionTitle: 'Active Chats',
  endedSectionTitle: 'Ended Sessions',
  seeAllLink: 'See All',
  editAction: 'Edit',
  moreAction: '•••',
};

export const MOCK_CHAT_THREADS: ChatThreadItem[] = [
  {
    id: '1',
    title: 'Quantum Computing Intro',
    subtitle: 'Quantum bits use superposition...',
    time: '10:42 AM',
    unreadCount: 2,
    expression: 'smile',
  },
  {
    id: '2',
    title: 'React Native Best Practices',
    subtitle: 'Use React.memo for list items...',
    time: 'Yesterday',
    unreadCount: 0,
    expression: 'heart',
  },
  {
    id: '3',
    title: 'History of AI',
    subtitle: 'Ended on 04/09/2026',
    time: '04/09',
    isEnded: true,
    expression: 'sad',
  },
];
