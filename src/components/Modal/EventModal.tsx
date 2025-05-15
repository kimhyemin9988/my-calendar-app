import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  closeModal,
  setTitle,
  setSlotInfo,
  setEditingEventId,
} from '../../redux/modalSlice';
import { addEvent, deleteEvent } from '../../redux/calendarSlice';

const EventModal = () => {
  const dispatch = useDispatch();

  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  const title = useSelector((state: RootState) => state.modal.title);
  const slotInfo = useSelector((state: RootState) => state.modal.slotInfo);
  const editingEventId = useSelector((state: RootState) => state.modal.editingEventId);
  const mode = useSelector((state: RootState) => state.modal.mode);

  const [localTitle, setLocalTitle] = useState(title || '');

  useEffect(() => {
    setLocalTitle(title || '');
  }, [title]);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleSave = () => {
    if (slotInfo && localTitle.trim()) {
      dispatch(
        addEvent({
          id: Math.random().toString(36).substr(2, 9),
          title: localTitle,
          start: slotInfo.start,
          end: slotInfo.end,
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

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} ariaHideApp={false}>
      <h2>{mode === 'edit' ? '할일 입력' : '할일 보기'}</h2>

      {slotInfo && (
        <div>
          <p>
            날짜: {moment(slotInfo.start).format('YYYY-MM-DD')} <br />
            시간: {moment(slotInfo.start).format('HH:mm')} ~ {moment(slotInfo.end).format('HH:mm')}
          </p>
        </div>
      )}

      {mode === 'edit' ? (
        <>
          <input
            type="text"
            placeholder="할일 제목"
            value={localTitle}
            onChange={handleTitleChange}
          />
          <button onClick={handleSave}>저장</button>
          <button onClick={handleClose}>취소</button>
        </>
      ) : (
        <>
          <p>할일: {title}</p>
          <button onClick={handleDelete}>삭제</button>
          <button onClick={handleClose}>닫기</button>
        </>
      )}
    </Modal>
  );
};

export default EventModal;

