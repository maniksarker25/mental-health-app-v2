import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '@/utils/format';

interface AppHeaderProps {
  title?: string;
  step?: { current: number; total: number };
  onBack?: () => void;
  right?: React.ReactNode;
  className?: string;
}

export function AppHeader({
  title,
  step,
  onBack,
  right,
  className,
}: AppHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View className={cn('px-5 pb-3 pt-2', className)}>
      <View className="flex-row items-center gap-3">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleBack}
          accessibilityLabel="Go back"
          className="h-11 w-11 items-center justify-center rounded-full bg-surface border border-line active:bg-elevated">
          <Ionicons name="chevron-back" size={22} color="#18231F" />
        </TouchableOpacity>

        <View className="flex-1 min-w-0">
          {title && (
            <Text
              numberOfLines={1}
              className="text-[17px] font-semibold text-ink">
              {title}
            </Text>
          )}
          {step && (
            <Text className="text-[12px] text-ink-secondary">
              Step {step.current} of {step.total}
            </Text>
          )}
        </View>

        {right && <View>{right}</View>}
      </View>

      {step && (
        <View className="mt-3 flex-row gap-1.5" accessibilityRole="progressbar">
          {Array.from({ length: step.total }).map((_, index) => (
            <View
              key={index}
              className={cn(
                'h-1 flex-1 rounded-full',
                index < step.current ? 'bg-primary' : 'bg-line'
              )}
            />
          ))}
        </View>
      )}
    </View>
  );
}
