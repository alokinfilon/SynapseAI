import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 32,
  },
  textContainer: {
    width: '100%',
    minHeight: 140,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  slideView: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    textAlign: 'center',
    fontSize: 28,
    lineHeight: 38,
    fontWeight: '700',
  },
  footerSection: {
    paddingHorizontal: 24,
    gap: 20,
    alignItems: 'center',
  },
  pagination: {
    marginBottom: 4,
  },
  button: {
    width: '100%',
  },
});


