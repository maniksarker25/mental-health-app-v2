import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { DeliveryMethod } from '@/types';
import { cn } from '@/utils/format';

interface DeliveryMethodSelectorProps {
  value: DeliveryMethod;
  onChange: (method: DeliveryMethod) => void;
}

const options: Array<{
  value: DeliveryMethod;
  label: string;
  hint: string;
  icon: keyof typeof Ionicons.glyphMap;
}> = [
  {
    value: 'EMAIL',
    label: 'Email',
    hint: 'Sent to an inbox',
    icon: 'mail-outline',
  },
  {
    value: 'SMS',
    label: 'Text message',
    hint: 'Sent to a phone',
    icon: 'chatbubble-ellipses-outline',
  },
];

export function DeliveryMethodSelector({
  value,
  onChange,
}: DeliveryMethodSelectorProps) {
  return (
    <View className="flex-row gap-3">
      {options.map(({ value: option, label, hint, icon }) => {
        const selected = option === value;
        return (
          <TouchableOpacity
            key={option}
            activeOpacity={0.75}
            onPress={() => onChange(option)}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            className={cn(
              'flex-1 min-h-[96px] justify-center rounded-2xl p-4 border',
              selected
                ? 'bg-primary border-primary'
                : 'bg-surface border-line active:bg-elevated'
            )}>
            <Ionicons
              name={icon}
              size={22}
              color={selected ? '#A9C4B5' : '#9AA5A0'}
            />
            <Text
              className={cn(
                'mt-2 text-[15px] font-semibold',
                selected ? 'text-ink-inverse' : 'text-ink'
              )}>
              {label}
            </Text>
            <Text
              className={cn(
                'mt-0.5 text-[12px]',
                selected ? 'text-mist/80' : 'text-ink-secondary'
              )}>
              {hint}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
