import { lightColors, darkColors, ThemeColors } from './colors';
import { typography } from './typography';

export * from './colors';
export * from './typography';
export * from './fonts';

export interface Theme {
  colors: ThemeColors;
  typography: typeof typography;
  isDarkMode: boolean;
}

export const lightTheme: Theme = {
  colors: lightColors,
  typography,
  isDarkMode: false,
};

export const darkTheme: Theme = {
  colors: darkColors,
  typography,
  isDarkMode: true,
};
