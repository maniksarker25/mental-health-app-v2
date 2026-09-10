import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '@/utils/format';

interface PrivacyNoticeProps {
  children: React.ReactNode;
  tone?: 'quiet' | 'soft';
  icon?: 'shield' | 'lock';
  className?: string;
  textClassName?: string;
}

export function PrivacyNotice({
  children,
  tone = 'quiet',
  icon = 'shield',
  className,
  textClassName,
}: PrivacyNoticeProps) {
  const iconName =
    icon === 'lock' ? 'lock-closed-outline' : 'shield-checkmark-outline';
  const iconColor = tone === 'soft' ? '#2E5E52' : '#A9C4B5';

  return (
    <View
      className={cn(
        'flex-row items-start gap-2.5 rounded-2xl px-4 py-3',
        tone === 'soft' ? 'bg-primary-tint' : 'bg-transparent',
        className
      )}>
      <View className="mt-0.5">
        <Ionicons name={iconName} size={16} color={iconColor} />
      </View>
      <Text
        className={cn(
          'flex-1 text-[13px] leading-5',
          tone === 'soft' ? 'text-primary-dark font-medium' : 'text-ink-secondary',
          textClassName
        )}>
        {children}
      </Text>
    </View>
  );
}
