import { StyleSheet } from 'react-native';
import { fonts } from '../../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  /* ===== Header child styles ===== */
  backButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: fonts.bold,
    fontWeight: '800',
  },
  searchBarContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
  },
});
