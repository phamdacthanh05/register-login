import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { COLORS, GlobalStyles } from '../../styles/GlobalStyles';

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleRegister = async () => {
    const normalizedName = fullName.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedName || !normalizedEmail || !password || !confirm) {
      Alert.alert('Thiếu thông tin', 'Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      Alert.alert('Email không hợp lệ', 'Vui lòng nhập một địa chỉ email hợp lệ.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Mật khẩu quá ngắn', 'Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    if (password !== confirm) {
      Alert.alert('Mật khẩu không khớp', 'Vui lòng kiểm tra lại mật khẩu xác nhận.');
      return;
    }

    setLoading(true);
    try {
      await register(normalizedName, normalizedEmail, password);
      router.replace('/');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Đăng ký thất bại.';
      Alert.alert('Đăng ký thất bại', message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (name: string) => [
    GlobalStyles.input,
    focused === name && GlobalStyles.inputFocused,
  ];

  return (
    <SafeAreaView style={GlobalStyles.screen} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={GlobalStyles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={GlobalStyles.authContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={GlobalStyles.logoArea}>
            <View style={GlobalStyles.cartCircle}>
              <Text style={GlobalStyles.cartIcon}>🛒</Text>
            </View>
            <Text style={GlobalStyles.logoText}>DIGITAL RESOURCES</Text>
            <Text style={GlobalStyles.logoSubText}>Tạo tài khoản và bắt đầu ngay</Text>
          </View>

          <View style={GlobalStyles.box}>
            <Text style={GlobalStyles.title}>Tạo tài khoản</Text>
            <Text style={GlobalStyles.subtitle}>
              Đăng ký miễn phí để sử dụng toàn bộ tính năng của ứng dụng.
            </Text>

            <Text style={GlobalStyles.inputLabel}>Họ và tên</Text>
            <TextInput
              style={inputStyle('name')}
              placeholder="Nguyễn Văn A"
              placeholderTextColor={COLORS.textMuted}
              autoCapitalize="words"
              autoComplete="name"
              textContentType="name"
              value={fullName}
              onChangeText={setFullName}
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused(null)}
              editable={!loading}
            />

            <Text style={GlobalStyles.inputLabel}>Email</Text>
            <TextInput
              style={inputStyle('email')}
              placeholder="you@example.com"
              placeholderTextColor={COLORS.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              textContentType="emailAddress"
              value={email}
              onChangeText={setEmail}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
              editable={!loading}
            />

            <Text style={GlobalStyles.inputLabel}>Mật khẩu</Text>
            <TextInput
              style={inputStyle('password')}
              placeholder="Tối thiểu 6 ký tự"
              placeholderTextColor={COLORS.textMuted}
              secureTextEntry
              autoComplete="new-password"
              textContentType="newPassword"
              value={password}
              onChangeText={setPassword}
              onFocus={() => setFocused('password')}
              onBlur={() => setFocused(null)}
              editable={!loading}
            />

            <Text style={GlobalStyles.inputLabel}>Xác nhận mật khẩu</Text>
            <TextInput
              style={inputStyle('confirm')}
              placeholder="Nhập lại mật khẩu"
              placeholderTextColor={COLORS.textMuted}
              secureTextEntry
              autoComplete="new-password"
              textContentType="newPassword"
              returnKeyType="done"
              value={confirm}
              onChangeText={setConfirm}
              onFocus={() => setFocused('confirm')}
              onBlur={() => setFocused(null)}
              onSubmitEditing={handleRegister}
              editable={!loading}
            />

            <Pressable
              style={({ pressed }) => [GlobalStyles.button, pressed && GlobalStyles.buttonPressed]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <Text style={GlobalStyles.buttonText}>Tạo tài khoản</Text>
              )}
            </Pressable>

            <View style={GlobalStyles.bottomRow}>
              <Text style={GlobalStyles.normalText}>Đã có tài khoản?</Text>
              <Pressable onPress={() => router.push('/auth/login')} disabled={loading}>
                <Text style={GlobalStyles.linkText}> Đăng nhập</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
