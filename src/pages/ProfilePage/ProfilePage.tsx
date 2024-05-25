import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks/redux';
import * as styles from './ProfilePage.module.css';
import PersonalInfo from '../../components/ProfilePage/PersonalInfo';
import AddressesInfo from '../../components/ProfilePage/AddressesInfo';
import ProfileSection from '../../components/ProfilePage/ProfileSection';

function ProfilePage() {
  const navigate = useNavigate();
  const { customer } = useAppSelector((state) => state.customerReducer);

  useEffect(() => {
    if (!customer) {
      navigate('/login');
    }
  }, [customer]);

  return (
    customer && (
      <div className={styles.profile}>
        <PersonalInfo />
        <AddressesInfo />
        <ProfileSection heading="Password" buttonCaption="Change Password" />
      </div>
    )
  );
}

export default ProfilePage;
