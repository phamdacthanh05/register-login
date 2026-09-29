import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from './GlobalStyles';

export const ExtraStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  screenHeader: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  screenHeaderTitle: { fontSize: 24, fontWeight: '900', color: COLORS.textPrimary },

  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabButton: { flex: 1, paddingVertical: 11, borderRadius: 12, alignItems: 'center' },
  tabButtonActive: { backgroundColor: COLORS.primary },
  tabButtonText: { fontSize: 12, fontWeight: '800', color: COLORS.textSecondary },
  tabButtonTextActive: { color: COLORS.white },

  infoCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 18,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoRowLast: { borderBottomWidth: 0 },
  infoLabel: { color: COLORS.textSecondary, fontSize: SIZES.fontSmall },
  infoValue: {
    color: COLORS.textPrimary,
    fontSize: SIZES.fontSmall,
    fontWeight: '800',
    maxWidth: '65%',
    textAlign: 'right',
  },
  homeGreeting: { fontSize: 13, color: COLORS.textSecondary, fontWeight: '600' },
  homeUserName: { fontSize: 24, fontWeight: '900', color: COLORS.textPrimary, marginTop: 3 },
  menuGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, paddingTop: 18, gap: 12 },
  menuItem: {
    width: '47.5%', backgroundColor: COLORS.surface, borderRadius: 20, paddingVertical: 20,
    alignItems: 'center', borderWidth: 1, borderColor: COLORS.border,
    shadowColor: COLORS.shadow, shadowOpacity: 0.045, shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 }, elevation: 2,
  },
  menuItemPressed: { opacity: 0.86, transform: [{ scale: 0.985 }] },
  menuIconCircle: {
    width: 54, height: 54, borderRadius: 18, backgroundColor: COLORS.primarySoft,
    alignItems: 'center', justifyContent: 'center', marginBottom: 10,
  },
  menuIcon: { fontSize: 24 },
  menuLabel: { fontSize: SIZES.fontSmall, fontWeight: '800', color: COLORS.textPrimary },

  homeHero: {
    marginHorizontal: 16, marginTop: 16, padding: 22, borderRadius: 24,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary, shadowOpacity: 0.2, shadowRadius: 18,
    shadowOffset: { width: 0, height: 9 }, elevation: 5,
  },
  homeHeroEyebrow: { color: COLORS.primaryLight, fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  homeHeroTitle: { color: COLORS.white, fontSize: 25, lineHeight: 32, fontWeight: '900', marginTop: 6 },
  homeHeroText: { color: '#DCE9FF', fontSize: 13, lineHeight: 20, marginTop: 7, maxWidth: '90%' },
  homeSectionTitle: { marginHorizontal: 16, marginTop: 22, fontSize: 17, fontWeight: '900', color: COLORS.textPrimary },
});
