export const fonts = {
  thin: 'Inter-Thin',
  thinItalic: 'Inter-ThinItalic',
  extraLight: 'Inter-ExtraLight',
  extraLightItalic: 'Inter-ExtraLightItalic',
  light: 'Inter-Light',
  lightItalic: 'Inter-LightItalic',
  regular: 'Inter-Regular',
  italic: 'Inter-Italic',
  medium: 'Inter-Medium',
  mediumItalic: 'Inter-MediumItalic',
  semiBold: 'Inter-SemiBold',
  semiBoldItalic: 'Inter-SemiBoldItalic',
  bold: 'Inter-Bold',
  boldItalic: 'Inter-BoldItalic',
  extraBold: 'Inter-ExtraBold',
  extraBoldItalic: 'Inter-ExtraBoldItalic',
  black: 'Inter-Black',
  blackItalic: 'Inter-BlackItalic',
} as const;

export type FontFamily = typeof fonts[keyof typeof fonts];
