import { RobotExpression } from '../../../../shared/components';

export interface ExpressionItem {
  id: RobotExpression;
  label: string;
  icon: string;
}

export interface GlowColorItem {
  id: string;
  color: string;
  label: string;
}

export const EXPRESSIONS_LIST: ExpressionItem[] = [
  { id: 'smile', label: 'Happy', icon: '😄' },
  { id: 'heart', label: 'Love', icon: '😍' },
  { id: 'sad', label: 'Sad', icon: '🥺' },
  { id: 'star', label: 'Star', icon: '🤩' },
  { id: 'thinking', label: 'Think', icon: '🧐' },
];

export const GLOW_COLORS_LIST: GlowColorItem[] = [
  { id: 'cyan', color: '#00D2B4', label: 'Cyan' },
  { id: 'pink', color: '#FF4D79', label: 'Pink' },
  { id: 'gold', color: '#FFD700', label: 'Gold' },
  { id: 'blue', color: '#539DF3', label: 'Blue' },
  { id: 'purple', color: '#9D50BB', label: 'Purple' },
];

export const SIZES_LIST = [64, 100, 140, 180];
