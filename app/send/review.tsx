import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addHistoryEntry } from '@/store/slices/appSlice';
import { addDispatchToAccount } from '@/store/slices/authSlice';
import { resetShareFlow } from '@/store/slices/shareSlice';
import { useCreateAnonymousShareMutation } from '@/store/api/baseApi';
import Toast from 'react-native-toast-message';
import { ScreenWrapper } from '@/components/ui/layouts/ScreenWrapper';
import { AppHeader } from '@/components/ui/shared/AppHeader';
import { AppCard } from '@/components/ui/shared/AppCard';
import { AppButton } from '@/components/ui/shared/AppButton';
import { PrivacyNotice } from '@/components/ui/shared/PrivacyNotice';
import { TopicIcon } from '@/components/topic/TopicIcon';
import { maskEmail, maskPhone } from '@/utils/mask';

function ReviewRow({
  label,
  value,
  onEdit,
  editAccessibilityLabel,
}: {
  label: string;
  value: React.ReactNode;
  onEdit: () => void;
  editAccessibilityLabel: string;
}) {
  return (
    <View className="flex-row items-start justify-between border-b border-line/70 py-3.5">
      <View className="flex-1 min-w-0 pr-3">
        <Text className="text-[11px] font-semibold uppercase tracking-[1px] text-ink-tertiary">
          {label}
        </Text>
        <View className="mt-1">{value}</View>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onEdit}
        accessibilityLabel={editAccessibilityLabel}
        className="flex-row items-center gap-1 rounded-full bg-elevated px-3 py-1.5 border border-line active:bg-primary-tint">
        <Ionicons name="pencil-outline" size={12} color="#22463D" />
        <Text className="text-[12px] font-semibold text-primary-dark">
          Edit
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function ReviewScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { selectedTopic, recipient, message } = useAppSelector(
    (state) => state.share
  );

  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const [createShare, { isLoading, isError, reset }] =
    useCreateAnonymousShareMutation();
  const [acknowledged, setAcknowledged] = useState(false);

  useEffect(() => {
    if (!selectedTopic || !recipient) {
      router.replace('/(tabs)/home');
    }
  }, [selectedTopic, recipient, router]);

  if (!selectedTopic || !recipient) return null;

  const rawRecipient =
    recipient.method === 'EMAIL'
      ? recipient.email || ''
      : `${recipient.countryCode || ''}${(recipient.phone || '').replace(/\D/g, '')}`;

  const maskedRecipient =
    recipient.method === 'EMAIL'
      ? maskEmail(recipient.email || '')
      : maskPhone(recipient.countryCode || '', recipient.phone || '');

  const handleSend = async () => {
    if (!acknowledged || isLoading) return;

    if (!isAuthenticated || !user) {
      Toast.show({
        type: 'info',
        text1: 'Sign In Required',
        text2: 'Please sign in to send and link this dispatch to your account.',
      });
      router.push({
        pathname: '/login',
        params: { redirect: '/send/review' },
      });
      return;
    }

    try {
      const result = await createShare({
        topicId: selectedTopic.id,
        deliveryMethod: recipient.method,
        recipient: rawRecipient,
        message: message || undefined,
        userId: user.id,
        userEmail: user.email,
      }).unwrap();

      const newHistoryEntry = {
        id: result.shareId,
        userId: user.id,
        userEmail: user.email,
        topicId: selectedTopic.id,
        topicName: selectedTopic.name,
        method: recipient.method,
        maskedRecipient,
        sentAt: new Date().toISOString(),
        status: result.status,
      };

      // Add to account dispatches
      dispatch(
        addDispatchToAccount({
          userId: user.id,
          entry: newHistoryEntry,
        })
      );

      // Add to app history
      dispatch(addHistoryEntry(newHistoryEntry));

      const topicName = selectedTopic.name;
      const method = recipient.method;

      dispatch(resetShareFlow());

      router.replace({
        pathname: '/send/success',
        params: { topicName, method },
      });
    } catch {
      // Error handled by RTK mutation state
    }
  };

  return (
    <ScreenWrapper
      header={
        <AppHeader
          title="Review"
          step={{ current: 3, total: 3 }}
          onBack={() => router.back()}
        />
      }
      footer={
        <AppButton
          onPress={handleSend}
          loading={isLoading}
          disabled={!acknowledged || isLoading}>
          {isLoading ? 'Sending anonymously…' : 'Send anonymously'}
        </AppButton>
      }>
      {/* Review Card */}
      <AppCard className="pt-2">
        <ReviewRow
          label="Topic"
          value={
            <View className="flex-row items-center gap-2">
              <TopicIcon
                icon={selectedTopic.icon}
                tone={selectedTopic.tone}
                size="sm"
              />
              <Text className="text-[15px] font-semibold text-ink">
                {selectedTopic.name}
              </Text>
            </View>
          }
          editAccessibilityLabel="Edit topic"
          onEdit={() => router.push('/(tabs)/home')}
        />

        <ReviewRow
          label="Send via"
          value={
            <Text className="text-[15px] font-medium text-ink">
              {recipient.method === 'EMAIL' ? 'Email' : 'Text message'}
            </Text>
          }
          editAccessibilityLabel="Edit delivery channel"
          onEdit={() => router.push('/send/recipient')}
        />

        <ReviewRow
          label="Recipient"
          value={
            <Text className="text-[15px] font-medium text-ink">
              {maskedRecipient}
            </Text>
          }
          editAccessibilityLabel="Edit recipient"
          onEdit={() => router.push('/send/recipient')}
        />

        <ReviewRow
          label="Message"
          value={
            message ? (
              <Text className="text-[13.5px] italic text-ink-secondary">
                “{message}”
              </Text>
            ) : (
              <Text className="text-[13.5px] text-ink-tertiary">
                No note attached
              </Text>
            )
          }
          editAccessibilityLabel="Edit note"
          onEdit={() => router.push('/send/message')}
        />
      </AppCard>

      {/* Loading indicator */}
      {isLoading && (
        <View className="mt-4 flex-row items-center gap-3 rounded-2xl bg-primary-tint p-4">
          <ActivityIndicator size="small" color="#2E5E52" />
          <Text className="flex-1 text-[13.5px] text-primary-dark font-medium">
            Creating a secure link and delivering it…
          </Text>
        </View>
      )}

      {/* Error state */}
      {isError && (
        <View className="mt-4 rounded-2xl bg-danger-soft p-4 border border-danger/30">
          <Text className="text-[13.5px] text-danger font-medium">
            We couldn’t send the resource right now. Please check your connection and try again.
          </Text>
          <TouchableOpacity onPress={() => reset()} className="mt-2">
            <Text className="text-[13px] font-semibold text-danger underline">
              Dismiss and retry
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Medical Disclaimer Checkbox */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setAcknowledged(!acknowledged)}
        className="mt-5 flex-row items-start gap-3 rounded-2xl bg-surface p-4 border border-line">
        <View
          className={`mt-0.5 h-5 w-5 items-center justify-center rounded-md border ${
            acknowledged
              ? 'bg-primary border-primary'
              : 'bg-elevated border-line'
          }`}>
          {acknowledged && (
            <Ionicons name="checkmark" size={14} color="#FFFFFF" />
          )}
        </View>
        <Text className="flex-1 text-[13.5px] leading-5 text-ink-secondary">
          I understand this is an educational resource and not professional medical advice.
        </Text>
      </TouchableOpacity>

      <PrivacyNotice className="mt-4" tone="soft">
        Sent anonymously. Your name, email and number are never attached.
      </PrivacyNotice>
    </ScreenWrapper>
  );
}
