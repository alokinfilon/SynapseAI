import { StyleSheet } from 'react-native';
import { fonts } from '../../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerAvatarWrapper: {
    position: 'relative',
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  rightActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 28,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  illustrationWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  greetingTitle: {
    fontSize: 22,
    fontFamily: fonts.bold,
    marginTop: 20,
    textAlign: 'center',
  },
  greetingSubtitle: {
    fontSize: 14,
    fontFamily: fonts.regular,
    marginTop: 8,
    textAlign: 'center',
  },
  button: {
    width: '100%',
  },
  actionTextEdit: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
  },
  actionTextMore: {
    fontFamily: fonts.bold,
    fontSize: 18,
  },
});
