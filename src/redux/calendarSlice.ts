import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import React from 'react';

// redux 상태에 저장하는 이벤트 타입 (날짜는 string, ISO 포맷)
export interface StoredCalendarEvent {
  id: string;
  title?: React.ReactNode | undefined;
  start: string; // Date → string (ISO format)
  end: string;   // Date → string (ISO format)
  allDay?: boolean | undefined;
  resource?: any;
}

// react-big-calendar에 넘기는 이벤트 타입 (날짜는 Date 객체)
export interface MyCalendarEvent {
  id: string;
  title?: React.ReactNode | undefined;
  start: Date;
  end: Date;
  allDay?: boolean | undefined;
  resource?: any;
}

interface CalendarState {
  selectedDate: string; // Date → string (ISO format)
  events: StoredCalendarEvent[];
}

const initialState: CalendarState = {
  selectedDate: new Date().toISOString(), // Date → string (ISO format)
  events: [],
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setSelectedDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
    },
    addEvent(state, action: PayloadAction<StoredCalendarEvent>) {
      state.events.push(action.payload);
    },
    deleteEvent(state, action: PayloadAction<string>) {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
  },
});

// redux 상태의 StoredCalendarEvent[] → react-big-calendar용 MyCalendarEvent[] 변환 함수
export const convertToMyCalendarEvents = (storedEvents: StoredCalendarEvent[]): MyCalendarEvent[] =>
  storedEvents.map(ev => ({
    ...ev,
    start: new Date(ev.start),
    end: new Date(ev.end),
  }));

export const { setSelectedDate, addEvent, deleteEvent } = calendarSlice.actions;
export default calendarSlice.reducer;

