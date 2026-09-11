import { Dimensions, StyleSheet } from 'react-native';
import { fonts } from '../../../../theme';

const { width: SCREEN_W } = Dimensions.get('window');

export const styles = StyleSheet.create({
  /* ===== Root ===== */
  container: {
    flex: 1,
  },

  /* ===== Header action buttons ===== */
  actionIconBtn: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ===== Body ===== */
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingBottom: 40,
  },

  /* ===== Avatar Area ===== */
  avatarArea: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  robotImage: {
    width: 220,
    height: 260,
  },

  /* ===== Text Area ===== */
  textArea: {
    alignItems: 'center',
    marginBottom: 36,
  },
  greeting: {
    fontSize: 26,
    fontFamily: fonts.bold,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  tagline: {
    fontSize: 18,
    fontFamily: fonts.bold,
    fontWeight: '700',
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: fonts.regular,
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
  },

  /* ===== CTA Button ===== */
  ctaButton: {
    width: SCREEN_W - 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00D2B4',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 6,
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fonts.bold,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
