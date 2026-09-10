import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenWrapper } from '@/components/ui/layouts/ScreenWrapper';
import { AppHeader } from '@/components/ui/shared/AppHeader';
import { AppCard } from '@/components/ui/shared/AppCard';

const faqs = [
    {
        question: 'Is sending resources really 100% anonymous?',
        answer:
            'Yes. Your name, phone number, email, and location are never attached to the sent message or stored on our servers.',
    },
    {
        question: 'What does the recipient receive?',
        answer:
            'They receive a compassionate educational packet containing helpful coping guides, supportive resources, and crisis hotline numbers.',
    },
    {
        question: 'Do you store recipient phone numbers or emails?',
        answer:
            'No. Contact details are held only in temporary memory to send the resource and are immediately purged permanently.',
    },
    {
        question: 'Can I clear my local send history?',
        answer:
            'Yes. You can wipe your local records anytime from Settings > Clear local history.',
    },
];

export default function HelpScreen() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const handleOpen = (url: string) => {
        Linking.openURL(url).catch(() => { });
    };

    return (
        <ScreenWrapper header={<AppHeader title="Help & Support" />}>
            <View className="gap-4">
                {/* 1. 24/7 Crisis Helplines */}
                <AppCard>
                    <Text className="text-[17px] font-semibold text-ink">
                        24/7 Crisis Helplines
                    </Text>
                    <Text className="mt-1 text-[13.5px] text-ink-secondary">
                        Free, confidential, and available at any time.
                    </Text>

                    <View className="mt-4 gap-3">
                        {/* 988 Lifeline */}
                        <View className="flex-row items-center justify-between p-3 rounded-xl bg-mist border border-line">
                            <View className="flex-1 pr-2">
                                <Text className="text-[15px] font-medium text-ink">
                                    Suicide & Crisis Lifeline
                                </Text>
                                <Text className="text-[12px] text-ink-secondary">
                                    Call or text 988 (24/7)
                                </Text>
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => handleOpen('tel:988')}
                                className="px-3 py-1.5 rounded-lg bg-primary flex-row items-center gap-1.5">
                                <Ionicons name="call" size={14} color="#FFFFFF" />
                                <Text className="text-[13px] font-medium text-white">Call 988</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Crisis Text Line */}
                        <View className="flex-row items-center justify-between p-3 rounded-xl bg-mist border border-line">
                            <View className="flex-1 pr-2">
                                <Text className="text-[15px] font-medium text-ink">
                                    Crisis Text Line
                                </Text>
                                <Text className="text-[12px] text-ink-secondary">
                                    Text HOME to 741741
                                </Text>
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => handleOpen('sms:741741')}
                                className="px-3 py-1.5 rounded-lg bg-primary flex-row items-center gap-1.5">
                                <Ionicons name="chatbubble" size={14} color="#FFFFFF" />
                                <Text className="text-[13px] font-medium text-white">Text</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </AppCard>

                {/* 2. Contact App Support */}
                <AppCard>
                    <Text className="text-[17px] font-semibold text-ink">
                        Contact App Support
                    </Text>
                    <Text className="mt-1 text-[13.5px] text-ink-secondary">
                        Have questions about the app or need assistance?
                    </Text>

                    <View className="mt-4 gap-3">
                        {/* Email */}
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => handleOpen('mailto:support@mentalhealthanonymous.org')}
                            className="flex-row items-center justify-between p-3.5 rounded-xl bg-mist border border-line active:bg-elevated">
                            <View className="flex-row items-center gap-3">
                                <Ionicons name="mail-outline" size={20} color="#2E5E52" />
                                <View>
                                    <Text className="text-[14.5px] font-medium text-ink">Email Us</Text>
                                    <Text className="text-[12px] text-ink-secondary">
                                        support@mentalhealthanonymous.org
                                    </Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={16} color="#9AA5A0" />
                        </TouchableOpacity>

                        {/* Phone */}
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => handleOpen('tel:+18005550199')}
                            className="flex-row items-center justify-between p-3.5 rounded-xl bg-mist border border-line active:bg-elevated">
                            <View className="flex-row items-center gap-3">
                                <Ionicons name="call-outline" size={20} color="#2E5E52" />
                                <View>
                                    <Text className="text-[14.5px] font-medium text-ink">Phone Support</Text>
                                    <Text className="text-[12px] text-ink-secondary">
                                        +1 (800) 555-0199 (Mon - Fri)
                                    </Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={16} color="#9AA5A0" />
                        </TouchableOpacity>
                    </View>
                </AppCard>

                {/* 3. Frequently Asked Questions (FAQ) */}
                <Text className="text-[16px] font-semibold text-ink px-1 pt-1">
                    Frequently Asked Questions
                </Text>

                <AppCard padded={false} className="overflow-hidden">
                    {faqs.map((faq, index) => {
                        const isOpen = openFaq === index;
                        return (
                            <View
                                key={index}
                                className={index > 0 ? 'border-t border-line/70' : ''}>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => setOpenFaq(isOpen ? null : index)}
                                    className="flex-row items-center justify-between p-4 active:bg-elevated">
                                    <Text className="flex-1 text-[14.5px] font-medium text-ink pr-3">
                                        {faq.question}
                                    </Text>
                                    <Ionicons
                                        name={isOpen ? 'chevron-up' : 'chevron-down'}
                                        size={18}
                                        color="#9AA5A0"
                                    />
                                </TouchableOpacity>

                                {isOpen && (
                                    <View className="px-4 pb-4 pt-1">
                                        <Text className="text-[13.5px] leading-5 text-ink-secondary">
                                            {faq.answer}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        );
                    })}
                </AppCard>

                {/* 4. Emergency Disclaimer */}
                <Text className="px-2 text-center text-[12px] text-ink-tertiary leading-5">
                    If you or someone you know is in immediate physical danger, please dial 911 or visit the nearest emergency room.
                </Text>
            </View>
        </ScreenWrapper>
    );
}
