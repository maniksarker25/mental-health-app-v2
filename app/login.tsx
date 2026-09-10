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
import { loginUser } from '@/store/slices/authSlice';
import { AppButton } from '@/components/ui/shared/AppButton';
import { AppCard } from '@/components/ui/shared/AppCard';
import { PrivacyNotice } from '@/components/ui/shared/PrivacyNotice';
import Toast from 'react-native-toast-message';
import type { MobileUser } from '@/types';

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { redirect } = useLocalSearchParams<{ redirect?: string }>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Required Fields',
        text2: 'Please enter both your email and password.',
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Create user session from email
      const user: MobileUser = {
        id: email.includes('sarah') ? 'user-demo-1' : `user-${Date.now()}`,
        name: email.split('@')[0].replace('.', ' ').replace(/^\w/, (c) => c.toUpperCase()),
        email: email.trim().toLowerCase(),
        createdAt: new Date().toISOString(),
      };

      dispatch(loginUser(user));
      setIsLoading(false);

      Toast.show({
        type: 'success',
        text1: `Welcome back, ${user.name}!`,
        text2: 'Signed in successfully.',
      });

      if (redirect) {
        router.replace(redirect as any);
      } else {
        router.replace('/history');
      }
    }, 600);
  };

  const handleDemoLogin = () => {
    setIsLoading(true);

    setTimeout(() => {
      const demoUser: MobileUser = {
        id: 'user-demo-1',
        name: 'Sarah Jenkins',
        email: 'sarah.jenkins@example.com',
        createdAt: '2026-01-15T10:00:00.000Z',
      };

      dispatch(loginUser(demoUser));
      setIsLoading(false);

      Toast.show({
        type: 'success',
        text1: 'Signed in as Sarah Jenkins',
        text2: 'Loaded pre-synced dispatch records.',
      });

      if (redirect) {
        router.replace(redirect as any);
      } else {
        router.replace('/history');
      }
    }, 400);
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
          <Text className="text-[14.5px] font-bold text-ink">Member Sign In</Text>
          <View className="w-9" />
        </View>

        <ScrollView
          className="flex-1 px-5"
          contentContainerClassName="pb-12 pt-5"
          showsVerticalScrollIndicator={false}>
          
          {/* Welcome Intro */}
          <View className="mb-6">
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-primary mb-3 shadow-xs">
              <Ionicons name="lock-closed" size={22} color="#FFFFFF" />
            </View>
            <Text className="text-[24px] font-bold text-ink">Welcome back</Text>
            <Text className="mt-1 text-[13.5px] leading-relaxed text-ink-secondary">
              Sign in to manage your private dispatches, view synchronized delivery logs, and send confidential toolkits.
            </Text>
          </View>

          {/* Form Card */}
          <AppCard className="p-5">
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
                  placeholder="your.name@example.com"
                  placeholderTextColor="#9AA5A0"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  className="ml-2.5 flex-1 text-[14px] text-ink font-medium"
                />
              </View>
            </View>

            {/* Password Field */}
            <View className="mb-5">
              <Text className="text-[12px] font-bold uppercase tracking-wider text-sage mb-1.5">
                Password
              </Text>
              <View className="flex-row items-center rounded-2xl bg-canvas border border-line px-3.5 py-3">
                <Ionicons name="key-outline" size={17} color="#6B7A75" />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
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

            {/* Sign In Button */}
            <AppButton
              onPress={handleLogin}
              loading={isLoading}
              style={{ backgroundColor: '#2E5E52' }}>
              Sign In to Account
            </AppButton>

            {/* Demo Sign In Divider */}
            <View className="my-4 flex-row items-center">
              <View className="flex-1 h-[1px] bg-line" />
              <Text className="mx-3 text-[11px] font-bold text-ink-tertiary uppercase">
                Or Quick Test
              </Text>
              <View className="flex-1 h-[1px] bg-line" />
            </View>

            {/* Quick Demo Sign In Button */}
            <TouchableOpacity
              onPress={handleDemoLogin}
              disabled={isLoading}
              className="w-full flex-row items-center justify-center rounded-2xl border border-primary/30 bg-primary-tint py-3 px-4 active:bg-primary-soft">
              <Ionicons name="flash-outline" size={16} color="#2E5E52" />
              <Text className="ml-2 text-[13px] font-bold text-primary">
                Demo Sign In (Sarah Jenkins)
              </Text>
            </TouchableOpacity>
          </AppCard>

          {/* Registration Redirect */}
          <View className="mt-6 items-center">
            <Text className="text-[13.5px] text-ink-secondary">
              Don’t have an account yet?
            </Text>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: '/register',
                  params: redirect ? { redirect } : undefined,
                })
              }
              className="mt-1.5 py-1">
              <Text className="text-[14px] font-bold text-primary underline">
                Create a Free Account →
              </Text>
            </TouchableOpacity>
          </View>

          {/* Privacy Footnote */}
          <View className="mt-8">
            <PrivacyNotice tone="soft">
              Your account identity is strictly isolated and never attached to the anonymous messages you dispatch to recipients.
            </PrivacyNotice>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
