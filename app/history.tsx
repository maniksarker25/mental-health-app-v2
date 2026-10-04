import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector } from '@/store/hooks';
import { mockHistoryEntries } from '@/data/historyData';
import { formatSentDate } from '@/utils/format';

export default function HistoryScreen() {
  const router = useRouter();
  const { user, isAuthenticated, accountHistories } = useAppSelector(
    (state) => state.auth
  );

  // User dispatches or fallback to JSON data
  const userDispatches =
    user && accountHistories[user.id] && accountHistories[user.id].length > 0
      ? accountHistories[user.id]
      : mockHistoryEntries;

  const displayName = user?.name || 'Sarah Jenkins';
  const displayEmail = user?.email || 'sarah.jenkins@example.com';
  const dispatchCount = userDispatches.length;

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/home');
    }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleGoBack}
          style={styles.backButton}>
          <Ionicons name="chevron-back" size={20} color="#18231F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Send History</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {/* User Profile Summary Card */}
          <View style={styles.profileCard}>
            <View style={styles.profileLeft}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
                }}
                style={styles.avatarImage}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{displayName}</Text>
                <Text style={styles.profileEmail}>{displayEmail}</Text>
              </View>
            </View>

            <View style={styles.badgePill}>
              <Text style={styles.badgeText}>
                {dispatchCount} {dispatchCount === 1 ? 'Dispatch' : 'Dispatches'}
              </Text>
            </View>
          </View>

          {/* Timeline Section */}
          <View style={styles.timelineSection}>
            <Text style={styles.sectionTitle}>Recent Dispatches</Text>

            <View style={styles.timelineList}>
              {userDispatches.map((entry, index) => {
                const isLast = index === userDispatches.length - 1;
                const isDelivered = entry.status === 'SENT';
                const formattedTime =
                  entry.formattedDate || formatSentDate(entry.sentAt);
                const extraCount =
                  entry.extraResourcesCount ?? (entry.articles ? entry.articles.length : 2);

                return (
                  <View key={entry.id} style={styles.timelineItem}>
                    {/* Left Timeline Track */}
                    <View style={styles.nodeColumn}>
                      <View style={styles.nodeDot} />
                      {!isLast && <View style={styles.verticalLine} />}
                    </View>

                    {/* Dispatch Card */}
                    <View
                      style={[
                        styles.dispatchCard,
                        !isLast && styles.dispatchCardSpacing,
                      ]}>
                      {/* Top Row: Topic Name + Status */}
                      <View style={styles.cardHeader}>
                        <Text style={styles.topicName}>{entry.topicName}</Text>
                        <View
                          style={[
                            styles.statusPill,
                            isDelivered
                              ? styles.statusDelivered
                              : styles.statusFailed,
                          ]}>
                          <Ionicons
                            name={
                              isDelivered
                                ? 'checkmark-circle-outline'
                                : 'close-circle-outline'
                            }
                            size={13}
                            color={isDelivered ? '#265346' : '#A9524A'}
                          />
                          <Text
                            style={[
                              styles.statusText,
                              isDelivered
                                ? styles.statusTextDelivered
                                : styles.statusTextFailed,
                            ]}>
                            {isDelivered ? 'Delivered' : 'Failed'}
                          </Text>
                        </View>
                      </View>

                      {/* Recipient Details */}
                      <Text style={styles.recipientText}>
                        {entry.method === 'EMAIL' ? 'Email' : 'SMS'} ·{' '}
                        {entry.maskedRecipient}
                      </Text>

                      {/* Timestamp */}
                      <Text style={styles.timestampText}>{formattedTime}</Text>

                      {/* Extra Resources Attached Pill */}
                      {extraCount > 0 && (
                        <View style={styles.resourcePillContainer}>
                          <View style={styles.resourcePill}>
                            <Ionicons
                              name="layers-outline"
                              size={12}
                              color="#265346"
                            />
                            <Text style={styles.resourceText}>
                              {extraCount} extra resource{extraCount === 1 ? '' : 's'}
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F8F4',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#18231F',
  },
  headerPlaceholder: {
    width: 36,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 36,
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    maxWidth: 420,
    gap: 20,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ECEFE8',
    ...Platform.select({
      ios: {
        shadowColor: '#18231F',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 3px 12px rgba(24, 35, 31, 0.04)',
      },
    }),
  },
  profileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  avatarImage: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#EBF3EE',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 15.5,
    fontWeight: '700',
    color: '#18231F',
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 12,
    color: '#6B7A75',
  },
  badgePill: {
    backgroundColor: '#EBF3EE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#34574C',
  },
  timelineSection: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 14.5,
    fontWeight: '600',
    color: '#5B8678',
    paddingHorizontal: 2,
    marginBottom: 2,
  },
  timelineList: {
    paddingLeft: 2,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  nodeColumn: {
    alignItems: 'center',
    width: 22,
    marginRight: 10,
    paddingTop: 16,
  },
  nodeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#265346',
  },
  verticalLine: {
    width: 1.5,
    flex: 1,
    minHeight: 120,
    backgroundColor: '#D8E2DC',
    marginTop: 6,
  },
  dispatchCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ECEFE8',
    gap: 6,
    ...Platform.select({
      ios: {
        shadowColor: '#18231F',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },
      android: {
        elevation: 1,
      },
      web: {
        boxShadow: '0 2px 10px rgba(24, 35, 31, 0.03)',
      },
    }),
  },
  dispatchCardSpacing: {
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  topicName: {
    fontSize: 15.5,
    fontWeight: '600',
    color: '#18231F',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 12,
  },
  statusDelivered: {
    backgroundColor: '#EBF3EE',
  },
  statusFailed: {
    backgroundColor: '#FBECEB',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusTextDelivered: {
    color: '#265346',
  },
  statusTextFailed: {
    color: '#A9524A',
  },
  recipientText: {
    fontSize: 13,
    color: '#6B7A75',
  },
  timestampText: {
    fontSize: 11.5,
    color: '#98A49E',
  },
  resourcePillContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  resourcePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#EDF5F0',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
  },
  resourceText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#285346',
  },
});
