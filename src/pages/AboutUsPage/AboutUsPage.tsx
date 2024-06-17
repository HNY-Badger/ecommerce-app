import React from 'react';
import * as styles from './AboutUsPage.module.css';
import Heading from '../../pageComponents/AboutUsPage/Heading';
import AllTeamMembers from '../../pageComponents/AboutUsPage/AllTeamMembers';

function AboutUsPage() {
  return (
    <div className={styles.wrapper}>
      <Heading />
      <AllTeamMembers />
    </div>
  );
}

export default AboutUsPage;
