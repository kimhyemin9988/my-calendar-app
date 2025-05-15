import React, { useMemo } from 'react';
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  Event as CalendarEvent,
  Views,
  SlotInfo,
} from 'react-big-calendar';
import {
  format,
  parse,
  startOfWeek,
  getDay,
} from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setSelectedDate } from '../../redux/calendarSlice';
import { openModal } from '../../redux/modalSlice';
import EventModal from '../Modal/EventModal';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
  'ko': require('date-fns/locale/ko'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

const BigCalendarComponent = () => {
  const dispatch = useDispatch();
  const { selectedDate, events } = useSelector((state: RootState) => state.calendar);

  // onSelectSlot 함수에서 slotInfo를 그대로 openModal에 넘김
  const handleSelectSlot = (slotInfo: SlotInfo) => {
    dispatch(setSelectedDate(slotInfo.start));
    dispatch(openModal({ start: slotInfo.start, end: slotInfo.end }));
  };

  const defaultView = Views.WEEK;

  const calendarEvents: CalendarEvent[] = useMemo(() => {
    return events.map((event) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }));
  }, [events]);

  return (
    <>
      <div style={{ height: '80vh' }}>
        <BigCalendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          views={{ week: true }}
          defaultView={defaultView}
          date={new Date(selectedDate)}
          onNavigate={(date) => dispatch(setSelectedDate(date))}
        />
      </div>
      {/* 모달 컴포넌트 포함 */}
      <EventModal />
    </>
  );
};

export default BigCalendarComponent;
