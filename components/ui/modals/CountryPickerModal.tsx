import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { countryCodes, type CountryCode } from '@/data/countryCodes';

interface CountryPickerModalProps {
  visible: boolean;
  selectedCode: string;
  onSelect: (code: string) => void;
  onClose: () => void;
}

export function CountryPickerModal({
  visible,
  selectedCode,
  onSelect,
  onClose,
}: CountryPickerModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}>
      <SafeAreaView className="flex-1 bg-canvas">
        <View className="flex-row items-center justify-between border-b border-line px-5 py-4">
          <Text className="text-[17px] font-semibold text-ink">
            Select Country Code
          </Text>
          <TouchableOpacity
            onPress={onClose}
            className="h-9 w-9 items-center justify-center rounded-full bg-surface">
            <Ionicons name="close" size={20} color="#18231F" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={countryCodes}
          keyExtractor={(item) => item.code}
          contentContainerClassName="p-4 gap-2"
          renderItem={({ item }: { item: CountryCode }) => {
            const isSelected = item.code === selectedCode;
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  onSelect(item.code);
                  onClose();
                }}
                className={`flex-row items-center justify-between rounded-2xl p-4 border ${
                  isSelected
                    ? 'bg-primary-tint border-primary/40'
                    : 'bg-surface border-line active:bg-elevated'
                }`}>
                <View className="flex-row items-center gap-3">
                  <Text className="text-[22px]">{item.flag}</Text>
                  <View>
                    <Text className="text-[15px] font-medium text-ink">
                      {item.label}
                    </Text>
                    <Text className="text-[13px] text-ink-secondary">
                      {item.code}
                    </Text>
                  </View>
                </View>

                {isSelected && (
                  <Ionicons name="checkmark-circle" size={20} color="#2E5E52" />
                )}
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
    </Modal>
  );
}
