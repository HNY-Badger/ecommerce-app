import React from 'react';
import { useAppSelector } from '../../store/hooks/redux';
import PersonalInfoField from './PersonalInfoField';
import ProfileSection from './ProfileSection';

function PersonalInfo() {
  const { customer } = useAppSelector((state) => state.customerReducer);

  return (
    customer && (
      <ProfileSection heading="Personal Details" buttonCaption="Edit Personal Details">
        <PersonalInfoField value={customer.email} name="Email" />
        <PersonalInfoField value={customer.firstName} name="First name" />
        <PersonalInfoField value={customer.lastName} name="Last name" />
        <PersonalInfoField value={new Date(customer.dateOfBirth).toLocaleDateString('en-us')} name="Date of birth" />
      </ProfileSection>
    )
  );
}

export default PersonalInfo;
