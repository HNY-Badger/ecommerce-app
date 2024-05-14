import React from 'react';
import { NavLink } from 'react-router-dom';
import * as style from './Header.module.css';

function Header() {
  const linkStyle = ({ isActive }: { isActive: boolean }) => (isActive ? style.link_active : style.link);
  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <NavLink to="/" end className={linkStyle}>
          Home
        </NavLink>
        <NavLink to="login" className={linkStyle}>
          Login
        </NavLink>
        <NavLink to="registration" className={linkStyle}>
          Registration
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
