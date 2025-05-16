import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  closeModal,
  setTitle,
} from '../../redux/modalSlice';
import { addEvent, deleteEvent } from '../../redux/calendarSlice';
import styles from './Modal.module.scss';

const EventModal = () => {
  const dispatch = useDispatch();

  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  //모달이 열려 있는지 여부 
  const title = useSelector((state: RootState) => state.modal.title);
  //모달 창에서 사용자가 입력 중인 일정 제목(title)
  const slotInfo = useSelector((state: RootState) => state.modal.slotInfo);
  //react-big-calendar에서 클릭한 시간 (시작/종료 시간)
  const editingEventId = useSelector((state: RootState) => state.modal.editingEventId);
  //생성 중인 일정의 ID => 셀을 클릭한 생성 모드 모달의 id
  const mode = useSelector((state: RootState) => state.modal.mode);
  //모달이 생성 모드인지 보기 모드인지 구분




  const [localTitle, setLocalTitle] = useState(title || '');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    setLocalTitle(title || '');
  }, [title]);

  useEffect(() => {
    if (slotInfo) {
      const start = moment(slotInfo.start).format('HH:mm');
      const end = moment(slotInfo.end).format('HH:mm');
      setStartTime(start);
      setEndTime(end);
    }
  }, [slotInfo]);

  const handleClose = () => {
    dispatch(closeModal());
    // closeModal 실행
  };

  const handleSave = () => {
    if (slotInfo && localTitle.trim()) {
      // 시작, 종료 moment 객체 생성 (날짜는 slotInfo 기준, 시간은 입력값 기준)
      const start = moment(slotInfo.start).set({
        hour: parseInt(startTime.split(':')[0]),
        minute: parseInt(startTime.split(':')[1]),
      });

      const end = moment(slotInfo.end).set({
        hour: parseInt(endTime.split(':')[0]),
        minute: parseInt(endTime.split(':')[1]),
      });

      // 종료시간이 시작시간보다 이전이면 경고
      if (end.isSameOrBefore(start)) {
        alert('시작 시간보다 전의 시간을 입력할 수 없습니다.');
        return;
      }

      dispatch(
        addEvent({
          id: Math.random().toString(36), // id 랜덤 생성
          title: localTitle,
          start: start.toISOString(),
          end: end.toISOString(),
        })
      );
      handleClose();
    }
  };

  const handleDelete = () => {
    if (editingEventId) {
      dispatch(deleteEvent(editingEventId));
      handleClose();
      alert('삭제되었습니다.');
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTitle(e.target.value);
    dispatch(setTitle(e.target.value));
  };

  // 종료 시간 입력
  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      ariaHideApp={false}
      overlayClassName={styles.overlay}
      className={styles.content}
    >
      {mode === 'edit' ? (
      //생성
        <>
          <input
            type="text"
            placeholder="제목 추가"
            value={localTitle}
            onChange={handleTitleChange}
          />

          <div className={styles.timeInputs}>
            <label>
              시작 시간
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </label>
            <label>
              종료 시간
              <input
                type="time"
                value={endTime}
                onChange={handleEndTimeChange}
              />
            </label>
          </div>

          <div className={styles.buttonGroup}>
            <button onClick={handleSave}>저장</button>
            <button onClick={handleClose}>취소</button>
          </div>
        </>
      ) : (          //보기 + 삭제
        <>
          <p>할일: {title}</p>
          <div className={styles.buttonGroup}>
            <button onClick={handleDelete}>삭제</button>
            <button onClick={handleClose}>닫기</button>
          </div>
        </>
      )}

      {slotInfo && (
        <div className={styles.dateTimeLayout}>
          <div>{moment(slotInfo.start).format('YYYY-MM-DD')}</div>
          <div>
            {startTime} ~ {endTime}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default EventModal;

