import React, { useState } from 'react';
import { View, Text, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setNotificationsEnabled } from '@/store/slices/appSlice';
import { logoutUser, clearAccountDispatches } from '@/store/slices/authSlice';
import { AppCard } from '@/components/ui/shared/AppCard';
import { AppButton } from '@/components/ui/shared/AppButton';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';

const staticLinks: Array<{
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
}> = [
  { label: 'Send History', icon: 'time-outline', route: '/history' },
  { label: 'About Mental Health Anonymous', icon: 'information-circle-outline', route: '/about' },
  { label: 'Privacy Policy & Zero Retention', icon: 'shield-checkmark-outline', route: '/privacy' },
  { label: 'Terms & Conditions', icon: 'document-text-outline', route: '/terms' },
  { label: 'Help & Crisis Helplines', icon: 'help-buoy-outline', route: '/help' },
];

export default function SettingsScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { notificationsEnabled } = useAppSelector((state) => state.app);
  const { user, isAuthenticated, accountHistories } = useAppSelector(
    (state) => state.auth
  );

  const [isConfirmingClear, setIsConfirmingClear] = useState(false);

  const userDispatches =
    user && accountHistories[user.id] ? accountHistories[user.id] : [];

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out of your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => {
            dispatch(logoutUser());
            Toast.show({
              type: 'info',
              text1: 'Signed Out',
              text2: 'You have been signed out of your account.',
            });
          },
        },
      ]
    );
  };

  const handleClearHistory = () => {
    if (!user) return;
    dispatch(clearAccountDispatches(user.id));
    setIsConfirmingClear(false);
    Toast.show({
      type: 'success',
      text1: 'History Cleared',
      text2: 'Your account dispatch history has been cleared.',
    });
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-canvas">
      {/* Header */}
      <View className="px-5 pb-3 pt-4 border-b border-line bg-surface">
        <Text className="text-[24px] font-bold text-ink">Settings</Text>
      </View>

      <ScrollView
        className="flex-1 px-5"
        contentContainerClassName="pb-12 pt-4 gap-4"
        showsVerticalScrollIndicator={false}>
        
        {/* Account Profile Card */}
        {isAuthenticated && user ? (
          <AppCard className="p-4 bg-surface border-line">
            <View className="flex-row items-center gap-3.5">
              <View className="h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-xs">
                <Text className="text-[16px] font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-[16px] font-bold text-ink">
                  {user.name}
                </Text>
                <Text className="mt-0.5 text-[13px] text-ink-secondary">
                  {user.email}
                </Text>
              </View>
            </View>
          </AppCard>
        ) : (
          <AppCard className="p-4 bg-primary-tint border-primary/20">
            <View className="flex-row items-center justify-between">
              <View className="flex-1 pr-3">
                <Text className="text-[15px] font-bold text-ink">
                  Account Sign In
                </Text>
                <Text className="mt-0.5 text-[12px] text-ink-secondary">
                  Sign in to keep your dispatch history synchronized.
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => router.push('/login')}
                style={{ backgroundColor: '#2E5E52' }}
                className="rounded-xl py-2 px-3.5 active:opacity-90 shadow-xs">
                <Text className="text-[12.5px] font-bold text-white">
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </AppCard>
        )}

        {/* Notifications Toggle */}
        <AppCard padded={false} className="overflow-hidden">
          <View className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center gap-3 flex-1 pr-3">
              <Ionicons name="notifications-outline" size={20} color="#6B7A75" />
              <View className="flex-1">
                <Text className="text-[14.5px] font-semibold text-ink">
                  Delivery Updates
                </Text>
                <Text className="text-[12px] text-ink-secondary">
                  Notify me when a resource is delivered to the recipient
                </Text>
              </View>
            </View>

            <Switch
              value={notificationsEnabled}
              onValueChange={(val) => {
                dispatch(setNotificationsEnabled(val));
              }}
              trackColor={{ false: '#E6E9E2', true: '#2E5E52' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </AppCard>

        {/* Informational Links */}
        <AppCard padded={false} className="overflow-hidden">
          {staticLinks.map((item, index) => (
            <TouchableOpacity
              key={item.label}
              activeOpacity={0.7}
              onPress={() => {
                router.push(item.route as any);
              }}
              className={`flex-row items-center justify-between p-4 ${
                index > 0 ? 'border-t border-line/70' : ''
              } active:bg-elevated`}>
              <View className="flex-row items-center gap-3 flex-1">
                <Ionicons name={item.icon} size={19} color="#6B7A75" />
                <Text className="text-[14.5px] text-ink font-medium">
                  {item.label}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={17} color="#9AA5A0" />
            </TouchableOpacity>
          ))}
        </AppCard>

        {/* Account History Management (If Authenticated) */}
        {isAuthenticated && user && (
          <AppCard className="p-4">
            <Text className="text-[15.5px] font-bold text-ink">
              Account Dispatch History
            </Text>
            <Text className="mt-1 text-[12.5px] text-ink-secondary">
              {userDispatches.length > 0
                ? `${userDispatches.length} dispatch record${
                    userDispatches.length === 1 ? '' : 's'
                  } saved in your account.`
                : 'No dispatch records in your account.'}
            </Text>

            {isConfirmingClear ? (
              <View className="mt-3 gap-2">
                <Text className="text-[12px] text-danger">
                  Are you sure? This will delete the dispatch logs from your account.
                </Text>
                <View className="flex-row gap-2">
                  <TouchableOpacity
                    onPress={handleClearHistory}
                    className="flex-1 rounded-xl bg-danger py-2.5 items-center">
                    <Text className="text-[12.5px] font-bold text-white">
                      Confirm Clear
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setIsConfirmingClear(false)}
                    className="flex-1 rounded-xl border border-line bg-surface py-2.5 items-center">
                    <Text className="text-[12.5px] font-bold text-ink">
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View className="mt-3">
                <TouchableOpacity
                  disabled={userDispatches.length === 0}
                  onPress={() => setIsConfirmingClear(true)}
                  className={`flex-row items-center justify-center rounded-xl border py-2.5 px-3 ${
                    userDispatches.length === 0
                      ? 'border-line bg-canvas opacity-60'
                      : 'border-danger/30 bg-danger-soft active:opacity-80'
                  }`}>
                  <Ionicons
                    name="trash-outline"
                    size={15}
                    color={userDispatches.length === 0 ? '#9AA5A0' : '#A9524A'}
                  />
                  <Text
                    className={`ml-1.5 text-[12.5px] font-bold ${
                      userDispatches.length === 0 ? 'text-ink-tertiary' : 'text-danger'
                    }`}>
                    Clear Account History
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </AppCard>
        )}

        {/* Sign Out Action Button at Bottom if Authenticated */}
        {isAuthenticated && user && (
          <TouchableOpacity
            onPress={handleLogout}
            className="w-full flex-row items-center justify-center rounded-2xl border border-line bg-surface py-3.5 px-4 active:bg-danger-soft active:border-danger/40">
            <Ionicons name="log-out-outline" size={17} color="#A9524A" />
            <Text className="ml-2 text-[14px] font-bold text-danger">
              Log Out of Account
            </Text>
          </TouchableOpacity>
        )}

        <Text className="text-center text-[11.5px] text-ink-tertiary pt-1">
          Mental Health Anonymous · Account Sync v2.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
