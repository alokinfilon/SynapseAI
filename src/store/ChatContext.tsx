import React, { createContext, useContext, useState } from 'react';
import { ChatMessage, ChatThread, RobotPersonality } from '../types/index';

interface ChatContextType {
  threads: ChatThread[];
  activeThreadId: string | null;
  messages: Record<string, ChatMessage[]>;
  robotPersonality: RobotPersonality;
  setActiveThread: (id: string | null) => void;
  sendMessage: (threadId: string, text: string) => void;
  updateRobotPersonality: (updates: Partial<RobotPersonality>) => void;
}

const initialThreads: ChatThread[] = [
  {
    id: 't_1',
    title: 'Quantum Physics Discussion',
    lastMessage: 'Here is a simple summary of entanglement...',
    timestamp: '10:42 AM',
    unreadCount: 0,
  },
  {
    id: 't_2',
    title: 'React Native Optimization',
    lastMessage: 'Use React.memo and useCallback for heavy renders.',
    timestamp: 'Yesterday',
    unreadCount: 2,
  },
];

const initialRobot: RobotPersonality = {
  name: 'Synapse Bot',
  tone: 'friendly',
  avatarStyle: 'default',
  colorScheme: '#1A64F0',
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [threads, setThreads] = useState<ChatThread[]>(initialThreads);
  const [activeThreadId, setActiveThreadId] = useState<string | null>('t_1');
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({
    t_1: [
      {
        id: 'm_1',
        sender: 'bot',
        text: 'Hello! How can I assist you with Synapse today?',
        timestamp: '10:40 AM',
      },
    ],
  });
  const [robotPersonality, setRobotPersonality] = useState<RobotPersonality>(initialRobot);

  const setActiveThread = (id: string | null) => setActiveThreadId(id);

  const sendMessage = (threadId: string, text: string) => {
    const newMsg: ChatMessage = {
      id: `m_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => ({
      ...prev,
      [threadId]: [...(prev[threadId] || []), newMsg],
    }));

    setThreads(prev =>
      prev.map(t => (t.id === threadId ? { ...t, lastMessage: text, timestamp: 'Just now' } : t)),
    );
  };

  const updateRobotPersonality = (updates: Partial<RobotPersonality>) => {
    setRobotPersonality((prev: RobotPersonality) => ({ ...prev, ...updates }));
  };

  return (
    <ChatContext.Provider
      value={{
        threads,
        activeThreadId,
        messages,
        robotPersonality,
        setActiveThread,
        sendMessage,
        updateRobotPersonality,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
