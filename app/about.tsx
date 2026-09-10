import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenWrapper } from '@/components/ui/layouts/ScreenWrapper';
import { AppHeader } from '@/components/ui/shared/AppHeader';
import { AppCard } from '@/components/ui/shared/AppCard';

const values = [
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
    return (
        <ScreenWrapper header={<AppHeader title="About" />}>
            <View className="gap-4">
                {/* 1. Hero Brand Card */}
                <AppCard className="items-center py-6 px-4">
                    <View className="h-16 w-16 items-center justify-center rounded-2xl bg-mist border border-line mb-3">
                        <Ionicons name="leaf-outline" size={32} color="#2E5E52" />
                    </View>

                    <Text className="text-[20px] font-bold text-ink text-center">
                        Mental Health Anonymous
                    </Text>

                    <View className="mt-1.5 px-2.5 py-0.5 rounded-full bg-mist border border-line">
                        <Text className="text-[11px] font-medium text-primary">
                            Version 1.0.0 · Open & Confidential
                        </Text>
                    </View>

                    <Text className="mt-4 text-[14px] leading-6 text-ink-secondary text-center">
                        A safe, judgment-free platform enabling anyone to share helpful mental health resources with friends, family, or colleagues completely anonymously.
                    </Text>
                </AppCard>

                {/* 2. Our Core Pillars */}
                <Text className="text-[16px] font-semibold text-ink px-1 pt-2">
                    Our Core Principles
                </Text>

                <View className="gap-3">
                    {values.map((val, index) => (
                        <AppCard key={index}>
                            <View className="flex-row items-start gap-3.5">
                                <View className="h-10 w-10 items-center justify-center rounded-xl bg-mist border border-line">
                                    <Ionicons name={val.icon} size={20} color="#2E5E52" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-[15px] font-semibold text-ink">
                                        {val.title}
                                    </Text>
                                    <Text className="mt-1 text-[13px] leading-5 text-ink-secondary">
                                        {val.description}
                                    </Text>
                                </View>
                            </View>
                        </AppCard>
                    ))}
                </View>

                {/* 3. How It Works */}
                <Text className="text-[16px] font-semibold text-ink px-1 pt-2">
                    How It Works
                </Text>

                <AppCard>
                    <View className="gap-4">
                        {steps.map((item, index) => (
                            <View key={index} className="flex-row items-start gap-3.5">
                                <View className="h-7 w-7 items-center justify-center rounded-full bg-primary">
                                    <Text className="text-[12px] font-bold text-white">
                                        {item.step}
                                    </Text>
                                </View>
                                <View className="flex-1">
                                    <Text className="text-[14.5px] font-semibold text-ink">
                                        {item.title}
                                    </Text>
                                    <Text className="mt-0.5 text-[13px] leading-5 text-ink-secondary">
                                        {item.desc}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </AppCard>

                {/* 4. Medical Disclaimer Notice */}
                <AppCard>
                    <View className="flex-row items-center gap-2 mb-1.5">
                        <Ionicons name="information-circle-outline" size={18} color="#2E5E52" />
                        <Text className="text-[14px] font-semibold text-ink">
                            Educational Purpose
                        </Text>
                    </View>
                    <Text className="text-[12.5px] leading-5 text-ink-secondary">
                        Mental Health Anonymous is not a medical provider. Packets are curated educational tools and do not substitute for psychiatric diagnosis, medical advice, or crisis counseling.
                    </Text>
                </AppCard>

                {/* Footer */}
                <Text className="py-2 text-center text-[12px] text-ink-tertiary">
                    Built with care for mental wellness & community support.
                </Text>
            </View>
        </ScreenWrapper>
    );
}
