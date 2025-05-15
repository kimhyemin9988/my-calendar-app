import React, { useMemo } from 'react';
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
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
import { openModal, openModalWithEvent, setEditingEventId, setSlotInfo, setTitle } from '../../redux/modalSlice';
import EventModal from '../Modal/EventModal';
import { MyCalendarEvent } from '../../redux/calendarSlice';



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

  const calendarEvents: MyCalendarEvent[] = useMemo(() => {
  return events.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));
}, [events]);


  const handleSelectEvent = (event: MyCalendarEvent) => {
      if (!event.start || !event.end || !event.title || !event.id) {
        // start, end, title이 없으면 처리 중단
        return;
      }
    const titleStr = typeof event.title === 'string' ? event.title : '';

    dispatch(setSelectedDate(event.start));
    dispatch(setTitle(titleStr));
    dispatch(setSlotInfo({ start: event.start, end: event.end }));
    dispatch(setEditingEventId(event.id)); // 편집 중인 이벤트 아이디 설정
    dispatch(
    openModalWithEvent({
      slotInfo: { start: event.start, end: event.end },
      title: titleStr,
      id: event.id,
      mode: 'view',
    })
  );
  };

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
          onSelectEvent={handleSelectEvent}
        />
      </div>
      {/* 모달 컴포넌트 포함 */}
      <EventModal />
    </>
  );
};

export default BigCalendarComponent;