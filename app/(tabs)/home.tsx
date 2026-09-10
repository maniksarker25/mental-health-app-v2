import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { PACKAGES } from '@/data/packages';
import { APP_VIDEO_CONFIG } from '@/data/videoConfig';
import { PrivacyNotice } from '@/components/ui/shared/PrivacyNotice';
import type { PackageTier } from '@/types';

const TOTAL_DURATION_SECONDS = 102; // 1 min 42 sec

const DISPATCH_STEPS = [
  {
    number: '1',
    title: 'Choose a Condition & Topic',
    description:
      'Select what your friend or relative is experiencing — Anxiety & Panic, Burnout, Depression, or Grief.',
    icon: 'book-outline',
  },
  {
    number: '2',
    title: 'Provide SMS or Email',
    description:
      'Recipient contact details are processed in volatile memory only and permanently wiped immediately after dispatch.',
    icon: 'shield-checkmark-outline',
  },
  {
    number: '3',
    title: 'They Receive Safe Guidance',
    description:
      'They open a private web packet with grounding tools and symptom mechanics — no account required, no pressure.',
    icon: 'heart-circle-outline',
  },
];

export default function HomeScreen() {
  const router = useRouter();

  // Standard Video Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Playback timer simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= TOTAL_DURATION_SECONDS) {
            setIsPlaying(false);
            return TOTAL_DURATION_SECONDS;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const togglePlay = () => {
    if (currentTime >= TOTAL_DURATION_SECONDS) {
      setCurrentTime(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (deltaSeconds: number) => {
    setCurrentTime((prev) => {
      const next = Math.max(0, Math.min(TOTAL_DURATION_SECONDS, prev + deltaSeconds));
      return next;
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = (currentTime / TOTAL_DURATION_SECONDS) * 100;

  const handleSelectPackage = (pkg: PackageTier) => {
    router.push('/(tabs)/topics');
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-canvas">
      {/* Top Header Bar */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-line bg-surface">
        <View className="flex-row items-center gap-2.5">
          <View className="h-8 w-8 items-center justify-center rounded-xl bg-primary">
            <Ionicons name="heart" size={16} color="#FFFFFF" />
          </View>
          <View>
            <Text className="text-[14px] font-bold text-ink">Mental Health</Text>
            <Text className="text-[10px] font-semibold tracking-wider text-sage uppercase">
              Anonymous Mention
            </Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push('/(tabs)/settings')}
          accessibilityLabel="Settings"
          className="h-9 w-9 items-center justify-center rounded-full bg-canvas border border-line active:bg-elevated">
          <Ionicons name="settings-outline" size={17} color="#6B7A75" />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-16"
        showsVerticalScrollIndicator={false}>
        
        {/* Hero Section */}
        <View className="px-4 pt-5 pb-6 bg-surface border-b border-line">
          <View className="self-start rounded-full bg-mist px-3 py-1 mb-2.5">
            <Text className="text-[10.5px] font-bold tracking-wider text-forest uppercase">
              100% Confidential · Zero Tracking
            </Text>
          </View>

          <Text className="text-[23px] font-bold text-ink leading-7 sm:text-[26px]">
            When talking directly feels hard, send support first
          </Text>

          <Text className="mt-2 text-[13px] leading-relaxed text-ink-secondary sm:text-[14px]">
            If a friend, relative, or loved one is struggling with anxiety, depression, burnout, or any difficult crisis, send them a caring anonymous message with clinical toolkits.
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/(tabs)/topics')}
            style={{ backgroundColor: '#2E5E52' }}
            className="mt-4 w-full flex-row items-center justify-center rounded-2xl py-3.5 px-4 shadow-sm active:opacity-90">
            <Ionicons name="paper-plane" size={16} color="#FFFFFF" />
            <Text className="ml-2 text-[14.5px] font-semibold text-white">
              Send an Anonymous Message
            </Text>
          </TouchableOpacity>
        </View>

        {/* Standard Video Player Section (YouTube / Universal Player UI) */}
        <View className="px-4 pt-6 pb-2">
          <View className="mb-3">
            <Text className="text-[11px] font-bold uppercase tracking-wider text-sage">
              How It Works
            </Text>
            <Text className="mt-0.5 text-[17px] font-bold text-ink sm:text-[19px]">
              {APP_VIDEO_CONFIG.title}
            </Text>
            <Text className="mt-0.5 text-[12.5px] text-ink-secondary leading-snug">
              {APP_VIDEO_CONFIG.subtitle}
            </Text>
          </View>

          {/* Standard Video Player Card */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setShowControls((prev) => !prev)}
            className="w-full overflow-hidden rounded-3xl border border-line bg-black shadow-md">
            <View className="relative h-60 w-full justify-between p-3.5 sm:h-72">
              {/* Video Poster Thumbnail Background */}
              <Image
                source={{
                  uri: APP_VIDEO_CONFIG.posterUrl,
                }}
                className={`absolute inset-0 h-full w-full object-cover ${
                  isPlaying ? 'opacity-40' : 'opacity-70'
                }`}
              />

              {/* Dark Ambient Overlay */}
              <View className="absolute inset-0 bg-black/40" />

              {/* Video Top Bar */}
              <View className="relative z-10 flex-row items-center justify-between">
                <View className="flex-row items-center rounded-full bg-black/70 px-3 py-1">
                  <View className={`h-2 w-2 rounded-full mr-2 ${isPlaying ? 'bg-red-500' : 'bg-white/60'}`} />
                  <Text className="text-[11px] font-semibold text-white">
                    {isPlaying ? 'Playing' : 'Overview'}
                  </Text>
                </View>

                <View className="flex-row items-center gap-2">
                  <TouchableOpacity
                    onPress={() => setIsMuted(!isMuted)}
                    className="h-8 w-8 items-center justify-center rounded-full bg-black/70 active:bg-black">
                    <Ionicons
                      name={isMuted ? 'volume-mute' : 'volume-high'}
                      size={16}
                      color="#FFFFFF"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Center Big Play / Pause / Replay Button */}
              <View className="relative z-10 items-center justify-center my-auto">
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={togglePlay}
                  className="h-16 w-16 items-center justify-center rounded-full bg-black/75 border-2 border-white/80 shadow-xl active:opacity-80">
                  <Ionicons
                    name={
                      currentTime >= TOTAL_DURATION_SECONDS
                        ? 'reload'
                        : isPlaying
                        ? 'pause'
                        : 'play'
                    }
                    size={28}
                    color="#FFFFFF"
                    style={
                      !isPlaying && currentTime < TOTAL_DURATION_SECONDS
                        ? { marginLeft: 3 }
                        : {}
                    }
                  />
                </TouchableOpacity>
              </View>

              {/* Bottom YouTube-Style Standard Video Control Bar */}
              <View className="relative z-10 rounded-2xl bg-black/85 p-3">
                {/* Scrubber Progress Bar */}
                <View className="h-1.5 w-full overflow-hidden rounded-full bg-white/25 mb-2.5">
                  <View
                    className="h-full bg-red-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </View>

                {/* Control Actions Row */}
                <View className="flex-row items-center justify-between">
                  {/* Left: Play/Pause, -10s, +10s */}
                  <View className="flex-row items-center gap-3">
                    <TouchableOpacity onPress={togglePlay} className="p-1">
                      <Ionicons
                        name={isPlaying ? 'pause' : 'play'}
                        size={18}
                        color="#FFFFFF"
                      />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleSeek(-10)} className="p-1">
                      <Ionicons name="refresh-outline" size={17} color="#D1D5DB" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleSeek(10)} className="p-1">
                      <Ionicons name="play-forward-outline" size={17} color="#D1D5DB" />
                    </TouchableOpacity>

                    {/* Timecode */}
                    <Text className="text-[11px] font-semibold text-white ml-1">
                      {formatTime(currentTime)} / {formatTime(TOTAL_DURATION_SECONDS)}
                    </Text>
                  </View>

                  {/* Right: Fullscreen hint */}
                  <View className="flex-row items-center gap-2">
                    <TouchableOpacity
                      onPress={togglePlay}
                      className="rounded-full bg-white/15 px-2.5 py-1">
                      <Text className="text-[10.5px] font-semibold text-white">
                        {isPlaying ? 'Pause' : 'Play Video'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* 3-Step Process Cards */}
        <View className="px-4 pt-5 pb-5">
          <Text className="text-[11px] font-bold uppercase tracking-wider text-sage">
            3-Step Process
          </Text>
          <Text className="mt-0.5 text-[17px] font-bold text-ink sm:text-[19px]">
            How your message is delivered
          </Text>

          <View className="mt-3 gap-2.5">
            {DISPATCH_STEPS.map((step) => (
              <View
                key={step.number}
                className="flex-row items-start rounded-2xl border border-line bg-surface p-3.5">
                <View className="mr-3 h-9 w-9 items-center justify-center rounded-xl bg-mist shrink-0">
                  <Ionicons name={step.icon as any} size={18} color="#2E5E52" />
                </View>
                <View className="flex-1">
                  <Text className="text-[10.5px] font-bold text-forest uppercase">
                    Step {step.number}
                  </Text>
                  <Text className="text-[13.5px] font-semibold text-ink mt-0.5">
                    {step.title}
                  </Text>
                  <Text className="mt-0.5 text-[12px] leading-relaxed text-ink-secondary">
                    {step.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Ultra-Responsive Packages Section */}
        <View className="w-full px-4 pt-5 pb-6 bg-surface border-t border-b border-line">
          <View className="mb-3.5">
            <Text className="text-[11px] font-bold uppercase tracking-wider text-sage">
              One-Time Packages
            </Text>
            <Text className="mt-0.5 text-[17px] font-bold text-ink sm:text-[19px]">
              Choose your dispatch package
            </Text>
            <Text className="mt-0.5 text-[12px] text-ink-secondary leading-snug">
              Every package is 100% one-time per use. No subscriptions or recurring charges.
            </Text>
          </View>

          {/* Package Cards List (Fully Responsive) */}
          <View className="w-full gap-3.5">
            {PACKAGES.map((pkg) => (
              <View
                key={pkg.id}
                className={`w-full rounded-2xl border p-4 shadow-xs ${
                  pkg.popular
                    ? 'border-forest bg-mist/20 ring-1 ring-forest'
                    : 'border-line bg-canvas'
                }`}>
                
                {/* Responsive Header (Top Row: Badge, Title & Price) */}
                <View className="w-full">
                  {pkg.badge && (
                    <View className="self-start mb-2">
                      <View
                        className={`rounded-full px-2.5 py-0.5 ${
                          pkg.popular ? 'bg-primary' : 'bg-line'
                        }`}>
                        <Text
                          className={`text-[9.5px] font-bold uppercase tracking-wider ${
                            pkg.popular ? 'text-white' : 'text-ink-secondary'
                          }`}>
                          {pkg.badge}
                        </Text>
                      </View>
                    </View>
                  )}

                  <View className="w-full flex-row items-baseline justify-between gap-2">
                    <View className="flex-1 pr-2">
                      <Text className="text-[17px] font-bold text-ink leading-snug">
                        {pkg.name}
                      </Text>
                      <Text className="mt-0.5 text-[12px] text-ink-secondary leading-snug">
                        {pkg.tagline}
                      </Text>
                    </View>

                    <View className="items-end shrink-0">
                      <Text className="text-[22px] font-bold text-ink leading-tight">
                        ${pkg.price}
                      </Text>
                      <Text className="text-[10px] font-medium text-ink-tertiary">
                        USD · One-Time
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Features List */}
                <View className="mt-3.5 w-full border-t border-line/60 pt-3 gap-2">
                  {pkg.features.map((feat, idx) => (
                    <View key={idx} className="w-full flex-row items-start gap-2">
                      <Ionicons
                        name="checkmark-circle"
                        size={15}
                        color="#2E5E52"
                        style={{ marginTop: 1 }}
                      />
                      <Text className="flex-1 text-[12px] leading-snug text-ink-secondary">
                        {feat}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Purchase / Select Button */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleSelectPackage(pkg)}
                  style={{
                    backgroundColor: pkg.popular ? '#2E5E52' : '#FFFFFF',
                    borderColor: pkg.popular ? '#2E5E52' : '#E6E9E2',
                    borderWidth: 1,
                  }}
                  className="mt-4 w-full flex-row items-center justify-center rounded-xl py-3.5 px-3 shadow-xs active:opacity-90">
                  <Text
                    style={{ color: pkg.popular ? '#FFFFFF' : '#18231F' }}
                    className="text-[13.5px] font-bold">
                    {pkg.ctaLabel}
                  </Text>
                  <Ionicons
                    name="arrow-forward"
                    size={14}
                    color={pkg.popular ? '#FFFFFF' : '#2E5E52'}
                    style={{ marginLeft: 6 }}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Bottom Privacy & Zero Retention Card */}
        <View className="px-4 pt-5">
          <PrivacyNotice tone="soft">
            Recipient numbers and emails are held temporarily in volatile memory only for the seconds required to deliver the message, and are permanently purged immediately afterward.
          </PrivacyNotice>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
