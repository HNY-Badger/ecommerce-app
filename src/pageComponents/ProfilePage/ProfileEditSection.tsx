import React, { PropsWithChildren } from 'react';
import Button from '../../components/Button/Button';
import Spinner from '../../components/Spinner/Spinner';
import * as styles from './ProfileSection.module.css';

type Props = {
  heading: string;
  loading: boolean;
  onSave?: () => void;
  onCancel?: () => void;
};

function ProfileEditSection({ heading, loading, onCancel, onSave, children }: PropsWithChildren<Props>) {
  return (
    <div className={styles.wrapper}>
      <h3>{heading}</h3>
      {children}
      <div className={styles.buttons}>
        <Button onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={onSave}>
          <div className={styles.button_loading}>
            <p>Save&nbsp;changes</p>
            {loading && <Spinner height="16px" />}
          </div>
        </Button>
      </div>
    </div>
  );
}

export default ProfileEditSection;
