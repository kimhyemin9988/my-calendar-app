import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './redux/calendarSlice'; // 캘린더 slice import
import modalReducer from './redux/modalSlice';

const store = configureStore({
reducer: {
    calendar: calendarReducer,
    modal: modalReducer, // 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;