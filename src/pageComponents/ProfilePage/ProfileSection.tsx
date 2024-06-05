import React, { PropsWithChildren } from 'react';
import * as styles from './ProfileSection.module.css';
import Button from '../../components/Button/Button';

type Props = {
  heading: string;
  buttonCaption: string;
  onEdit?: () => void;
};

function ProfileSection({ heading, buttonCaption, onEdit, children }: PropsWithChildren<Props>) {
  return (
    <div className={styles.wrapper}>
      <h3>{heading}</h3>
      {children}
      <Button onClick={onEdit}>{buttonCaption}</Button>
    </div>
  );
}

export default ProfileSection;
