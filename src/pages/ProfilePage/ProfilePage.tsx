import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks/redux';

function ProfilePage() {
  const navigate = useNavigate();
  const { customer } = useAppSelector((state) => state.customerReducer);

  useEffect(() => {
    if (!customer) {
      navigate('/login');
    }
  }, [customer]);

  return <h1>Profile Page</h1>;
}

export default ProfilePage;
