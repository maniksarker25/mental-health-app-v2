import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { AppButton } from '@/components/ui/shared/AppButton';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-canvas px-6">
      <Text className="text-[26px] font-semibold text-ink">Page Not Found</Text>
      <Text className="mt-2 text-center text-[15px] text-ink-secondary">
        This screen doesn’t exist or has been moved.
      </Text>
      <View className="mt-6 w-full max-w-xs">
        <AppButton onPress={() => router.replace('/(tabs)/home')}>
          Return to Home
        </AppButton>
      </View>
    </View>
  );
}
