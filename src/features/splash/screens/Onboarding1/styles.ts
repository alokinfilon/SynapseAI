import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  illustrationWrapper: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    lineHeight: 38,
    fontWeight: '700',
  },
  bottomSection: {
    paddingBottom: 24,
    alignItems: 'center',
  },
  pagination: {
    marginBottom: 32,
  },
  button: {
    width: '100%',
  },
});
