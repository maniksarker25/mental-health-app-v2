import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useGetTopicsQuery } from '@/store/api/baseApi';
import { useAppDispatch } from '@/store/hooks';
import { resetShareFlow, setSelectedTopic } from '@/store/slices/shareSlice';
import { TopicCard } from '@/components/topic/TopicCard';
import { PrivacyNotice } from '@/components/ui/shared/PrivacyNotice';
import { EmptyState, ErrorState, TopicSkeleton } from '@/components/ui/shared/States';
import type { Topic } from '@/types';

export default function TopicsTabScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: topicsList, isLoading, isError, refetch, isFetching } = useGetTopicsQuery();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTopics = useMemo(() => {
    if (!topicsList) return [];
    if (!searchQuery.trim()) return topicsList;
    const q = searchQuery.toLowerCase().trim();
    return topicsList.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.shortDescription.toLowerCase().includes(q) ||
        t.packetTitle.toLowerCase().includes(q)
    );
  }, [topicsList, searchQuery]);

  const handleSelectTopic = (topic: Topic) => {
    dispatch(resetShareFlow());
    dispatch(setSelectedTopic(topic));
    router.push({
      pathname: '/topics/[id]',
      params: { id: topic.id },
    });
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-canvas">
      {/* Header */}
      <View className="px-5 pb-3 pt-3 flex-row items-start justify-between">
        <View className="flex-1 pr-4">
          <Text className="text-[12px] font-semibold uppercase tracking-[1.5px] text-sage">
            Clinical Resources
          </Text>
          <Text className="mt-1 text-[24px] font-semibold text-ink leading-8">
            Send Anonymous Resource
          </Text>
          <Text className="mt-1 text-[13px] leading-5 text-ink-secondary">
            Select a topic to send an evidence-based toolkit to someone you care about with zero tracking.
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push('/(tabs)/settings')}
          accessibilityLabel="Settings"
          className="h-10 w-10 items-center justify-center rounded-full bg-surface border border-line active:bg-elevated">
          <Ionicons name="settings-outline" size={18} color="#6B7A75" />
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View className="px-5 pb-3">
        <View className="flex-row items-center rounded-2xl bg-surface border border-line px-3.5 py-2.5">
          <Ionicons name="search-outline" size={18} color="#8A9690" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search topics (e.g. Anxiety, Sleep, Burnout)..."
            placeholderTextColor="#8A9690"
            className="ml-2.5 flex-1 text-[14px] text-ink font-medium"
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={16} color="#8A9690" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Main List */}
      <ScrollView
        className="flex-1 px-5"
        contentContainerClassName="pb-10 pt-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isLoading}
            onRefresh={refetch}
            tintColor="#2E5E52"
          />
        }>
        <View className="mb-3 flex-row items-baseline justify-between">
          <Text className="text-[16px] font-semibold text-ink">
            Available Topics
          </Text>
          {filteredTopics && (
            <Text className="text-[12px] text-ink-tertiary">
              {filteredTopics.length} resources
            </Text>
          )}
        </View>

        {isLoading && <TopicSkeleton />}

        {isError && (
          <ErrorState
            title="Topics didn’t load"
            description="We couldn’t reach our library just now. Check your connection and try again."
            onRetry={refetch}
          />
        )}

        {filteredTopics && filteredTopics.length === 0 && !isLoading && (
          <EmptyState
            title="No topics match your search"
            description="Try searching for another mental health topic or refresh the library."
            action={{ label: 'Clear search', onPress: () => setSearchQuery('') }}
          />
        )}

        {filteredTopics && filteredTopics.length > 0 && (
          <View className="gap-3">
            {filteredTopics.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                onSelect={handleSelectTopic}
              />
            ))}

            <PrivacyNotice className="mt-4" tone="soft">
              Your identity is never collected or shared with the recipient.
            </PrivacyNotice>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
