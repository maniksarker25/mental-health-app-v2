import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Topic } from '@/types';
import { TopicIcon } from './TopicIcon';

interface TopicCardProps {
  topic: Topic;
  onSelect: (topic: Topic) => void;
}

export function TopicCard({ topic, onSelect }: TopicCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => onSelect(topic)}
      accessibilityLabel={`${topic.name}. ${topic.shortDescription}`}
      className="flex-row items-center gap-4 rounded-card bg-surface p-4 border border-line/70 shadow-sm active:bg-elevated">
      <TopicIcon icon={topic.icon} tone={topic.tone} />

      <View className="flex-1 min-w-0">
        <Text className="text-[17px] font-semibold text-ink">
          {topic.name}
        </Text>
        <Text
          numberOfLines={1}
          className="mt-0.5 text-[13.5px] text-ink-secondary">
          {topic.shortDescription}
        </Text>
      </View>

      <Ionicons
        name="arrow-forward"
        size={18}
        color="#9AA5A0"
      />
    </TouchableOpacity>
  );
}
