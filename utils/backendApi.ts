import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

interface ApiEnvelope<T> {
  success?: boolean;
  message?: string;
  data?: T;
}

interface SessionTokens {
  accessToken: string;
  refreshToken: string;
}

const ACCESS_TOKEN_KEY = 'mha_mobile_access_token';
const REFRESH_TOKEN_KEY = 'mha_mobile_refresh_token';

export class BackendApiError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
    this.name = 'BackendApiError';
  }
}

function getApiBaseUrl(): string {
  const configuredUrl = process.env.EXPO_PUBLIC_API_BASE_URL?.trim();
  if (!configuredUrl) {
    throw new BackendApiError(
      'The API URL is not configured. Set EXPO_PUBLIC_API_BASE_URL and restart the app.',
      500
    );
  }

  const normalizedUrl = configuredUrl.replace(/\/+$/, '');
  if (normalizedUrl.endsWith('/api/v1')) return normalizedUrl;
  if (normalizedUrl.endsWith('/api')) return `${normalizedUrl}/v1`;
  return `${normalizedUrl}/api/v1`;
}

async function getStoredValue(key: string): Promise<string | null> {
  return Platform.OS === 'web'
    ? AsyncStorage.getItem(key)
    : SecureStore.getItemAsync(key);
}

async function setStoredValue(key: string, value: string): Promise<void> {
  if (Platform.OS === 'web') {
    await AsyncStorage.setItem(key, value);
    return;
  }
  await SecureStore.setItemAsync(key, value);
}

async function removeStoredValue(key: string): Promise<void> {
  if (Platform.OS === 'web') {
    await AsyncStorage.removeItem(key);
    return;
  }
  await SecureStore.deleteItemAsync(key);
}

export async function saveSessionTokens(tokens: SessionTokens): Promise<void> {
  try {
    await Promise.all([
      setStoredValue(ACCESS_TOKEN_KEY, tokens.accessToken),
      setStoredValue(REFRESH_TOKEN_KEY, tokens.refreshToken),
    ]);
  } catch (error) {
    await clearSessionTokens();
    throw error;
  }
}

export async function clearSessionTokens(): Promise<void> {
  await Promise.all([
    removeStoredValue(ACCESS_TOKEN_KEY),
    removeStoredValue(REFRESH_TOKEN_KEY),
  ]);
}

export async function hasAccessToken(): Promise<boolean> {
  return Boolean(await getStoredValue(ACCESS_TOKEN_KEY));
}

async function readEnvelope<T>(
  path: string,
  init: RequestInit,
  accessToken?: string
): Promise<{ response: Response; envelope: ApiEnvelope<T> }> {
  let response: Response;
  try {
    response = await fetch(`${getApiBaseUrl()}/${path.replace(/^\/+/, '')}`, {
      ...init,
      headers: {
        Accept: 'application/json',
        ...init.headers,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    });
  } catch {
    throw new BackendApiError('Could not connect to the mental-health API.', 502);
  }

  let envelope: ApiEnvelope<T>;
  try {
    envelope = (await response.json()) as ApiEnvelope<T>;
  } catch {
    throw new BackendApiError('The API returned an invalid response.', 502);
  }

  return { response, envelope };
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = await getStoredValue(REFRESH_TOKEN_KEY);
  if (!refreshToken) return null;

  const { response, envelope } = await readEnvelope<{ accessToken?: string }>(
    'auth/refresh-token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `refreshToken=${encodeURIComponent(refreshToken)}`,
      },
      body: JSON.stringify({}),
    }
  );
  const accessToken = envelope.data?.accessToken;
  if (!response.ok || envelope.success === false || typeof accessToken !== 'string') {
    await clearSessionTokens();
    return null;
  }

  await setStoredValue(ACCESS_TOKEN_KEY, accessToken);
  return accessToken;
}

export async function backendRequest<T>(
  path: string,
  init: RequestInit = {},
  requiresAuth = false
): Promise<T> {
  let accessToken = requiresAuth ? await getStoredValue(ACCESS_TOKEN_KEY) : null;
  if (requiresAuth && !accessToken) {
    accessToken = await refreshAccessToken();
  }
  if (requiresAuth && !accessToken) {
    throw new BackendApiError('Please sign in again to continue.', 401);
  }

  let { response, envelope } = await readEnvelope<T>(path, init, accessToken || undefined);
  if (requiresAuth && response.status === 401) {
    accessToken = await refreshAccessToken();
    if (!accessToken) {
      throw new BackendApiError('Your sign-in session has expired. Please sign in again.', 401);
    }
    ({ response, envelope } = await readEnvelope<T>(path, init, accessToken));
  }

  if (!response.ok || envelope.success === false) {
    throw new BackendApiError(
      envelope.message || 'The request could not be completed.',
      response.status
    );
  }
  if (envelope.data === undefined) {
    throw new BackendApiError('The API response did not contain the expected data.', 502);
  }
  return envelope.data;
}

export async function authenticateUser(email: string, password: string) {
  const authData = await backendRequest<{
    accessToken: string;
    refreshToken: string;
    role: string;
  }>('auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, platform: Platform.OS, role: 'user' }),
  });
  if (authData.role !== 'user') {
    throw new BackendApiError('This account cannot sign in as a regular user.', 403);
  }

  await saveSessionTokens(authData);
  try {
    return await backendRequest<unknown>('user/get-my-profile', {}, true);
  } catch (error) {
    await clearSessionTokens();
    throw error;
  }
}

export async function registerAccount(input: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}): Promise<void> {
  const nameParts = input.name.trim().split(/\s+/).filter(Boolean);
  const [firstName, ...lastNameParts] = nameParts;
  if (!firstName) {
    throw new BackendApiError('Please enter your name or alias.', 400);
  }

  await backendRequest<unknown>('user/sign-up', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userData: {
        firstName,
        lastName: lastNameParts.join(' ') || firstName,
        email: input.email,
      },
      password: input.password,
      confirmPassword: input.confirmPassword,
      platform: Platform.OS,
    }),
  });
}

export async function verifyRegistration(email: string, verifyCode: string) {
  const authData = await backendRequest<{
    accessToken: string;
    refreshToken: string;
    role: string;
  }>('user/verify-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, verifyCode: Number(verifyCode) }),
  });
  if (authData.role !== 'user') {
    throw new BackendApiError('This registration is not a regular-user account.', 403);
  }

  await saveSessionTokens(authData);
  try {
    return await backendRequest<unknown>('user/get-my-profile', {}, true);
  } catch (error) {
    await clearSessionTokens();
    throw error;
  }
}

export async function resendRegistrationCode(email: string): Promise<void> {
  await backendRequest<unknown>('user/resend-verify-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
}

export function toMobileUser(profile: unknown, fallbackEmail: string) {
  if (typeof profile !== 'object' || profile === null) {
    throw new BackendApiError('The API returned an invalid user profile.', 502);
  }
  const data = profile as Record<string, unknown>;
  const email = typeof data.email === 'string' ? data.email : fallbackEmail;
  const name =
    (typeof data.name === 'string' && data.name.trim()) ||
    (typeof data.fullName === 'string' && data.fullName.trim()) ||
    [data.firstName, data.lastName]
      .filter((part): part is string => typeof part === 'string' && Boolean(part.trim()))
      .join(' ') ||
    email.split('@')[0] ||
    'Member';
  const id =
    typeof data.profileId === 'string'
      ? data.profileId
      : typeof data._id === 'string'
        ? data._id
        : typeof data.id === 'string'
          ? data.id
          : email;

  return { id, name, email, createdAt: new Date().toISOString() };
}

export function createIdempotencyKey(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (character) => {
    const random = Math.floor(Math.random() * 16);
    return (character === 'x' ? random : (random & 0x3) | 0x8).toString(16);
  });
}
