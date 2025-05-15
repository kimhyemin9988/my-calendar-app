import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface MyCalendarEvent { // <= Event  'react-big-calendar'에서 추가
  id: string; // 고유 ID 추가
  title?: React.ReactNode | undefined;
  start: Date; // 또는 Date
  end: Date; // undefined
  allDay?: boolean | undefined;
  resource?: any;
}

interface CalendarState {
  selectedDate: Date;
  events: MyCalendarEvent[];
}

const initialState: CalendarState = {
  selectedDate: new Date(),
  events: [],
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setSelectedDate(state, action: PayloadAction<Date>) {
      state.selectedDate = action.payload;
    },
    addEvent(state, action: PayloadAction<MyCalendarEvent>) {
      state.events.push(action.payload);
    },
    deleteEvent(state, action: PayloadAction<string>) {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
  },
});

export const { setSelectedDate, addEvent, deleteEvent } = calendarSlice.actions;
export default calendarSlice.reducer;

