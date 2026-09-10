export type TopicId =
  | 'anxiety'
  | 'depression'
  | 'stress-burnout'
  | 'substance-abuse'
  | 'grief-loss'
  | 'dementia'
  | 'trauma'
  | 'eating-disorders';

export type TopicTone = 'mist' | 'lavender' | 'sky' | 'sand' | 'blush';

export interface Topic {
  id: TopicId;
  name: string;
  shortDescription: string;
  intro: string;
  packetTitle: string;
  packetItems: string[];
  tone: TopicTone;
  icon: string;
}

export type DeliveryMethod = 'EMAIL' | 'SMS';

export type ShareStatus = 'SENT' | 'FAILED';

export interface Recipient {
  method: DeliveryMethod;
  email?: string;
  countryCode?: string;
  phone?: string;
}

export interface CreateSharePayload {
  topicId: TopicId;
  deliveryMethod: DeliveryMethod;
  recipient: string;
  message?: string;
  userId?: string;
  userEmail?: string;
}

export interface CreateShareResponse {
  success: boolean;
  shareId: string;
  status: ShareStatus;
}

export interface MobileUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  avatarColor?: string;
}

export interface HistoryEntry {
  id: string;
  userId?: string;
  userEmail?: string;
  topicId: TopicId;
  topicName: string;
  method: DeliveryMethod;
  maskedRecipient: string;
  sentAt: string;
  status: ShareStatus;
}

export interface PackageTier {
  id: string;
  name: string;
  price: number;
  currency: string;
  badge?: string;
  popular?: boolean;
  tagline: string;
  description: string;
  features: string[];
  ctaLabel: string;
}
