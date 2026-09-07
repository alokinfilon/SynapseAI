import { StyleSheet } from 'react-native';
import { fonts } from '../../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: fonts.bold,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 32,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  avatarWrapper: {
    alignItems: 'center',
    marginVertical: 16,
  },
  form: {
    width: '100%',
  },
  input: {
    marginBottom: 16,
  },
  continueButton: {
    width: '100%',
    marginTop: 16,
  },
});
