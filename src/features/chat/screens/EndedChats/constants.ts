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
    title: 'Lumi ',
    subtitle: "I'm good too, I'm reading a book right now 😁😁",
    expression: 'heart',
  },
  {
    id: '2',
    title: 'Lumi ',
    subtitle: 'Lumi is very sad today because of an accident',
    expression: 'sad',
    isSwiped: true,
  },
  {
    id: '3',
    title: 'Lumi ',
    subtitle: "Hi, how are you today? I'm ready to accompany your day!",
    expression: 'star',
  },
  {
    id: '4',
    title: 'Lumi ',
    subtitle: 'Lumi is learning camera, do you want to learn with me? 🧐',
    expression: 'smile',
  },
  {
    id: '5',
    title: 'Lumi ',
    subtitle: 'Hi Andrew! Lumi is here! Lumi is very tired today.',
    expression: 'smile',
  },
];
