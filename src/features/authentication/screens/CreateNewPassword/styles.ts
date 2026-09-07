import { StyleSheet } from 'react-native';
import { fonts } from '../../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginRight: 8,
  },
  backArrow: {
    fontSize: 28,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: fonts.bold,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 32,
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  illustrationWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    marginVertical: 12,
  },
  form: {
    width: '100%',
    marginVertical: 8,
  },
  inputIcon: {
    fontSize: 18,
  },
  checkbox: {
    marginVertical: 14,
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 20,
  },
  continueButton: {
    width: '100%',
  },
});
