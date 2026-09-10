import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useGetTopicByIdQuery } from '@/store/api/baseApi';
import { useAppDispatch } from '@/store/hooks';
import { setSelectedTopic } from '@/store/slices/shareSlice';
import { ScreenWrapper } from '@/components/ui/layouts/ScreenWrapper';
import { AppHeader } from '@/components/ui/shared/AppHeader';
import { AppCard } from '@/components/ui/shared/AppCard';
import { AppButton } from '@/components/ui/shared/AppButton';
import { PrivacyNotice } from '@/components/ui/shared/PrivacyNotice';
import { ErrorState } from '@/components/ui/shared/States';
import { TopicIcon } from '@/components/topic/TopicIcon';

export default function TopicDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data: topic, isLoading, isError, refetch } = useGetTopicByIdQuery(id || '', {
    skip: !id,
  });

  useEffect(() => {
    if (topic) {
      dispatch(setSelectedTopic(topic));
    }
  }, [topic, dispatch]);

  if (isError) {
    return (
      <ScreenWrapper header={<AppHeader onBack={() => router.back()} />}>
        <ErrorState
          title="Topic unavailable"
          description="This resource packet isn’t published right now. Try another topic."
          onRetry={refetch}
        />
      </ScreenWrapper>
    );
  }

  if (isLoading || !topic) {
    return (
      <ScreenWrapper header={<AppHeader />}>
        <View className="flex-1 items-center justify-center py-20">
          <ActivityIndicator size="large" color="#2E5E52" />
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper
      header={<AppHeader />}
      footer={
        <View className="gap-3">
          <AppButton onPress={() => router.push('/send/recipient')}>
            Send this resource
          </AppButton>
          <PrivacyNotice className="justify-center" textClassName="text-center">
            Sent anonymously - always.
          </PrivacyNotice>
        </View>
      }>
      <View className="items-start">
        <TopicIcon icon={topic.icon} tone={topic.tone} size="lg" />
        <Text className="mt-4 text-[28px] font-semibold text-ink leading-8">
          {topic.name}
        </Text>
        <Text className="mt-2 text-[15px] leading-6 text-ink-secondary">
          {topic.intro}
        </Text>
      </View>

      <AppCard className="mt-6">
        <View className="flex-row items-center gap-2">
          <Ionicons name="document-text-outline" size={18} color="#2E5E52" />
          <Text className="text-[17px] font-semibold text-ink">
            What they’ll receive
          </Text>
        </View>
        <Text className="mt-1 text-[12px] text-ink-tertiary">
          {topic.packetTitle} · reviewed educational packet
        </Text>

        <View className="mt-4 gap-3">
          {topic.packetItems.map((item, index) => (
            <View key={index} className="flex-row items-start gap-3">
              <View className="mt-0.5 h-5 w-5 items-center justify-center rounded-full bg-mist">
                <Ionicons name="checkmark" size={12} color="#2E5E52" />
              </View>
              <Text className="flex-1 text-[13.5px] leading-5 text-ink-secondary">
                {item}
              </Text>
            </View>
          ))}
        </View>
      </AppCard>

      <Text className="mt-6 text-[12px] leading-5 text-ink-tertiary">
        Resources are educational only and are not a substitute for professional medical advice, diagnosis or treatment.
      </Text>
    </ScreenWrapper>
  );
}
