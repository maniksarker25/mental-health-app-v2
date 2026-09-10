import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DeliveryMethod, Recipient, Topic } from '@/types';

export interface ShareState {
  selectedTopic: Topic | null;
  recipient: Recipient | null;
  message: string;
}

const initialState: ShareState = {
  selectedTopic: null,
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
      state.recipient = null;
      state.message = '';
    },
  },
});

export const {
  setSelectedTopic,
  setRecipient,
  setDeliveryMethod,
  setMessage,
  resetShareFlow,
} = shareSlice.actions;

export default shareSlice.reducer;
