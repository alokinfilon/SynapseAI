import { StyleSheet } from 'react-native';
import { fonts } from '../../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerNav: {
    height: 48,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  illustrationWrapper: {
    marginVertical: 8,
  },
  title: {
    fontSize: 34,
    fontFamily: fonts.bold,
    marginBottom: 20,
    textAlign: 'center',
  },
  socialStack: {
    width: '100%',
    gap: 12,
  },
  socialButton: {},
  divider: {
    marginVertical: 14,
  },
  signInButton: {
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  footerText: {},
  signUpLink: {
    fontFamily: fonts.bold,
  },
});
