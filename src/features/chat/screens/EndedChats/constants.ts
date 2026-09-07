import { RobotExpression } from '../../../../shared/components';

export interface EndedChatItem {
  id: string;
  title: string;
  subtitle: string;
  expression: RobotExpression;
  isSwiped?: boolean;
}

export const ENDED_CHATS_TEXTS = {
  headerTitle: 'Ended Chats',
  deleteModalTitle: 'Delete Chat?',
  deleteModalSubtitle: 'Are you sure you want to delete this ended chat?',
  deleteModalConfirm: 'Yes, Delete',
  deleteModalCancel: 'Cancel',
};

export const INITIAL_ENDED_CHATS: EndedChatItem[] = [
  {
    id: '1',
    title: 'Bobo - Dec 19, 2024',
    subtitle: "I'm good too, I'm reading a book right now 😁😁",
    expression: 'heart',
  },
  {
    id: '2',
    title: 'Bobo - Dec 18, 2024',
    subtitle: 'Bobo is very sad today because of an accident',
    expression: 'sad',
    isSwiped: true,
  },
  {
    id: '3',
    title: 'Bobo - Dec 18, 2024',
    subtitle: "Hi, how are you today? I'm ready to accompany your day!",
    expression: 'star',
  },
  {
    id: '4',
    title: 'Bobo - Dec 16, 2024',
    subtitle: 'Bobo is learning camera, do you want to learn with me? 🧐',
    expression: 'smile',
  },
  {
    id: '5',
    title: 'Bobo - Dec 15, 2024',
    subtitle: 'Hi Andrew! Bobo is here! Bobo is very tired today.',
    expression: 'smile',
  },
];
