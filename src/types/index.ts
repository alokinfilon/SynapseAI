export interface UserProfile {
  id: string;
  fullName: string;
  nickname?: string;
  email: string;
  phoneNumber?: string;
  avatarUrl?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  attachments?: string[];
}

export interface ChatThread {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  ended?: boolean;
}

export interface RobotPersonality {
  name: string;
  tone: 'friendly' | 'professional' | 'concise' | 'creative';
  avatarStyle: string;
  colorScheme: string;
}
