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
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 32,
  },
  brandHero: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  headingWrapper: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontFamily: fonts.bold,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
  },
  form: {
    width: '100%',
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  checkbox: {},
  forgotPasswordText: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
  },
  signInButton: {
    marginTop: 10,
    width: '100%',
  },
  divider: {
    marginVertical: 20,
  },
  socialRow: {
    marginBottom: 16,
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
