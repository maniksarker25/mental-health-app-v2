import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch } from '@/store/hooks';
import { registerUser } from '@/store/slices/authSlice';
import { AppButton } from '@/components/ui/shared/AppButton';
import { AppCard } from '@/components/ui/shared/AppCard';
import { PrivacyNotice } from '@/components/ui/shared/PrivacyNotice';
import Toast from 'react-native-toast-message';
import type { MobileUser } from '@/types';

export default function RegisterScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { redirect } = useLocalSearchParams<{ redirect?: string }>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Required Fields',
        text2: 'Please fill in your name, email, and password.',
      });
      return;
    }

    if (password.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Short Password',
        text2: 'Password must be at least 6 characters.',
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Passwords Do Not Match',
        text2: 'Please make sure your passwords match.',
      });
      return;
    }

    if (!agreed) {
      Toast.show({
        type: 'error',
        text1: 'Terms Acceptance Required',
        text2: 'Please accept the community & confidentiality guidelines.',
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const newUser: MobileUser = {
        id: `user-${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        createdAt: new Date().toISOString(),
      };

      dispatch(registerUser(newUser));
      setIsLoading(false);

      Toast.show({
        type: 'success',
        text1: `Account created for ${newUser.name}!`,
        text2: 'Your account is ready for private dispatches.',
      });

      if (redirect) {
        router.replace(redirect as any);
      } else {
        router.replace('/history');
      }
    }, 600);
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-canvas">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        
        {/* Header Bar */}
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-line bg-surface">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-9 w-9 items-center justify-center rounded-full bg-canvas border border-line">
            <Ionicons name="arrow-back" size={18} color="#18231F" />
          </TouchableOpacity>
          <Text className="text-[14.5px] font-bold text-ink">Create Account</Text>
          <View className="w-9" />
        </View>

        <ScrollView
          className="flex-1 px-5"
          contentContainerClassName="pb-12 pt-5"
          showsVerticalScrollIndicator={false}>
          
          {/* Welcome Intro */}
          <View className="mb-6">
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-primary mb-3 shadow-xs">
              <Ionicons name="person-add" size={22} color="#FFFFFF" />
            </View>
            <Text className="text-[24px] font-bold text-ink">
              Create your account
            </Text>
            <Text className="mt-1 text-[13.5px] leading-relaxed text-ink-secondary">
              Keep all your anonymous support dispatches securely synchronized across your devices.
            </Text>
          </View>

          {/* Form Card */}
          <AppCard className="p-5">
            {/* Full Name / Alias Field */}
            <View className="mb-4">
              <Text className="text-[12px] font-bold uppercase tracking-wider text-sage mb-1.5">
                Your Name or Alias
              </Text>
              <View className="flex-row items-center rounded-2xl bg-canvas border border-line px-3.5 py-3">
                <Ionicons name="person-outline" size={17} color="#6B7A75" />
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="e.g. Alex Miller or Caring Friend"
                  placeholderTextColor="#9AA5A0"
                  className="ml-2.5 flex-1 text-[14px] text-ink font-medium"
                />
              </View>
            </View>

            {/* Email Field */}
            <View className="mb-4">
              <Text className="text-[12px] font-bold uppercase tracking-wider text-sage mb-1.5">
                Email Address
              </Text>
              <View className="flex-row items-center rounded-2xl bg-canvas border border-line px-3.5 py-3">
                <Ionicons name="mail-outline" size={17} color="#6B7A75" />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="your.email@example.com"
                  placeholderTextColor="#9AA5A0"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  className="ml-2.5 flex-1 text-[14px] text-ink font-medium"
                />
              </View>
            </View>

            {/* Password Field */}
            <View className="mb-4">
              <Text className="text-[12px] font-bold uppercase tracking-wider text-sage mb-1.5">
                Password
              </Text>
              <View className="flex-row items-center rounded-2xl bg-canvas border border-line px-3.5 py-3">
                <Ionicons name="key-outline" size={17} color="#6B7A75" />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="At least 6 characters"
                  placeholderTextColor="#9AA5A0"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  className="ml-2.5 flex-1 text-[14px] text-ink font-medium"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={18}
                    color="#6B7A75"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password Field */}
            <View className="mb-4">
              <Text className="text-[12px] font-bold uppercase tracking-wider text-sage mb-1.5">
                Confirm Password
              </Text>
              <View className="flex-row items-center rounded-2xl bg-canvas border border-line px-3.5 py-3">
                <Ionicons name="shield-checkmark-outline" size={17} color="#6B7A75" />
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Repeat your password"
                  placeholderTextColor="#9AA5A0"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  className="ml-2.5 flex-1 text-[14px] text-ink font-medium"
                />
              </View>
            </View>

            {/* Guidelines Checkbox */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setAgreed(!agreed)}
              className="mb-5 flex-row items-start gap-2.5">
              <View
                className={`mt-0.5 h-5 w-5 items-center justify-center rounded-md border ${
                  agreed ? 'bg-primary border-primary' : 'bg-canvas border-line'
                }`}>
                {agreed && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
              </View>
              <Text className="flex-1 text-[12px] leading-relaxed text-ink-secondary">
                I agree to use this service compassionately and understand that recipient identities are never tracked.
              </Text>
            </TouchableOpacity>

            {/* Submit Button */}
            <AppButton
              onPress={handleRegister}
              loading={isLoading}
              style={{ backgroundColor: '#2E5E52' }}>
              Create Account
            </AppButton>
          </AppCard>

          {/* Login Redirect */}
          <View className="mt-6 items-center">
            <Text className="text-[13.5px] text-ink-secondary">
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: '/login',
                  params: redirect ? { redirect } : undefined,
                })
              }
              className="mt-1.5 py-1">
              <Text className="text-[14px] font-bold text-primary underline">
                Sign In Instead →
              </Text>
            </TouchableOpacity>
          </View>

          {/* Privacy Notice */}
          <View className="mt-8">
            <PrivacyNotice tone="soft">
              Zero identity exposure: Recipients only receive the resource link and will never see your account name or contact email.
            </PrivacyNotice>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
