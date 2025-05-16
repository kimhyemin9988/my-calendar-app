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
import styles from './Modal.module.scss';

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
          start: slotInfo.start, // 이미 ISO string
          end: slotInfo.end // 이미 ISO string
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
    <Modal isOpen={isOpen} onRequestClose={handleClose} ariaHideApp={false}
        overlayClassName={styles.overlay}
        className={styles.content}>
      {mode === 'edit' ? (
        <>
          <input
            type="text"
            placeholder="제목 추가"
            value={localTitle}
            onChange={handleTitleChange}
          />
          <div>
            <button onClick={handleSave}>저장</button>
            <button onClick={handleClose}>취소</button>
          </div>
        </>
      ) : (
        <>
          <p>할일: {title}</p>
          <div>
            <button onClick={handleDelete}>삭제</button>
            <button onClick={handleClose}>닫기</button>
          </div>
        </>
      )}
            {slotInfo && (
        <div className={styles.dateTimeLayout}>
          <div>{moment(slotInfo.start).format('YYYY-MM-DD')}</div>
          <div>{moment(slotInfo.start).format('HH:mm')} ~ {moment(slotInfo.end).format('HH:mm')}</div>
        </div>
      )}
    </Modal>
  );
};

export default EventModal;


