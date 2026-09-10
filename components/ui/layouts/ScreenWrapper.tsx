import React from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cn } from '@/utils/format';

interface ScreenWrapperProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  scrollable?: boolean;
  className?: string;
  contentClassName?: string;
  footerClassName?: string;
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
}

export function ScreenWrapper({
  children,
  header,
  footer,
  scrollable = true,
  className,
  contentClassName,
  footerClassName,
  edges = ['top', 'bottom'],
}: ScreenWrapperProps) {
  return (
    <SafeAreaView
      edges={edges}
      className={cn('flex-1 bg-canvas', className)}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {header}

        {scrollable ? (
          <ScrollView
            className="flex-1"
            contentContainerClassName={cn('px-5 pb-8 pt-2', contentClassName)}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            {children}
          </ScrollView>
        ) : (
          <View className={cn('flex-1 px-5 pb-8 pt-2', contentClassName)}>
            {children}
          </View>
        )}

        {footer && (
          <View
            className={cn(
              'border-t border-line/70 bg-canvas/95 px-5 pb-6 pt-4',
              footerClassName
            )}>
            {footer}
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
