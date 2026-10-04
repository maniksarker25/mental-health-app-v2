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
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppButton } from '@/components/ui/shared/AppButton';
import Toast from 'react-native-toast-message';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const emailRef = useRef<TextInput>(null);

  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = () => {
    if (isLoading) return;
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError('Please enter your email address.');
      emailRef.current?.focus();
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError('Please enter a valid email address.');
      emailRef.current?.focus();
      return;
    }

    setError(undefined);
    Keyboard.dismiss();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Verification Code Sent',
        text2: `A 6-digit OTP has been sent to ${normalizedEmail}.`,
      });

      router.push({
        pathname: '/verify-email',
        params: {
          email: normalizedEmail,
          mode: 'reset',
        },
      });
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
                Forgot Password
              </Text>
              <Text style={styles.description}>
                Enter the email we have sent you the OTP.
              </Text>
            </View>

            {/* Form Card */}
            <View style={styles.card}>
              <View style={styles.field}>
                <Text nativeID="email-label" style={styles.label}>
                  Email Address
                </Text>
                <View
                  style={[
                    styles.inputContainer,
                    isFocused && styles.inputFocused,
                    !!error && styles.inputInvalid,
                  ]}>
                  <TextInput
                    ref={emailRef}
                    value={email}
                    onChangeText={(val) => {
                      setEmail(val);
                      setError(undefined);
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="your.email@example.com"
                    placeholderTextColor="#A1ABA6"
                    accessibilityLabel="Email Address"
                    accessibilityLabelledBy="email-label"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    spellCheck={false}
                    autoComplete="email"
                    returnKeyType="go"
                    onSubmitEditing={handleContinue}
                    editable={!isLoading}
                    selectionColor="#2E5E52"
                    style={styles.input}
                  />
                </View>
                {error && <Text style={styles.error}>{error}</Text>}
              </View>

              {/* Continue Button */}
              <AppButton
                onPress={handleContinue}
                loading={isLoading}
                style={styles.submitButton}>
                Continue
              </AppButton>
            </View>

            {/* Footer Back to Sign In */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Remember your password? </Text>
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
