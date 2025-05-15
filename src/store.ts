import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './redux/calendarSlice'; // 캘린더 slice import
import modalReducer from './redux/modalSlice';

const store = configureStore({
reducer: {
    calendar: calendarReducer,
    modal: modalReducer, // ✅ 이 줄 추가!
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;