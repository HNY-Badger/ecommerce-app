export type NotificationTypes = 'success' | 'error';

export type NotificationState = {
  text: string;
  type: NotificationTypes;
  visible: boolean;
};
