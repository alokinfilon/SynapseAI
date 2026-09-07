import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  previewStage: {
    width: '100%',
    padding: 20,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  stageHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  stageBadge: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  stageSub: {
    fontSize: 12,
    fontWeight: '500',
  },
  robotCanvas: {
    minHeight: 180,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  controlGroup: {
    marginBottom: 20,
  },
  groupTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  tabRow: {
    flexDirection: 'row',
    gap: 12,
  },
  tabButton: {
    flex: 1,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  tabText: {
    fontWeight: '600',
    fontSize: 14,
  },
  expressionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.5,
    gap: 6,
  },
  chipEmoji: {
    fontSize: 16,
  },
  chipLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  colorDot: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  colorDotSelected: {
    borderWidth: 3.5,
    borderColor: '#FFFFFF',
    transform: [{ scale: 1.15 }],
  },
  sizeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  sizeChip: {
    flex: 1,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  discussionBox: {
    padding: 16,
    borderRadius: 16,
    marginVertical: 16,
  },
  discussionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
  },
  discussionBody: {
    fontSize: 13,
    lineHeight: 19,
  },
  saveContainer: {
    marginTop: 8,
  },
  saveButton: {
    width: '100%',
  },
});
