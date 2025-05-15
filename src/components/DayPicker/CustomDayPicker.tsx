import React from 'react';
import { DayPicker } from 'react-day-picker';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDate } from '../../redux/calendarSlice';

const CustomDayPicker = () => {
    const dispatch = useDispatch();
    const selectedDate = useSelector((state: any) => state.calendar.selectedDate);

  return (
    <DayPicker
      mode="single"
      selected={selectedDate}
      onSelect={(date) => {
        if (date) dispatch(setSelectedDate(date));
      }}
    />
  );
  };
  
export default CustomDayPicker;