import { StyleSheet } from 'react-native';
import { fonts } from '../../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  /* ===== Header child styles ===== */
  backButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    marginRight: 4,
  },
  avatarHeaderWrapper: {
    position: 'relative',
    marginRight: 5,
  },
  onlineStatusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  headerTitleColumn: {
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: fonts.bold,
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 24,
  },
  illustrationWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  messagesContainer: {
    marginTop: 6,
  },
  typingBubbleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 8,
    alignSelf: 'flex-start',
  },
  typingBubble: {
    borderRadius: 18,
    borderTopLeftRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  loaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 8,
    paddingLeft: 4,
  },
  thinkingText: {
    fontSize: 12,
    fontStyle: 'italic',
  },

  /* Empty State / New Chat Topic Selection */
  emptyStateContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  heroRobotWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  emptyTitle: {
    fontSize: 22,
    fontFamily: fonts.bold,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 2,
  },
  emptySubtitle: {
    fontSize: 13,
    fontFamily: fonts.regular,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  topicsGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  topicCard: {
    width: '48.5%',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  topicIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 210, 180, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  topicIcon: {
    fontSize: 18,
  },
  topicTextWrapper: {
    width: '100%',
  },
  topicTitle: {
    fontSize: 14,
    fontFamily: fonts.bold,
    fontWeight: '700',
  },
  topicSubtitle: {
    fontSize: 11,
    fontFamily: fonts.regular,
    marginTop: 2,
    lineHeight: 14,
  },

  /* ===== Context Banner & Long Press Action Sheet ===== */
  contextBannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  modalOverlayBg: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'flex-end',
  },
  actionSheetContainer: {
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
  },
  actionSheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
    gap: 10,
  },
  actionSheetTag: {
    width: 4,
    height: 24,
    borderRadius: 2,
  },
  actionSheetTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  actionOptionsList: {
    width: '100%',
    gap: 10,
    marginBottom: 16,
  },
  actionOptionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    gap: 12,
  },
  actionOptionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  actionCancelBtn: {
    width: '100%',
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionCancelText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
