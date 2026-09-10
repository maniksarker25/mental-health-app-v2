import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  type TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '@/utils/format';

export interface InputFieldProps extends TextInputProps {
  label: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightSlot?: React.ReactNode;
  containerClassName?: string;
}

export function InputField({
  label,
  helperText,
  error,
  leftIcon,
  rightSlot,
  containerClassName,
  className,
  ...rest
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={cn('w-full', containerClassName)}>
      <Text className="mb-2 text-[13.5px] font-semibold text-ink">
        {label}
      </Text>

      <View
        className={cn(
          'min-h-[54px] flex-row items-center rounded-2xl bg-surface px-4 border',
          error
            ? 'border-danger/70'
            : isFocused
            ? 'border-primary'
            : 'border-line'
        )}>
        {leftIcon && <View className="mr-3">{leftIcon}</View>}

        <TextInput
          placeholderTextColor="#9AA5A0"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            'flex-1 text-[15px] text-ink py-3',
            className
          )}
          {...rest}
        />

        {rightSlot && <View className="ml-2">{rightSlot}</View>}
      </View>

      {error ? (
        <View className="mt-2 flex-row items-center gap-1.5">
          <Ionicons name="alert-circle-outline" size={14} color="#A9524A" />
          <Text className="text-[12px] font-medium text-danger">{error}</Text>
        </View>
      ) : helperText ? (
        <Text className="mt-2 text-[12px] text-ink-secondary">
          {helperText}
        </Text>
      ) : null}
    </View>
  );
}
