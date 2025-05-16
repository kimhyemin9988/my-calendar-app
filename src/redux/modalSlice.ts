import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SlotInfo {
  start: string; // Date → string (ISO format) // 수정: 날짜 타입을 string으로 통일
  end: string;   // Date → string (ISO format) // 수정: 날짜 타입을 string으로 통일
}

type ModalMode = 'edit' | 'view'; // 생성 | 보기+삭제 모드

interface ModalState {
  isOpen: boolean;
  title: string;
  slotInfo: SlotInfo | null; //   시작/종료 시간
  editingEventId: string | null;
  mode: ModalMode;
}

const initialState: ModalState = {
  isOpen: false, // 닫힌상태
  title: '',
  slotInfo: null, // 초기값은 null에서 open시 start,end 상태 변경
  editingEventId: null,
  mode: 'edit',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (
      // open상태 (저장은 x)
      state,
      action: PayloadAction<{ start: string; end: string; mode?: ModalMode }>
      // { start: Date; end: Date } → { start: string; end: string }로 변경 // 수정
    ) => {
      state.isOpen = true;
      state.slotInfo = {
        start: action.payload.start,
        end: action.payload.end, // 클릭한 셀 시작, 끝 시간
      };
      state.editingEventId = null;
      state.mode = action.payload.mode || 'edit';
      // action.payload.mode가 undefined이면 기본값으로 'edit' 사용
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
      // start, end가 string 타입인 slotInfo로 변경 
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

