import { useRouter } from 'expo-router';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import { ExtraStyles } from '../styles/ExtraStyles';
import { COLORS, GlobalStyles } from '../styles/GlobalStyles';

type Item = {
  id: string;
  icon: string;
  name: string;
  description: string;
  price: number;
};

// Dữ liệu mẫu hiển thị trên trang chủ (sau này có thể thay bằng dữ liệu từ API)
const ITEMS: Item[] = [
  { id: '1', icon: '🎨', name: 'Canva Pro 1 tháng', description: 'Tài khoản Canva Pro dùng riêng, đầy đủ tính năng premium', price: 49000 },
  { id: '2', icon: '🖼️', name: 'Canva Pro 1 năm', description: 'Tài khoản Canva Pro, hiệu lực 12 tháng', price: 399000 },
  { id: '3', icon: '🤖', name: 'ChatGPT Plus 1 tháng', description: 'Tài khoản ChatGPT Plus, dùng ổn định', price: 250000 },
  { id: '4', icon: '🎬', name: 'CapCut Pro 1 tháng', description: 'Chỉnh sửa video không watermark', price: 79000 },
  { id: '5', icon: '📚', name: 'Bộ template Notion', description: 'Hơn 50 template quản lý công việc, học tập', price: 59000 },
  { id: '6', icon: '🛠️', name: 'Bộ công cụ thiết kế', description: 'Font, icon, mockup dùng cho dự án cá nhân', price: 129000 },
];

function formatPrice(value: number) {
  return `${value.toLocaleString('vi-VN')}đ`;
}

function ItemsSection() {
  return (
    <>
      <Text style={ExtraStyles.homeSectionTitle}>Sản phẩm nổi bật</Text>
      <View style={styles.grid}>
        {ITEMS.map((item) => (
          <Pressable
            key={item.id}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={() => Alert.alert(item.name, `${item.description}\n\nGiá: ${formatPrice(item.price)}`)}
          >
            <View style={styles.iconCircle}>
              <Text style={styles.icon}>{item.icon}</Text>
            </View>
            <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
            <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
            <Text style={styles.price}>{formatPrice(item.price)}</Text>
          </Pressable>
        ))}
      </View>
    </>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace('/auth/login');
  };

  if (isLoading) {
    return <SafeAreaView style={GlobalStyles.center}><ActivityIndicator size="large" color={COLORS.primary} /></SafeAreaView>;
  }

  if (!user) {
    return (
      <SafeAreaView style={GlobalStyles.screen} edges={['top', 'bottom']}>
        <ScrollView contentContainerStyle={GlobalStyles.authContainer} showsVerticalScrollIndicator={false}>
          <View style={GlobalStyles.logoArea}>
            <View style={GlobalStyles.cartCircle}><Text style={GlobalStyles.cartIcon}>🛒</Text></View>
            <Text style={GlobalStyles.logoText}>DIGITAL RESOURCES</Text>
            <Text style={GlobalStyles.logoSubText}>Kho tài nguyên số dành cho bạn</Text>
          </View>
          <View style={GlobalStyles.box}>
            <Text style={GlobalStyles.title}>Mọi tài nguyên, một nơi</Text>
            <Text style={GlobalStyles.subtitle}>
              Tool, tài khoản số, Canva Pro và nhiều sản phẩm hữu ích — nhanh, gọn và dễ sử dụng.
            </Text>
            <Pressable style={({ pressed }) => [GlobalStyles.button, pressed && GlobalStyles.buttonPressed]} onPress={() => router.push('/auth/login')}>
              <Text style={GlobalStyles.buttonText}>Đăng nhập</Text>
            </Pressable>
            <View style={{ height: 12 }} />
            <Pressable style={({ pressed }) => [GlobalStyles.buttonOutline, pressed && GlobalStyles.buttonOutlinePressed]} onPress={() => router.push('/auth/register')}>
              <Text style={GlobalStyles.buttonOutlineText}>Tạo tài khoản miễn phí</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={ExtraStyles.screen} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={[ExtraStyles.screenHeader, { borderBottomWidth: 0, paddingBottom: 6 }]}>
          <View style={GlobalStyles.productHeaderRow}>
            <View style={{ flex: 1 }}>
              <Text style={ExtraStyles.homeGreeting}>CHÀO MỪNG TRỞ LẠI</Text>
              <Text style={ExtraStyles.homeUserName}>{user.fullName}</Text>
            </View>
            <Pressable onPress={handleLogout} style={({ pressed }) => [GlobalStyles.logoutButton, pressed && GlobalStyles.logoutButtonPressed]}>
              <Text style={GlobalStyles.logoutText}>Đăng xuất</Text>
            </Pressable>
          </View>
        </View>

        <View style={ExtraStyles.homeHero}>
          <Text style={ExtraStyles.homeHeroEyebrow}>DIGITAL RESOURCES</Text>
          <Text style={ExtraStyles.homeHeroTitle}>Kho tài nguyên số của bạn</Text>
          <Text style={ExtraStyles.homeHeroText}>Khám phá một số sản phẩm nổi bật dành cho bạn.</Text>
        </View>

        <ItemsSection />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 14,
    gap: 12,
  },
  card: {
    width: '47.5%',
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardPressed: { opacity: 0.85 },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  icon: { fontSize: 24 },
  name: { fontSize: 14, fontWeight: '800', color: COLORS.textPrimary },
  desc: { fontSize: 11, color: COLORS.textMuted, marginTop: 4, minHeight: 28 },
  price: { fontSize: 15, fontWeight: '900', color: COLORS.primary, marginTop: 8 },
});