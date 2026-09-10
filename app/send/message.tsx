import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setMessage } from '@/store/slices/shareSlice';
import { ScreenWrapper } from '@/components/ui/layouts/ScreenWrapper';
import { AppHeader } from '@/components/ui/shared/AppHeader';
import { AppButton } from '@/components/ui/shared/AppButton';
import { TextAreaField } from '@/components/ui/inputs/TextAreaField';
import { PrivacyNotice } from '@/components/ui/shared/PrivacyNotice';
import { MESSAGE_MAX_LENGTH } from '@/utils/validators';
import { cn } from '@/utils/format';

const suggestions = [
  'Someone cares about you and wanted to share this.',
  'I thought this information might be helpful.',
  'You don’t have to go through everything alone.',
];

export default function MessageScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const storedMessage = useAppSelector((state) => state.share.message);
  const [draft, setDraft] = useState(storedMessage);

  const trimmed = draft.trim();
  const isTooLong = trimmed.length > MESSAGE_MAX_LENGTH;
  const remaining = MESSAGE_MAX_LENGTH - draft.length;

  const handleContinue = () => {
    if (isTooLong) return;
    dispatch(setMessage(trimmed));
    router.push('/send/review');
  };

  const handleSkip = () => {
    dispatch(setMessage(''));
    router.push('/send/review');
  };

  return (
    <ScreenWrapper
      header={
        <AppHeader
          title="Add a note"
          step={{ current: 2, total: 3 }}
          onBack={() => router.back()}
        />
      }
      footer={
        <View className="gap-2">
          <AppButton onPress={handleContinue} disabled={isTooLong}>
            Continue
          </AppButton>
          <AppButton variant="ghost" onPress={handleSkip}>
            Skip — send without a note
          </AppButton>
        </View>
      }>
      <Text className="mb-4 text-[13.5px] leading-5 text-ink-secondary">
        A short line of warmth often matters more than the resource itself. This is optional.
      </Text>

      <TextAreaField
        label="Supportive message"
        placeholder="Add a short supportive message..."
        value={draft}
        onChangeText={setDraft}
        maxLength={MESSAGE_MAX_LENGTH + 20}
        error={isTooLong ? `Keep it under ${MESSAGE_MAX_LENGTH} characters.` : undefined}
      />

      <Text
        className={cn(
          'mt-1.5 text-right text-[12px] font-medium',
          remaining < 0 ? 'text-danger' : 'text-ink-tertiary'
        )}>
        {draft.length} / {MESSAGE_MAX_LENGTH}
      </Text>

      <Text className="mb-3 mt-6 text-[17px] font-semibold text-ink">
        Or use a suggestion
      </Text>

      <View className="gap-2.5">
        {suggestions.map((suggestion) => {
          const isSelected = trimmed === suggestion;
          return (
            <TouchableOpacity
              key={suggestion}
              activeOpacity={0.75}
              onPress={() => setDraft(suggestion)}
              className={cn(
                'w-full rounded-2xl p-4 border active:bg-elevated',
                isSelected
                  ? 'bg-primary-tint border-primary/40'
                  : 'bg-surface border-line'
              )}>
              <Text
                className={cn(
                  'text-[13.5px] leading-5',
                  isSelected ? 'text-primary-dark font-medium' : 'text-ink'
                )}>
                “{suggestion}”
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <PrivacyNotice className="mt-6" tone="soft" icon="lock">
        The recipient will see this message, but they will not see who sent it.
      </PrivacyNotice>
    </ScreenWrapper>
  );
}
