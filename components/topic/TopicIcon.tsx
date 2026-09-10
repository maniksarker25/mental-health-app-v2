import React from 'react';
import { View } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import type { TopicTone } from '@/types';
import { cn } from '@/utils/format';

const toneClasses: Record<TopicTone, { bg: string; color: string }> = {
  mist: { bg: 'bg-mist', color: '#22463D' },
  lavender: { bg: 'bg-lavender', color: '#4B4664' },
  sky: { bg: 'bg-sky', color: '#3B5B66' },
  sand: { bg: 'bg-sand', color: '#6A5843' },
  blush: { bg: 'bg-blush', color: '#6B4E4A' },
};

interface TopicIconProps {
  icon: string;
  tone: TopicTone;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function TopicIcon({
  icon,
  tone,
  size = 'md',
  className,
}: TopicIconProps) {
  const toneStyle = toneClasses[tone] || toneClasses.mist;

  const boxSize =
    size === 'lg'
      ? 'h-16 w-16 rounded-3xl'
      : size === 'sm'
      ? 'h-10 w-10 rounded-xl'
      : 'h-12 w-12 rounded-2xl';

  const glyphSize = size === 'lg' ? 28 : size === 'sm' ? 18 : 22;

  const renderIcon = () => {
    switch (icon) {
      case 'wind':
        return <Feather name="wind" size={glyphSize} color={toneStyle.color} />;
      case 'cloud':
        return <Ionicons name="cloud-outline" size={glyphSize} color={toneStyle.color} />;
      case 'flame':
        return <Ionicons name="flame-outline" size={glyphSize} color={toneStyle.color} />;
      case 'shield':
        return <Ionicons name="shield-checkmark-outline" size={glyphSize} color={toneStyle.color} />;
      case 'heart':
        return <Ionicons name="heart-outline" size={glyphSize} color={toneStyle.color} />;
      case 'brain':
        return <MaterialCommunityIcons name="brain" size={glyphSize} color={toneStyle.color} />;
      case 'anchor':
        return <Feather name="anchor" size={glyphSize} color={toneStyle.color} />;
      case 'utensils':
        return <Ionicons name="restaurant-outline" size={glyphSize} color={toneStyle.color} />;
      default:
        return <Ionicons name="heart-outline" size={glyphSize} color={toneStyle.color} />;
    }
  };

  return (
    <View
      className={cn(
        'items-center justify-center',
        boxSize,
        toneStyle.bg,
        className
      )}>
      {renderIcon()}
    </View>
  );
}
