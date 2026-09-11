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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 0,
    paddingBottom: 24,
  },
  brandHero: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -32,
    marginBottom: -16,
  },
  headingWrapper: {
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    lineHeight: 38,
    fontFamily: fonts.bold,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
  form: {
    width: '100%',
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  checkbox: {},
  forgotPasswordText: {
    fontFamily: fonts.bold,
    fontSize: 14,
  },
  signInButton: {
    marginTop: 4,
    width: '100%',
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
  footerText: {
    fontSize: 14,
  },
  signUpLink: {
    fontFamily: fonts.bold,
    fontSize: 14,
    marginLeft: 4,
  },
});
