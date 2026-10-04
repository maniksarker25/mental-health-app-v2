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
  type NativeSyntheticEvent,
  type TextInputKeyPressEventData,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppButton } from '@/components/ui/shared/AppButton';
import Toast from 'react-native-toast-message';

export default function VerifyEmailScreen() {
  const router = useRouter();
  const { email, redirect, mode } = useLocalSearchParams<{
    email?: string;
    redirect?: string;
    mode?: 'register' | 'reset';
  }>();

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleDigitChange = (text: string, index: number) => {
    // Handle paste of complete 6-digit code
    if (text.length > 1) {
      const sanitized = text.replace(/[^0-9]/g, '').slice(0, 6);
      if (sanitized.length > 0) {
        const nextCode = [...code];
        for (let i = 0; i < 6; i++) {
          nextCode[i] = sanitized[i] || '';
        }
        setCode(nextCode);
        const nextFocus = Math.min(sanitized.length, 5);
        inputRefs.current[nextFocus]?.focus();
        return;
      }
    }

    const digit = text.replace(/[^0-9]/g, '').slice(-1);
    const nextCode = [...code];
    nextCode[index] = digit;
    setCode(nextCode);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (!code[index] && index > 0) {
        const nextCode = [...code];
        nextCode[index - 1] = '';
        setCode(nextCode);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleVerify = () => {
    if (isLoading) return;
    const fullCode = code.join('');

    if (fullCode.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Incomplete Code',
        text2: 'Please enter all 6 digits of the verification code.',
      });
      return;
    }

    Keyboard.dismiss();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Email Verified',
        text2: 'Your email address has been successfully verified.',
      });

      if (mode === 'reset') {
        router.push({
          pathname: '/reset-password',
          params: email ? { email } : undefined,
        });
      } else if (redirect) {
        router.replace(redirect as any);
      } else {
        router.replace('/history');
      }
    }, 600);
  };

  const handleResendOTP = () => {
    if (isResending || countdown > 0) return;
    setIsResending(true);

    setTimeout(() => {
      setIsResending(false);
      setCountdown(30);
      Toast.show({
        type: 'success',
        text1: 'Code Sent',
        text2: `A new 6-digit verification code has been sent to ${email || 'your email'}.`,
      });

      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 500);
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
                Verify Email Address
              </Text>
              <Text style={styles.description}>
                Enter 6 Digit code we have sent to your email.
              </Text>
            </View>

            {/* Form Card */}
            <View style={styles.card}>
              <Text nativeID="otp-label" style={styles.label}>
                Enter Your Code
              </Text>

              {/* 6 Digit Input Group */}
              <View style={styles.otpRow}>
                {code.map((digit, index) => {
                  const isFocused = focusedIndex === index;
                  return (
                    <View
                      key={index}
                      style={[
                        styles.otpBox,
                        isFocused && styles.otpBoxFocused,
                        !!digit && styles.otpBoxFilled,
                      ]}>
                      <TextInput
                        ref={(ref) => {
                          inputRefs.current[index] = ref;
                        }}
                        value={digit}
                        onChangeText={(text) => handleDigitChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        onFocus={() => setFocusedIndex(index)}
                        onBlur={() => setFocusedIndex(null)}
                        placeholder="--"
                        placeholderTextColor="#B0B9B4"
                        keyboardType="number-pad"
                        maxLength={6}
                        selectTextOnFocus
                        editable={!isLoading}
                        selectionColor="#2E5E52"
                        style={styles.otpInput}
                      />
                    </View>
                  );
                })}
              </View>

              {/* Continue Button */}
              <AppButton
                onPress={handleVerify}
                loading={isLoading}
                style={styles.submitButton}>
                Continue
              </AppButton>
            </View>

            {/* Resend Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Haven’t received the OTP </Text>
              <TouchableOpacity
                onPress={handleResendOTP}
                disabled={countdown > 0 || isResending}
                style={styles.resendLink}>
                <Text
                  style={[
                    styles.resendText,
                    countdown > 0 && styles.resendTextDisabled,
                  ]}>
                  {countdown > 0 ? `Resend OTP (${countdown}s)` : 'Resend OTP'}
                </Text>
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
  label: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#18231F',
  },
  otpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    marginVertical: 4,
  },
  otpBox: {
    flex: 1,
    minHeight: 52,
    borderWidth: 1,
    borderColor: '#ECEFE9',
    borderRadius: 14,
    backgroundColor: '#F8F9F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpBoxFocused: {
    borderColor: '#285346',
    backgroundColor: '#FFFFFF',
  },
  otpBoxFilled: {
    borderColor: '#285346',
  },
  otpInput: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
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
  submitButton: {
    borderRadius: 14,
    backgroundColor: '#285346',
    minHeight: 50,
    marginTop: 6,
  },
  footer: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 13.5,
    color: '#6B7A75',
  },
  resendLink: {
    paddingVertical: 4,
  },
  resendText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#18231F',
  },
  resendTextDisabled: {
    color: '#9AA5A0',
  },
});
