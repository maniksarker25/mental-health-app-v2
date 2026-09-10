import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector } from '@/store/hooks';
import { AppCard } from '@/components/ui/shared/AppCard';
import { AppButton } from '@/components/ui/shared/AppButton';
import { EmptyState } from '@/components/ui/shared/States';
import { formatSentDate } from '@/utils/format';

export default function StandaloneHistoryScreen() {
  const router = useRouter();
  const { user, isAuthenticated, accountHistories } = useAppSelector(
    (state) => state.auth
  );

  const userDispatches =
    user && accountHistories[user.id] ? accountHistories[user.id] : [];

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-canvas">
      {/* Header Bar with Back Button */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-line bg-surface">
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-9 w-9 items-center justify-center rounded-full bg-canvas border border-line active:bg-elevated">
          <Ionicons name="arrow-back" size={18} color="#18231F" />
        </TouchableOpacity>
        <Text className="text-[15px] font-bold text-ink">Send History</Text>
        <View className="w-9" />
      </View>

      {/* Main Content */}
      <ScrollView
        className="flex-1 px-5"
        contentContainerClassName="pb-12 pt-4 gap-4"
        showsVerticalScrollIndicator={false}>
        
        {/* Unauthenticated State */}
        {!isAuthenticated || !user ? (
          <AppCard className="p-6 items-center text-center">
            <View className="h-14 w-14 items-center justify-center rounded-2xl bg-mist mb-3.5">
              <Ionicons name="lock-closed-outline" size={26} color="#2E5E52" />
            </View>
            <Text className="text-[19px] font-bold text-ink text-center">
              Sign In to View Your History
            </Text>
            <Text className="mt-1.5 text-center text-[13px] leading-relaxed text-ink-secondary">
              Dispatches are now tied to your secure personal account so you can track delivery across your devices.
            </Text>

            <View className="mt-6 w-full gap-2.5">
              <AppButton
                onPress={() => router.push('/login')}
                style={{ backgroundColor: '#2E5E52' }}>
                Sign In to Account
              </AppButton>
              <AppButton
                variant="outline"
                onPress={() => router.push('/register')}>
                Create Free Account
              </AppButton>
            </View>
          </AppCard>
        ) : (
          <>
            {/* Authenticated Account Profile Chip */}
            <AppCard className="p-4 bg-surface border-line">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3 flex-1 pr-2">
                  <View className="h-10 w-10 items-center justify-center rounded-2xl bg-primary shadow-xs">
                    <Text className="text-[14px] font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-[15px] font-bold text-ink">
                      {user.name}
                    </Text>
                    <Text className="text-[12px] text-ink-secondary truncate">
                      {user.email}
                    </Text>
                  </View>
                </View>

                <View className="rounded-full bg-mist px-3 py-1">
                  <Text className="text-[11px] font-bold text-forest">
                    {userDispatches.length}{' '}
                    {userDispatches.length === 1 ? 'Dispatch' : 'Dispatches'}
                  </Text>
                </View>
              </View>
            </AppCard>

            {/* List of Dispatches */}
            {userDispatches.length === 0 ? (
              <EmptyState
                icon={<Ionicons name="time-outline" size={28} color="#2E5E52" />}
                title="No dispatches yet"
                description="When you send a confidential message, a masked record will appear here so you can keep track."
                action={{
                  label: 'Choose a Topic & Send',
                  onPress: () => router.push('/(tabs)/topics'),
                }}
              />
            ) : (
              <View className="gap-3">
                <Text className="text-[12px] font-bold uppercase tracking-wider text-sage px-1">
                  Recent Dispatches
                </Text>
                {userDispatches.map((entry) => {
                  const isSent = entry.status === 'SENT';
                  return (
                    <AppCard key={entry.id} className="p-4">
                      <View className="flex-row items-start justify-between gap-3">
                        <View className="flex-1 min-w-0">
                          <Text className="text-[16px] font-bold text-ink">
                            {entry.topicName}
                          </Text>
                          <Text
                            numberOfLines={1}
                            className="mt-1 text-[13px] text-ink-secondary">
                            {entry.method === 'EMAIL' ? 'Email' : 'SMS'} ·{' '}
                            {entry.maskedRecipient}
                          </Text>
                          <Text className="mt-1 text-[11.5px] text-ink-tertiary">
                            {formatSentDate(entry.sentAt)}
                          </Text>
                        </View>

                        <View
                          className={`flex-row items-center gap-1.5 rounded-full px-2.5 py-1 ${
                            isSent ? 'bg-mist' : 'bg-danger-soft'
                          }`}>
                          <Ionicons
                            name={isSent ? 'checkmark-circle' : 'close-circle'}
                            size={13}
                            color={isSent ? '#22463D' : '#A9524A'}
                          />
                          <Text
                            className={`text-[11.5px] font-bold ${
                              isSent ? 'text-primary-dark' : 'text-danger'
                            }`}>
                            {isSent ? 'Delivered' : 'Failed'}
                          </Text>
                        </View>
                      </View>
                    </AppCard>
                  );
                })}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
