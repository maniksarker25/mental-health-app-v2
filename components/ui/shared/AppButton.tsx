import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  type GestureResponderEvent,
} from 'react-native';
import { cn } from '@/utils/format';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive';

interface AppButtonProps {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  textClassName?: string;
}

const variantContainerClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary active:bg-primary-dark',
  secondary: 'bg-primary-soft active:bg-mist',
  outline: 'bg-surface border border-line active:bg-elevated',
  ghost: 'bg-transparent active:bg-primary-tint',
  destructive: 'bg-danger-soft active:bg-[#EFDAD7]',
};

const variantTextClasses: Record<ButtonVariant, string> = {
  primary: 'text-ink-inverse font-semibold',
  secondary: 'text-primary-dark font-semibold',
  outline: 'text-ink font-semibold',
  ghost: 'text-primary-dark font-semibold',
  destructive: 'text-danger font-semibold',
};

export function AppButton({
  children,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = true,
  leftIcon,
  rightIcon,
  className,
  textClassName,
}: AppButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      disabled={isDisabled}
      className={cn(
        'min-h-[52px] flex-row items-center justify-center rounded-2xl px-5 py-3.5',
        variantContainerClasses[variant],
        fullWidth ? 'w-full' : 'self-start',
        isDisabled && 'opacity-50',
        className
      )}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? '#F6F8F4' : '#2E5E52'}
        />
      ) : (
        <View className="flex-row items-center justify-center gap-2">
          {leftIcon && <View>{leftIcon}</View>}
          <Text
            className={cn(
              'text-center text-[15px]',
              variantTextClasses[variant],
              textClassName
            )}>
            {children}
          </Text>
          {rightIcon && <View>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
}
