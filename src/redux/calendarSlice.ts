import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Event {
  title: string;
  start: Date;
  end: Date;
}

interface CalendarState {
  selectedDate: Date;
  events: Event[];
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
    addEvent(state, action: PayloadAction<Event>) {
      state.events.push(action.payload);
    },
  },
});

export const { setSelectedDate, addEvent } = calendarSlice.actions;
export default calendarSlice.reducer;