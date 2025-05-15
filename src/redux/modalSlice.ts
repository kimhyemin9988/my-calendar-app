import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SlotInfo {
  start: Date;
  end: Date;
}

type ModalMode = 'edit' | 'view';

interface ModalState {
  isOpen: boolean;
  title: string;
  slotInfo: SlotInfo | null;
  editingEventId: string | null;
  mode: ModalMode;
}

const initialState: ModalState = {
  isOpen: false,
  title: '',
  slotInfo: null,
  editingEventId: null,
  mode: 'edit',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ start: Date; end: Date; mode?: ModalMode }>
    ) => {
      state.isOpen = true;
      state.slotInfo = { start: action.payload.start, end: action.payload.end };
      state.editingEventId = null;
      state.mode = action.payload.mode || 'edit';
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.title = '';
      state.slotInfo = null;
      state.editingEventId = null;
      state.mode = 'edit';
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setSlotInfo: (state, action: PayloadAction<SlotInfo | null>) => {
      state.slotInfo = action.payload;
    },
    setEditingEventId: (state, action: PayloadAction<string | null>) => {
      state.editingEventId = action.payload;
    },
    setMode: (state, action: PayloadAction<ModalMode>) => {
      state.mode = action.payload;
    },
    openModalWithEvent: (
      state,
      action: PayloadAction<{
        slotInfo: SlotInfo;
        title: string;
        id: string;
        mode?: ModalMode;
      }>
    ) => {
      state.isOpen = true;
      state.slotInfo = action.payload.slotInfo;
      state.title = action.payload.title;
      state.editingEventId = action.payload.id;
      state.mode = action.payload.mode || 'view';
    },
  },
});

export const {
  openModal,
  closeModal,
  setTitle,
  setSlotInfo,
  setEditingEventId,
  setMode,
  openModalWithEvent,
} = modalSlice.actions;

export default modalSlice.reducer;
