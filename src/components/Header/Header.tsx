import React from 'react';
import { NavLink } from 'react-router-dom';
import * as style from './Header.module.css';

function Header() {
  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <NavLink to="/" className={style.link}>
          Home
        </NavLink>
        <NavLink to="login" className={style.link}>
          Login
        </NavLink>
        <NavLink to="registration" className={style.link}>
          Registration
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
