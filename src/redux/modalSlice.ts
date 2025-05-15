// src/redux/modalSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SlotInfo {
  start: Date;
  end: Date;
}

interface ModalState {
  isOpen: boolean;
  title: string;
  slotInfo: SlotInfo | null;
}

const initialState: ModalState = {
  isOpen: false,
  title: '',
  slotInfo: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<SlotInfo>) => {
      state.isOpen = true;
      state.slotInfo = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.title = '';
      state.slotInfo = null;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
});

export const { openModal, closeModal, setTitle } = modalSlice.actions;
export default modalSlice.reducer;
