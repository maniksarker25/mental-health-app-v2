import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/store/hooks';

export default function SplashScreen() {
  const router = useRouter();
  const onboardingComplete = useAppSelector((state) => state.app.onboardingComplete);
  const isHydrated = useAppSelector((state) => state.app.isHydrated);

  useEffect(() => {
    if (!isHydrated) return;

    const timer = setTimeout(() => {
      if (onboardingComplete) {
        router.replace('/(tabs)/home');
      } else {
        router.replace('/onboarding');
      }
    }, 1700);

    return () => clearTimeout(timer);
  }, [isHydrated, onboardingComplete, router]);

  return (
    <View className="flex-1 items-center justify-center bg-canvas px-8">
      <Image
        source={require('@/assets/images/5a250f88-b844-47cb-b8e7-ec8fb437d85b.jpg')}
        className="h-28 w-28 rounded-3xl"
        resizeMode="cover"
      />

      <View className="mt-6 items-center">
        <Text className="text-[26px] font-semibold text-ink text-center">
          Mental Health Anonymous
        </Text>
        <Text className="mt-2 text-[13.5px] text-ink-secondary text-center">
          Care, shared quietly.
        </Text>
      </View>
    </View>
  );
}
