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

// react-big-calendar 컴포넌트에 넘기는 이벤트 타입 (날짜는 Date 객체)
export interface MyCalendarEvent { // react-big-calendar의 Event 에서 확장함
  id: string;
  title?: React.ReactNode | undefined;
  start: Date;
  end: Date;
  allDay?: boolean | undefined;
  resource?: any;
}

interface CalendarState {
  selectedDate: string; // Date → string (ISO format)
  events: StoredCalendarEvent[]; // redux 상태에 저장
}

const initialState: CalendarState = {
  selectedDate: new Date().toISOString(), // Date → string (ISO format)
  events: [], // StoredCalendarEvent[]
};

const calendarSlice = createSlice({
  name: 'calendar', // 이름
  initialState, // 초기값
  reducers: {
    setSelectedDate(state, action: PayloadAction<string>) {
      // 선택된 날짜 (2025-05-20) 저장
      state.selectedDate = action.payload;
    },
    addEvent(state, action: PayloadAction<StoredCalendarEvent>) {
      //redux 상태에 일정 ( ex) "회의" )저장
      state.events.push(action.payload);
    },
    deleteEvent(state, action: PayloadAction<string>) {
      state.events = state.events.filter(event => event.id !== action.payload);
      // event
    },
  },
});

// redux 상태의 StoredCalendarEvent → react-big-calendar용 MyCalendarEvent 변환 함수
export const convertToMyCalendarEvents = (storedEvents: StoredCalendarEvent[]): MyCalendarEvent[] =>
  storedEvents.map(ev => ({
    ...ev,
    start: new Date(ev.start),
    end: new Date(ev.end),
  }));

export const { setSelectedDate, addEvent, deleteEvent } = calendarSlice.actions;
export default calendarSlice.reducer;

