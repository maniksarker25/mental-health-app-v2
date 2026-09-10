import React from 'react';
import { View, TouchableOpacity, type GestureResponderEvent } from 'react-native';
import { cn } from '@/utils/format';

interface AppCardProps {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

export function AppCard({
  children,
  className,
  padded = true,
  onPress,
}: AppCardProps) {
  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={onPress}
        className={cn(
          'rounded-card bg-surface border border-line/70 shadow-sm',
          padded && 'p-5',
          className
        )}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View
      className={cn(
        'rounded-card bg-surface border border-line/70 shadow-sm',
        padded && 'p-5',
        className
      )}>
      {children}
    </View>
  );
}
