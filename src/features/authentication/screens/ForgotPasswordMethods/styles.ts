import { StyleSheet } from 'react-native';
import { fonts } from '../../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerNav: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: fonts.bold,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  illustrationWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  instructionText: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 8,
  },
  cardsStack: {
    width: '100%',
    gap: 12,
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 16,
  },
  continueButton: {
    width: '100%',
  },
});
