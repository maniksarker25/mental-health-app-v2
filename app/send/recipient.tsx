import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setRecipient } from '@/store/slices/shareSlice';
import { ScreenWrapper } from '@/components/ui/layouts/ScreenWrapper';
import { AppHeader } from '@/components/ui/shared/AppHeader';
import { AppButton } from '@/components/ui/shared/AppButton';
import { InputField } from '@/components/ui/inputs/InputField';
import { PrivacyNotice } from '@/components/ui/shared/PrivacyNotice';
import { DeliveryMethodSelector } from '@/components/send/DeliveryMethodSelector';
import { CountryPickerModal } from '@/components/ui/modals/CountryPickerModal';
import { countryCodes } from '@/data/countryCodes';
import type { DeliveryMethod } from '@/types';
import { emailRecipientSchema, smsRecipientSchema } from '@/utils/validators';

export default function RecipientScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedTopic = useAppSelector((state) => state.share.selectedTopic);
  const storedRecipient = useAppSelector((state) => state.share.recipient);

  const [method, setMethod] = useState<DeliveryMethod>(
    storedRecipient?.method || 'EMAIL'
  );
  const [email, setEmail] = useState(storedRecipient?.email || '');
  const [countryCode, setCountryCode] = useState(
    storedRecipient?.countryCode || '+1'
  );
  const [phone, setPhone] = useState(storedRecipient?.phone || '');
  const [error, setError] = useState<string | null>(null);
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);

  const selectedCountry =
    countryCodes.find((c) => c.code === countryCode) || countryCodes[0];

  const handleContinue = () => {
    setError(null);

    if (method === 'EMAIL') {
      const result = emailRecipientSchema.safeParse({ email });
      if (!result.success) {
        setError(result.error.errors[0]?.message || 'Invalid email');
        return;
      }
      dispatch(
        setRecipient({
          method: 'EMAIL',
          email: result.data.email,
        })
      );
    } else {
      const result = smsRecipientSchema.safeParse({ countryCode, phone });
      if (!result.success) {
        setError(result.error.errors[0]?.message || 'Invalid phone number');
        return;
      }
      dispatch(
        setRecipient({
          method: 'SMS',
          countryCode: result.data.countryCode,
          phone: result.data.phone,
        })
      );
    }

    router.push('/send/message');
  };

  return (
    <ScreenWrapper
      header={
        <AppHeader
          title="Who is this for?"
          step={{ current: 1, total: 3 }}
          onBack={() => router.back()}
        />
      }
      footer={<AppButton onPress={handleContinue}>Continue</AppButton>}>
      {selectedTopic && (
        <Text className="mb-5 text-[13.5px] leading-5 text-ink-secondary">
          Sending{' '}
          <Text className="font-semibold text-ink">{selectedTopic.name}</Text>{' '}
          resources. We only need a destination — nothing about you.
        </Text>
      )}

      <Text className="mb-3 text-[17px] font-semibold text-ink">
        Delivery method
      </Text>

      <DeliveryMethodSelector
        value={method}
        onChange={(m) => {
          setMethod(m);
          setError(null);
        }}
      />

      <View className="mt-6 gap-4">
        {method === 'EMAIL' ? (
          <InputField
            label="Recipient email address"
            placeholder="name@example.com"
            value={email}
            onChangeText={(txt) => {
              setEmail(txt);
              if (error) setError(null);
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            leftIcon={<Ionicons name="mail-outline" size={18} color="#9AA5A0" />}
            helperText="They’ll receive a private link to open in any browser."
            error={error || undefined}
          />
        ) : (
          <View className="gap-4">
            <View>
              <Text className="mb-2 text-[13.5px] font-semibold text-ink">
                Country code
              </Text>
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => setIsCountryModalVisible(true)}
                className="min-h-[54px] flex-row items-center justify-between rounded-2xl bg-surface px-4 border border-line active:bg-elevated">
                <View className="flex-row items-center gap-3">
                  <Text className="text-[20px]">{selectedCountry.flag}</Text>
                  <Text className="text-[15px] font-medium text-ink">
                    {selectedCountry.label} ({selectedCountry.code})
                  </Text>
                </View>
                <Ionicons name="chevron-down" size={18} color="#9AA5A0" />
              </TouchableOpacity>
            </View>

            <InputField
              label="Recipient phone number"
              placeholder="555 019 2847"
              value={phone}
              onChangeText={(txt) => {
                setPhone(txt);
                if (error) setError(null);
              }}
              keyboardType="phone-pad"
              leftIcon={<Ionicons name="call-outline" size={18} color="#9AA5A0" />}
              helperText="Standard carrier message rates may apply for the recipient."
              error={error || undefined}
            />
          </View>
        )}
      </View>

      <PrivacyNotice className="mt-6" tone="soft" icon="lock">
        Your identity will not be included in the message. We don’t store the
        recipient’s details after it’s delivered.
      </PrivacyNotice>

      <CountryPickerModal
        visible={isCountryModalVisible}
        selectedCode={countryCode}
        onSelect={(code) => setCountryCode(code)}
        onClose={() => setIsCountryModalVisible(false)}
      />
    </ScreenWrapper>
  );
}
