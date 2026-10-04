import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  StyleSheet,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppButton } from '@/components/ui/shared/AppButton';
import Toast from 'react-native-toast-message';

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email?: string }>();

  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<'password' | 'confirmPassword' | null>(null);
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    if (isLoading) return;

    const nextErrors: typeof errors = {};

    if (!password.trim()) {
      nextErrors.password = 'Please enter a new password.';
    } else if (password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.';
    }

    if (!confirmPassword.trim()) {
      nextErrors.confirmPassword = 'Please repeat your new password.';
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      if (nextErrors.password) passwordRef.current?.focus();
      else if (nextErrors.confirmPassword) confirmPasswordRef.current?.focus();
      return;
    }

    Keyboard.dismiss();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Password Updated',
        text2: 'Your new password has been saved. Please sign in.',
      });

      router.replace('/login');
    }, 600);
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.screen}>
      <KeyboardAvoidingView
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : Platform.OS === 'android'
              ? 'height'
              : undefined
        }
        style={styles.screen}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Header Intro */}
            <View style={styles.intro}>
              <Text style={styles.brand}>Mental Health Anonymous</Text>
              <Text accessibilityRole="header" style={styles.heading}>
                Create New Password
              </Text>
              <Text style={styles.description}>
                Choose a secure password to protect your account.
              </Text>
            </View>

            {/* Form Card */}
            <View style={styles.card}>
              {/* Field 1: New Password */}
              <View style={styles.field}>
                <Text nativeID="password-label" style={styles.label}>
                  Password
                </Text>
                <View
                  style={[
                    styles.inputContainer,
                    focusedField === 'password' && styles.inputFocused,
                    !!errors.password && styles.inputInvalid,
                  ]}>
                  <TextInput
                    ref={passwordRef}
                    value={password}
                    onChangeText={(val) => {
                      setPassword(val);
                      setErrors((curr) => ({ ...curr, password: undefined }));
                    }}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="At least 6 characters"
                    placeholderTextColor="#A1ABA6"
                    accessibilityLabel="Password"
                    accessibilityLabelledBy="password-label"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                    editable={!isLoading}
                    selectionColor="#2E5E52"
                    style={styles.input}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword((curr) => !curr)}
                    accessibilityRole="button"
                    accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                    activeOpacity={0.6}
                    style={styles.iconToggle}>
                    <Ionicons
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={19}
                      color="#8E9C96"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && <Text style={styles.error}>{errors.password}</Text>}
              </View>

              {/* Field 2: Confirm Password */}
              <View style={styles.field}>
                <Text nativeID="confirm-password-label" style={styles.label}>
                  Confirm Password
                </Text>
                <View
                  style={[
                    styles.inputContainer,
                    focusedField === 'confirmPassword' && styles.inputFocused,
                    !!errors.confirmPassword && styles.inputInvalid,
                  ]}>
                  <TextInput
                    ref={confirmPasswordRef}
                    value={confirmPassword}
                    onChangeText={(val) => {
                      setConfirmPassword(val);
                      setErrors((curr) => ({ ...curr, confirmPassword: undefined }));
                    }}
                    onFocus={() => setFocusedField('confirmPassword')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Repeat your password"
                    placeholderTextColor="#A1ABA6"
                    accessibilityLabel="Confirm Password"
                    accessibilityLabelledBy="confirm-password-label"
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="go"
                    onSubmitEditing={handleSave}
                    editable={!isLoading}
                    selectionColor="#2E5E52"
                    style={styles.input}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword((curr) => !curr)}
                    accessibilityRole="button"
                    accessibilityLabel={showConfirmPassword ? 'Hide password' : 'Show password'}
                    activeOpacity={0.6}
                    style={styles.iconToggle}>
                    <Ionicons
                      name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={19}
                      color="#8E9C96"
                    />
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword && (
                  <Text style={styles.error}>{errors.confirmPassword}</Text>
                )}
              </View>

              {/* Save Button */}
              <AppButton
                onPress={handleSave}
                loading={isLoading}
                style={styles.submitButton}>
                Save
              </AppButton>
            </View>

            {/* Footer Back to Sign In */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Back to </Text>
              <TouchableOpacity
                accessibilityRole="link"
                onPress={() => router.push('/login')}
                style={styles.signInLink}>
                <Text style={styles.signInText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F8F4',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  content: {
    width: '100%',
    maxWidth: 420,
  },
  intro: {
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  brand: {
    fontSize: 14,
    lineHeight: 20,
    color: '#658C7E',
    fontWeight: '500',
    marginBottom: 8,
  },
  heading: {
    fontSize: 32,
    lineHeight: 38,
    color: '#18231F',
    fontFamily: Platform.select({
      ios: 'Georgia',
      android: 'serif',
      web: 'Georgia, serif',
    }),
    fontWeight: '400',
    letterSpacing: -0.4,
    marginBottom: 8,
  },
  description: {
    fontSize: 13.5,
    lineHeight: 20,
    color: '#6B7A75',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    gap: 16,
    borderWidth: 1,
    borderColor: '#ECEFE8',
    ...Platform.select({
      ios: {
        shadowColor: '#18231F',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 14,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 4px 20px rgba(24, 35, 31, 0.04)',
      },
    }),
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#18231F',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#ECEFE9',
    borderRadius: 14,
    backgroundColor: '#F8F9F5',
    paddingHorizontal: 14,
  },
  inputFocused: {
    borderColor: '#285346',
    backgroundColor: '#FFFFFF',
  },
  inputInvalid: {
    borderColor: '#A9524A',
  },
  input: {
    flex: 1,
    minHeight: 46,
    fontSize: 14.5,
    color: '#18231F',
    backgroundColor: 'transparent',
    borderWidth: 0,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
        outlineWidth: 0,
        outlineColor: 'transparent',
        boxShadow: 'none',
      } as any,
    }),
  },
  iconToggle: {
    padding: 6,
  },
  error: {
    fontSize: 12,
    lineHeight: 16,
    color: '#A9524A',
    marginTop: 2,
  },
  submitButton: {
    borderRadius: 14,
    backgroundColor: '#285346',
    minHeight: 50,
    marginTop: 4,
  },
  footer: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 13.5,
    color: '#6B7A75',
  },
  signInLink: {
    paddingVertical: 4,
  },
  signInText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#18231F',
  },
});
