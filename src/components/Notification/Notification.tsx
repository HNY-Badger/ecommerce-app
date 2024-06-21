import React, { useEffect } from 'react';
import { MdError, MdCheck } from 'react-icons/md';
import * as styles from './Notification.module.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { hideNotification } from '../../store/reducers/NotificationSlice';

function Notification() {
  const { text, type, visible } = useAppSelector((state) => state.notificationReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (visible) {
      const id = setTimeout(() => {
        dispatch(hideNotification());
      }, 5000);
      return () => {
        clearTimeout(id);
      };
    }
    return undefined;
  }, [text, type, visible]);
  return (
    <div className={`${styles.notifer} ${styles[type]} ${!visible ? styles.hidden : ''}`}>
      {type === 'success' && <MdCheck />}
      {type === 'error' && <MdError />}
      <p>{text}</p>
    </div>
  );
}

export default Notification;
