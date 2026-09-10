import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppButton } from './AppButton';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: { label: string; onPress: () => void };
}

export function EmptyState({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <View className="items-center px-6 py-12">
      <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-mist">
        {icon ?? <Ionicons name="file-tray-outline" size={28} color="#2E5E52" />}
      </View>
      <Text className="text-[17px] font-semibold text-ink text-center">
        {title}
      </Text>
      <Text className="mt-2 max-w-[280px] text-center text-[13.5px] leading-5 text-ink-secondary">
        {description}
      </Text>
      {action && (
        <View className="mt-6">
          <AppButton
            variant="secondary"
            fullWidth={false}
            onPress={action.onPress}>
            {action.label}
          </AppButton>
        </View>
      )}
    </View>
  );
}

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'We couldn’t load this right now. Please check your connection and try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <View className="items-center px-6 py-12">
      <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-danger-soft">
        <Ionicons name="cloud-offline-outline" size={28} color="#A9524A" />
      </View>
      <Text className="text-[17px] font-semibold text-ink text-center">
        {title}
      </Text>
      <Text className="mt-2 max-w-[280px] text-center text-[13.5px] leading-5 text-ink-secondary">
        {description}
      </Text>
      {onRetry && (
        <View className="mt-6">
          <AppButton
            variant="outline"
            fullWidth={false}
            onPress={onRetry}>
            Try again
          </AppButton>
        </View>
      )}
    </View>
  );
}

export function TopicSkeleton() {
  return (
    <View className="gap-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <View
          key={index}
          className="h-[88px] rounded-card bg-surface border border-line/60 opacity-60"
        />
      ))}
    </View>
  );
}
