import { StyleSheet } from 'react-native';
import { fonts } from '../../../../theme';

export const styles = StyleSheet.create({
  container: {
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginVertical: 16,
  },
  resendText: {
    textAlign: 'center',
    marginVertical: 12,
  },
  buttonWrapper: {
    width: '100%',
    marginVertical: 12,
  },
  verifyButton: {
    width: '100%',
  },
});
