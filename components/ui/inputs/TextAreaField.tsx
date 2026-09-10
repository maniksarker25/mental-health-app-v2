import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  type TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '@/utils/format';

export interface TextAreaFieldProps extends TextInputProps {
  label: string;
  helperText?: string;
  error?: string;
  containerClassName?: string;
}

export function TextAreaField({
  label,
  helperText,
  error,
  containerClassName,
  className,
  ...rest
}: TextAreaFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={cn('w-full', containerClassName)}>
      <Text className="mb-2 text-[13.5px] font-semibold text-ink">
        {label}
      </Text>

      <View
        className={cn(
          'rounded-2xl bg-surface p-4 border',
          error
            ? 'border-danger/70'
            : isFocused
            ? 'border-primary'
            : 'border-line'
        )}>
        <TextInput
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          placeholderTextColor="#9AA5A0"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            'min-h-[110px] text-[15px] text-ink leading-6',
            className
          )}
          {...rest}
        />
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
