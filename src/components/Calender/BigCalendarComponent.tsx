import React, { useMemo } from 'react';
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  Views,
  SlotInfo, // 컴포넌트 이벤트는 modalSlice의 SlotInfo 사용(x)
  // react-big-calendar의 SlotInfo 사용
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
import { setSelectedDate, convertToMyCalendarEvents, MyCalendarEvent } from '../../redux/calendarSlice';
import {
  openModal,
  openModalWithEvent,
  setEditingEventId,
  setSlotInfo,
  setTitle,
} from '../../redux/modalSlice';
import EventModal from '../Modal/EventModal';
import styles from './Calendar.module.scss';

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

  // 이벤트 변환: StoredCalendarEvent[] → MyCalendarEvent[]
  const calendarEvents = useMemo(() => {
    return convertToMyCalendarEvents(events);
  }, [events]);

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    // 캘린더 셀 클릭
    // slotInfo -> start , end
    // react-big-calendar의 SlotInfo 사용한 뒤 redux는 string으로 저장
    dispatch(setSelectedDate(slotInfo.start.toISOString())); // string으로 저장
    dispatch(
      openModal({
        // 기본 생성 모드
        start: slotInfo.start.toISOString(), // string으로 저장
        end: slotInfo.end.toISOString(),
      })
    );
  };

  const defaultView = Views.WEEK;
  //react-big-calendar의 주간 보기

  const handleSelectEvent = (event: MyCalendarEvent) => {
    // MyCalendarEvent (start, end는 Date)
    if (!event.start || !event.end || !event.title || !event.id) return;

    const titleStr = typeof event.title === 'string' ? event.title : '';

    dispatch(setSelectedDate(event.start.toISOString()));
    dispatch(setTitle(titleStr)); 
    dispatch(
      setSlotInfo({
        start: event.start.toISOString(), // Date -> string으로 변환
        end: event.end.toISOString(),
      })
    );
    dispatch(setEditingEventId(event.id));
    dispatch(
      openModalWithEvent({
        slotInfo: {
          start: event.start.toISOString(), // string으로 저장
          end: event.end.toISOString(),
        },
        title: titleStr,
        id: event.id,
        mode: 'view',
      })
    );
  };

  return (
    <>
      <div className={ styles.CalendarLayout }>
        <BigCalendar
          localizer={localizer}
          events={calendarEvents} // Date 객체 기반으로 렌더링
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot} // 캘린더 셀 클릭
          views={{ week: true }}
          defaultView={defaultView} // 주간 보기 default
          date={new Date(selectedDate)} // string → Date
          onNavigate={(date) => dispatch(setSelectedDate(date.toISOString()))}
          //사용자가 주간 날짜를 이동함 ->	이동한 날짜를 상태에 저장(string)
          onSelectEvent={handleSelectEvent}
          //사용자가 기존 일정을 클릭
        />
      </div>
      <EventModal />
    </>
  );
};

export default BigCalendarComponent;
