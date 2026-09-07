import { StyleSheet } from 'react-native';
import { fonts } from '../../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
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
  backArrow: {
    fontSize: 28,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 32,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 34,
    fontFamily: fonts.bold,
    marginBottom: 28,
    lineHeight: 44,
  },
  form: {
    width: '100%',
  },
  inputIcon: {
    fontSize: 18,
  },
  checkbox: {
    marginVertical: 14,
  },
  signUpButton: {
    marginTop: 8,
  },
  divider: {
    marginVertical: 24,
  },
  socialRow: {
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  footerText: {},
  signInLink: {
    fontFamily: fonts.bold,
  },
});
