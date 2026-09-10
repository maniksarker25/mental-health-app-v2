import { z } from 'zod';

export const MESSAGE_MAX_LENGTH = 240;

export const emailRecipientSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Enter an email address so we know where to send it.')
    .email('That email address doesn’t look quite right.'),
});

export const smsRecipientSchema = z.object({
  countryCode: z
    .string()
    .trim()
    .regex(/^\+\d{1,4}$/, 'Choose a country code.'),
  phone: z
    .string()
    .trim()
    .min(1, 'Enter a phone number so we know where to send it.')
    .regex(/^[\d\s-]{6,15}$/, 'Enter a valid phone number, digits only.'),
});

export const recipientSchema = z.discriminatedUnion('method', [
  z.object({ method: z.literal('EMAIL') }).merge(emailRecipientSchema),
  z.object({ method: z.literal('SMS') }).merge(smsRecipientSchema),
]);

export type RecipientFormValues = z.infer<typeof recipientSchema>;

export const messageSchema = z.object({
  message: z
    .string()
    .trim()
    .max(MESSAGE_MAX_LENGTH, `Keep it under ${MESSAGE_MAX_LENGTH} characters.`)
    .optional(),
});

export type EmailRecipientValues = z.infer<typeof emailRecipientSchema>;
export type SmsRecipientValues = z.infer<typeof smsRecipientSchema>;
export type MessageValues = z.infer<typeof messageSchema>;
