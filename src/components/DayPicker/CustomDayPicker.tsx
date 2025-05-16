import React, { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { useDispatch, useSelector } from 'react-redux';
import 'react-day-picker/dist/style.css';
import { setSelectedDate } from '../../redux/calendarSlice';
import styles from './DayPicker.module.scss';

const CustomDayPicker = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state: any) => state.calendar.selectedDate);

  const [month, setMonth] = useState(new Date(selectedDate)); // '< > 월 변경'

  // selectedDate가 바뀌면 month도 동기화
  useEffect(() => {
    if (selectedDate) {
      setMonth(new Date(selectedDate));
    }
  }, [selectedDate]);

  return (
    <DayPicker
      mode="single"
      selected={selectedDate ? new Date(selectedDate) : undefined} // string → Date 변환 // 수정
      defaultMonth={new Date()}
      month={month} // 월 상태를 직접 넣음
      onMonthChange={setMonth} // 네비게이션(이전/다음달) 클릭 시 월 변경 처리
      onSelect={(date) => {
        if (date) dispatch(setSelectedDate(date.toISOString())); // Date → string 변환 // 수정
      }}
      classNames={{
        day_selected: styles.selectedDate,
      }}
    />
  );
};

export default CustomDayPicker;