// src/components/Modal/EventModal.tsx

import React from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { closeModal, setTitle } from '../../redux/modalSlice';
import { addEvent } from '../../redux/calendarSlice';

const EventModal = () => {
  const dispatch = useDispatch();

  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  const title = useSelector((state: RootState) => state.modal.title);
  const slotInfo = useSelector((state: RootState) => state.modal.slotInfo);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleSave = () => {
    if (slotInfo && title.trim()) {
      dispatch(
        addEvent({
          title,
          start: slotInfo.start,
          end: slotInfo.end,
        })
      );
      dispatch(closeModal());
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(e.target.value));
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} ariaHideApp={false}>
      <h2>할일 입력</h2>
      {slotInfo && (
        <div>
          <p>
            날짜: {moment(slotInfo.start).format('YYYY-MM-DD')} <br />
            시간: {moment(slotInfo.start).format('HH:mm')} ~{' '}
            {moment(slotInfo.end).format('HH:mm')}
          </p>
        </div>
      )}
      <input
        type="text"
        placeholder="할일 제목"
        value={title}
        onChange={handleTitleChange}
      />
      <button onClick={handleSave}>저장</button>
      <button onClick={handleClose}>취소</button>
    </Modal>
  );
};

export default EventModal;
