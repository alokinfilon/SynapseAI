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
    height: 36,
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
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 0,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  brandHero: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -32,
    marginBottom: -16,
  },
  title: {
    fontSize: 32,
    lineHeight: 38,
    fontFamily: fonts.bold,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 10,
    marginTop: 2,
  },
  form: {
    width: '100%',
  },
  inputIcon: {
    fontSize: 18,
  },
  checkbox: {
    marginVertical: 8,
  },
  signUpButton: {
    marginTop: 4,
  },
  divider: {
    marginVertical: 12,
  },
  socialRow: {
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  footerText: {},
  signInLink: {
    fontFamily: fonts.bold,
  },
});
