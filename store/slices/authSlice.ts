import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { MobileUser, HistoryEntry } from '@/types';

const AUTH_STORAGE_KEY = 'mha_mobile_auth_state_v2';

export interface AuthState {
  user: MobileUser | null;
  isAuthenticated: boolean;
  isAuthLoaded: boolean;
  accountHistories: Record<string, HistoryEntry[]>;
}

// Initial demo accounts with pre-seeded dispatches
const DEMO_HISTORIES: Record<string, HistoryEntry[]> = {
  'user-demo-1': [
    {
      id: 'disp-demo-101',
      userId: 'user-demo-1',
      userEmail: 'sarah.jenkins@example.com',
      topicId: 'anxiety',
      topicName: 'Anxiety & Panic Attacks',
      method: 'SMS',
      maskedRecipient: '+1 (555) •••-4819',
      sentAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
      status: 'SENT',
    },
    {
      id: 'disp-demo-102',
      userId: 'user-demo-1',
      userEmail: 'sarah.jenkins@example.com',
      topicId: 'stress-burnout',
      topicName: 'Burnout & Exhaustion',
      method: 'EMAIL',
      maskedRecipient: 'm••••••@company.org',
      sentAt: new Date(Date.now() - 1000 * 60 * 60 * 74).toISOString(),
      status: 'SENT',
    },
  ],
  'user-demo-2': [
    {
      id: 'disp-demo-201',
      userId: 'user-demo-2',
      userEmail: 'alex.miller@example.com',
      topicId: 'depression',
      topicName: 'Depression & Heavy Sadness',
      method: 'EMAIL',
      maskedRecipient: 'd•••••@gmail.com',
      sentAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
      status: 'SENT',
    },
  ],
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isAuthLoaded: false,
  accountHistories: DEMO_HISTORIES,
};

export const loadPersistedAuth = createAsyncThunk(
  'auth/loadPersistedAuth',
  async () => {
    try {
      const json = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (json) {
        return JSON.parse(json) as Partial<AuthState>;
      }
    } catch (error) {
      console.warn('Failed to load persisted auth state', error);
    }
    return null;
  }
);

const saveAuthStateToStorage = async (state: AuthState) => {
  try {
    const dataToSave = {
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      accountHistories: state.accountHistories,
    };
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (error) {
    console.warn('Failed to save auth state to AsyncStorage', error);
  }
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<MobileUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      if (!state.accountHistories[action.payload.id]) {
        state.accountHistories[action.payload.id] = [];
      }
      saveAuthStateToStorage(state);
    },
    registerUser: (state, action: PayloadAction<MobileUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      if (!state.accountHistories[action.payload.id]) {
        state.accountHistories[action.payload.id] = [];
      }
      saveAuthStateToStorage(state);
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      saveAuthStateToStorage(state);
    },
    addDispatchToAccount: (
      state,
      action: PayloadAction<{ userId: string; entry: HistoryEntry }>
    ) => {
      const { userId, entry } = action.payload;
      if (!state.accountHistories[userId]) {
        state.accountHistories[userId] = [];
      }
      state.accountHistories[userId] = [
        entry,
        ...state.accountHistories[userId],
      ].slice(0, 100);
      saveAuthStateToStorage(state);
    },
    clearAccountDispatches: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      state.accountHistories[userId] = [];
      saveAuthStateToStorage(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadPersistedAuth.fulfilled, (state, action) => {
      if (action.payload) {
        if (action.payload.user) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
        }
        if (action.payload.accountHistories) {
          state.accountHistories = {
            ...DEMO_HISTORIES,
            ...action.payload.accountHistories,
          };
        }
      }
      state.isAuthLoaded = true;
    });
    builder.addCase(loadPersistedAuth.rejected, (state) => {
      state.isAuthLoaded = true;
    });
  },
});

export const {
  loginUser,
  registerUser,
  logoutUser,
  addDispatchToAccount,
  clearAccountDispatches,
} = authSlice.actions;

export default authSlice.reducer;
