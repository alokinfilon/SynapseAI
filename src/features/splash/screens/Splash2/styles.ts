import { StyleSheet } from 'react-native';
import { SPLASH2_BACKGROUND } from './constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SPLASH2_BACKGROUND,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
  },
  illustrationWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderWrapper: {
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
