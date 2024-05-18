import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NotificationState } from '../../types/notification';

type NotifyType = Omit<NotificationState, 'visible'>;

const initialState: NotificationState = {
  text: '',
  type: 'success',
  visible: false,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify(_, action: PayloadAction<NotifyType>) {
      return { ...action.payload, visible: true };
    },
    hideNotification(state) {
      return { ...state, visible: false };
    },
  },
});

export const { notify, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
