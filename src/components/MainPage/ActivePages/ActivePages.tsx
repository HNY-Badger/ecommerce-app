import React from 'react';
import { NavLink } from 'react-router-dom';
import * as styles from './ActivePages.module.css';

function ActivePages() {
  return (
    <div className={styles.links_wrapper}>
      <h3>Our active pages</h3>
      <div className={styles.links}>
        <NavLink to="/" className={styles.link}>
          Home
        </NavLink>
        <NavLink to="catalog" className={styles.link}>
          Catalog
        </NavLink>
        <NavLink to="login" className={styles.link}>
          Login
        </NavLink>
        <NavLink to="registration" className={styles.link}>
          Registration
        </NavLink>
        <NavLink to="profile" className={styles.link}>
          Profile
        </NavLink>
      </div>
    </div>
  );
}

export default ActivePages;
