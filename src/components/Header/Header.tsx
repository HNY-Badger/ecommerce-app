import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as style from './Header.module.css';
import BurgerLogo from './BurgerLogo';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuHandler = () => {
    setIsMenuOpen((prev: boolean) => !prev);
  };

  const linkStyle = ({ isActive }: { isActive: boolean }) => (isActive ? style.link_active : style.link);

  return (
    <header className={style.header}>
      <BurgerLogo isOpen={isMenuOpen} onClick={toggleMenuHandler} />
      <nav className={isMenuOpen ? `${style.nav} ${style.nav_open}` : style.nav}>
        <NavLink to="/" end className={linkStyle} onClick={() => setIsMenuOpen(false)}>
          Home
        </NavLink>
        <NavLink to="login" className={linkStyle} onClick={() => setIsMenuOpen(false)}>
          Login
        </NavLink>
        <NavLink to="registration" className={linkStyle} onClick={() => setIsMenuOpen(false)}>
          Registration
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
