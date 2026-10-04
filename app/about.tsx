import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const coreValues = [
  {
    icon: 'shield-checkmark-outline' as const,
    title: '100% Anonymous by Design',
    description:
      'Zero server logs, no accounts, and no tracking. Sender identity is never attached or recorded.',
  },
  {
    icon: 'heart-outline' as const,
    title: 'Support Without Stigma',
    description:
      'Reach out to loved ones going through difficult moments when starting a conversation feels tough.',
  },
  {
    icon: 'book-outline' as const,
    title: 'Evidence-Based Resources',
    description:
      'Curated educational packets covering anxiety, burnout, depression, grief, and healthy boundaries.',
  },
];

const steps = [
  {
    step: '1',
    title: 'Select a Topic',
    desc: 'Pick from curated educational guides that best match what your loved one is experiencing.',
  },
  {
    step: '2',
    title: 'Enter Recipient',
    desc: 'Provide an email or phone number. Details are processed purely in-memory.',
  },
  {
    step: '3',
    title: 'Sent Anonymously',
    desc: 'They receive compassionate resources without ever knowing who sent them.',
  },
];

export default function AboutScreen() {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/settings');
    }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      {/* Top Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleBack}
          style={styles.backButton}>
          <Ionicons name="chevron-back" size={20} color="#18231F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {/* 1. Hero Brand Card */}
          <View style={styles.heroCard}>
            <View style={styles.leafIconBadge}>
              <Ionicons name="leaf-outline" size={26} color="#265346" />
            </View>

            <Text style={styles.heroTitle}>Mental Health Anonymous</Text>
            <Text style={styles.heroDescription}>
              A safe, judgment-free platform enabling anyone to share helpful
              mental health resources with friends, family, or colleagues
              completely anonymously.
            </Text>
          </View>

          {/* 2. Core Pillars / Features Single Combined Card */}
          <View style={styles.featuresCard}>
            {coreValues.map((item, index) => (
              <View key={index}>
                {index > 0 && <View style={styles.divider} />}
                <View style={styles.featureRow}>
                  <View style={styles.featureIconContainer}>
                    <Ionicons name={item.icon} size={18} color="#265346" />
                  </View>
                  <View style={styles.featureTextContent}>
                    <Text style={styles.featureTitle}>{item.title}</Text>
                    <Text style={styles.featureDescription}>
                      {item.description}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* 3. How It Works Timeline */}
          <View style={styles.timelineSection}>
            <Text style={styles.sectionHeading}>How It Works</Text>

            <View style={styles.timelineList}>
              {steps.map((item, index) => {
                const isLast = index === steps.length - 1;
                return (
                  <View key={index} style={styles.timelineItem}>
                    {/* Left node & vertical connecting line */}
                    <View style={styles.nodeColumn}>
                      <View style={styles.stepCircle}>
                        <Text style={styles.stepNumber}>{item.step}</Text>
                      </View>
                      {!isLast && <View style={styles.verticalLine} />}
                    </View>

                    {/* Right text content */}
                    <View
                      style={[
                        styles.stepContent,
                        !isLast && styles.stepContentSpacing,
                      ]}>
                      <Text style={styles.stepTitle}>{item.title}</Text>
                      <Text style={styles.stepDesc}>{item.desc}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          {/* 4. Educational Purpose Disclaimer Card */}
          <View style={styles.disclaimerCard}>
            <View style={styles.disclaimerHeader}>
              <Ionicons name="shield-outline" size={17} color="#265346" />
              <Text style={styles.disclaimerTitle}>Educational Purpose</Text>
            </View>
            <Text style={styles.disclaimerText}>
              Mental Health Anonymous is not a medical provider. Packets are
              curated educational tools and do not substitute for psychiatric
              diagnosis, medical advice, or crisis counseling.
            </Text>
          </View>

          {/* 5. Footer */}
          <Text style={styles.footerText}>
            Built with care for mental wellness & community support.
          </Text>
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
    paddingTop: 4,
    paddingBottom: 36,
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    maxWidth: 420,
    gap: 18,
  },
  heroCard: {
    backgroundColor: '#EBF3EE',
    borderRadius: 22,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDE9E2',
  },
  leafIconBadge: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#18231F',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 3px 12px rgba(24, 35, 31, 0.05)',
      },
    }),
  },
  heroTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontFamily: Platform.select({
      ios: 'Georgia',
      android: 'serif',
      web: 'Georgia, serif',
    }),
    fontWeight: '400',
    color: '#18231F',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroDescription: {
    fontSize: 13,
    lineHeight: 19.5,
    color: '#536B62',
    textAlign: 'center',
    maxWidth: 320,
  },
  featuresCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#EAEFE9',
    ...Platform.select({
      ios: {
        shadowColor: '#18231F',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
      },
      android: {
        elevation: 1,
      },
      web: {
        boxShadow: '0 2px 14px rgba(24, 35, 31, 0.03)',
      },
    }),
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 14,
    gap: 13,
  },
  featureIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EBF3EE',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  featureTextContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 14.5,
    fontWeight: '600',
    color: '#18231F',
    marginBottom: 3,
  },
  featureDescription: {
    fontSize: 12.5,
    lineHeight: 18,
    color: '#6B7A75',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F3ED',
  },
  timelineSection: {
    marginTop: 2,
    gap: 12,
  },
  sectionHeading: {
    fontSize: 14.5,
    fontWeight: '600',
    color: '#5B8678',
    paddingHorizontal: 2,
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
    width: 32,
    marginRight: 10,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8E2DC',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#18231F',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
      web: {
        boxShadow: '0 1px 4px rgba(24, 35, 31, 0.04)',
      },
    }),
  },
  stepNumber: {
    fontSize: 13,
    fontWeight: '700',
    color: '#18231F',
  },
  verticalLine: {
    width: 1.5,
    flex: 1,
    minHeight: 28,
    backgroundColor: '#D8E2DC',
    marginVertical: 4,
  },
  stepContent: {
    flex: 1,
    paddingTop: 4,
  },
  stepContentSpacing: {
    paddingBottom: 22,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#18231F',
    marginBottom: 2,
  },
  stepDesc: {
    fontSize: 12,
    lineHeight: 17.5,
    color: '#6B7A75',
  },
  disclaimerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: '#EAEFE9',
    ...Platform.select({
      ios: {
        shadowColor: '#18231F',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
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
  disclaimerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  disclaimerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#18231F',
  },
  disclaimerText: {
    fontSize: 12,
    lineHeight: 17.5,
    color: '#6B7A75',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 11.5,
    color: '#98A49E',
    marginTop: 4,
  },
});
