import React from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppButton } from '@/components/ui/shared/AppButton';
import { PrivacyNotice } from '@/components/ui/shared/PrivacyNotice';

export default function SuccessScreen() {
  const router = useRouter();
  const { topicName, method } = useLocalSearchParams<{
    topicName?: string;
    method?: string;
  }>();

  const channel = method === 'SMS' ? 'text message' : 'email';

  return (
    <SafeAreaView className="flex-1 bg-canvas px-6 pb-8 pt-6 justify-between">
      <View className="flex-1 items-center justify-center text-center">
        <View className="h-20 w-20 items-center justify-center rounded-full bg-primary shadow-lg">
          <Ionicons name="checkmark" size={38} color="#F6F8F4" />
        </View>

        <Text className="mt-8 text-[26px] font-semibold text-ink text-center">
          Resource sent successfully
        </Text>

        <Text className="mt-3 max-w-[300px] text-center text-[15px] leading-6 text-ink-secondary">
          {topicName ? `${topicName} resources are on the way. ` : ''}
          The recipient will receive a secure link by {channel} to view the selected educational resource.
        </Text>

        <PrivacyNotice className="mt-8 justify-center" tone="soft" icon="lock">
          Your identity was not included in the message.
        </PrivacyNotice>
      </View>

      <View className="gap-2.5">
        <AppButton onPress={() => router.replace('/(tabs)/home')}>
          Send another resource
        </AppButton>
        <AppButton
          variant="ghost"
          onPress={() => router.replace('/history')}>
          View send history
        </AppButton>
      </View>
    </SafeAreaView>
  );
}
