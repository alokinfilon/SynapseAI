import { StyleSheet } from 'react-native';
import { fonts } from '../../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  /* ===== Header action buttons ===== */
  actionIconBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 100,
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
    fontWeight: '700',
  },
  seeAllLink: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
  },
  fabButton: {
    position: 'absolute',
    bottom: 28,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#00D2B4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
  modalContent: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: fonts.bold,
    fontWeight: '700',
    marginTop: 14,
    marginBottom: 6,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 13,
    fontFamily: fonts.medium,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  editInput: {
    width: '100%',
    marginBottom: 20,
  },
  modalButtonsRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  optionsList: {
    width: '100%',
    marginTop: 12,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginVertical: 4,
    gap: 14,
  },
  optionIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    fontWeight: '600',
  },
});
