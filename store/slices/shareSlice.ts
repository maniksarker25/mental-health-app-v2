import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Article, DeliveryMethod, Recipient, Topic } from '@/types';

export interface ShareState {
  selectedTopic: Topic | null;
  selectedArticles: Article[];
  recipient: Recipient | null;
  message: string;
}

const initialState: ShareState = {
  selectedTopic: null,
  selectedArticles: [],
  recipient: null,
  message: '',
};

export const shareSlice = createSlice({
  name: 'share',
  initialState,
  reducers: {
    setSelectedTopic: (state, action: PayloadAction<Topic>) => {
      state.selectedTopic = action.payload;
    },
    setSelectedArticles: (state, action: PayloadAction<Article[]>) => {
      state.selectedArticles = action.payload;
    },
    toggleArticleSelection: (state, action: PayloadAction<Article>) => {
      const exists = state.selectedArticles.some((a) => a.id === action.payload.id);
      if (exists) {
        state.selectedArticles = state.selectedArticles.filter(
          (a) => a.id !== action.payload.id
        );
      } else {
        state.selectedArticles.push(action.payload);
      }
    },
    selectAllArticles: (state, action: PayloadAction<Article[]>) => {
      state.selectedArticles = action.payload;
    },
    clearSelectedArticles: (state) => {
      state.selectedArticles = [];
    },
    setRecipient: (state, action: PayloadAction<Recipient>) => {
      state.recipient = action.payload;
    },
    setDeliveryMethod: (state, action: PayloadAction<DeliveryMethod>) => {
      if (state.recipient) {
        state.recipient.method = action.payload;
      } else {
        state.recipient = { method: action.payload };
      }
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    resetShareFlow: (state) => {
      state.selectedTopic = null;
      state.selectedArticles = [];
      state.recipient = null;
      state.message = '';
    },
  },
});

export const {
  setSelectedTopic,
  setSelectedArticles,
  toggleArticleSelection,
  selectAllArticles,
  clearSelectedArticles,
  setRecipient,
  setDeliveryMethod,
  setMessage,
  resetShareFlow,
} = shareSlice.actions;

export default shareSlice.reducer;

