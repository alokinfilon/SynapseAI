import { TextStyle } from 'react-native';
import { fonts } from './fonts';

export const typography: Record<string, TextStyle> = {
  displayXl: {
    fontSize: 32,
    fontFamily: fonts.bold,
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  displayLg: {
    fontSize: 26,
    fontFamily: fonts.bold,
    lineHeight: 32,
    letterSpacing: -0.4,
  },
  headingMd: {
    fontSize: 20,
    fontFamily: fonts.semiBold,
    lineHeight: 26,
    letterSpacing: -0.2,
  },
  headingSm: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    lineHeight: 22,
  },
  bodyLg: {
    fontSize: 16,
    fontFamily: fonts.regular,
    lineHeight: 24,
  },
  bodyMd: {
    fontSize: 14,
    fontFamily: fonts.regular,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontFamily: fonts.medium,
    lineHeight: 16,
  },
  micro: {
    fontSize: 10,
    fontFamily: fonts.medium,
    lineHeight: 14,
  },
};

export type TypographyToken = keyof typeof typography;
