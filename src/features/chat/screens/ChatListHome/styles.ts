import { StyleSheet } from 'react-native';
import { fonts } from '../../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rightActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 32,
  },
  searchInput: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  seeAllLink: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
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
