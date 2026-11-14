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
  id: string;
  apiId?: string;
  slug?: string;
  name: string;
  shortDescription: string;
  intro: string;
  packetTitle: string;
  packetItems: string[];
  tone: TopicTone;
  icon: string;
}

export interface Article {
  id: string;
  topicId: string;
  slug?: string;
  title: string;
  excerpt: string;
  readTime: string;
  category: string;
  url: string;
  featured?: boolean;
}

export type DeliveryMethod = 'EMAIL' | 'SMS';

export type ShareStatus = 'SENT' | 'QUEUED' | 'FAILED';

export interface Recipient {
  method: DeliveryMethod;
  name?: string;
  email?: string;
  countryCode?: string;
  phone?: string;
}

export interface CreateSharePayload {
  topic: string;
  channel: 'email' | 'sms';
  recipientEmail?: string;
  recipientPhone?: string;
  recipientName?: string;
  customNote?: string;
  articles: string[];
  senderAttestation: true;
  idempotencyKey: string;
}

export interface CreateShareResponse {
  success: boolean;
  messageId: string;
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
  topicId: string;
  topicName: string;
  articles?: Article[];
  extraResourcesCount?: number;
  method: DeliveryMethod;
  maskedRecipient: string;
  sentAt: string;
  formattedDate?: string;
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
