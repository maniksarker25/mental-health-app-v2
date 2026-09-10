import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch } from '@/store/hooks';
import { completeOnboarding } from '@/store/slices/appSlice';
import { AppButton } from '@/components/ui/shared/AppButton';
import { cn } from '@/utils/format';

interface Slide {
  image: any;
  title: string;
  body: string;
}

const slides: Slide[] = [
  {
    image: require('@/assets/images/24efcec5-7768-4107-a6b1-a1692caf804f.jpg'),
    title: 'Share something that helps',
    body: 'Choose a mental-health topic and send trusted, plain-language information to someone you care about.',
  },
  {
    image: require('@/assets/images/76d1e3a1-7223-4bd9-8d84-01d8a0adf209.jpg'),
    title: 'Send it anonymously',
    body: 'Your name, number and email are never included. They receive the resource, not your identity.',
  },
  {
    image: require('@/assets/images/189d3bad-21fb-4ed3-b768-5573b3a4d077.jpg'),
    title: 'They open a secure link',
    body: 'No app, no account. A private web link takes them straight to reviewed educational resources.',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const isLast = index === slides.length - 1;

  const handleFinish = () => {
    dispatch(completeOnboarding());
    router.replace('/(tabs)/home');
  };

  const handleNext = () => {
    if (isLast) {
      handleFinish();
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-canvas px-6 pb-8 pt-4 justify-between">
      {/* Top Bar with Skip */}
      <View className="flex-row items-center justify-end">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleFinish}
          className="min-h-[44px] justify-center px-3">
          <Text className="text-[13.5px] font-semibold text-ink-secondary">
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Slide Content */}
      <View className="items-center justify-center my-auto">
        <Image
          source={slide.image}
          className="h-60 w-60 rounded-xl3"
          resizeMode="cover"
        />

        <Text className="mt-8 text-[28px] font-semibold text-ink text-center leading-8">
          {slide.title}
        </Text>
        <Text className="mt-3 text-[15px] leading-6 text-ink-secondary text-center px-2">
          {slide.body}
        </Text>
      </View>

      {/* Bottom Controls */}
      <View>
        {/* Progress Dots */}
        <View className="mb-6 flex-row items-center justify-center gap-2">
          {slides.map((_, slideIndex) => (
            <View
              key={slideIndex}
              className={cn(
                'h-1.5 rounded-full',
                slideIndex === index ? 'w-8 bg-primary' : 'w-2 bg-line'
              )}
            />
          ))}
        </View>

        {/* Action Button */}
        <AppButton onPress={handleNext}>
          {isLast ? 'Get started' : 'Continue'}
        </AppButton>
      </View>
    </SafeAreaView>
  );
}
