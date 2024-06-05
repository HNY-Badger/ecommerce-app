import React, { MouseEventHandler, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import * as style from './Header.module.css';
import BurgerLogo from './BurgerLogo';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { deleteCustomer } from '../../store/reducers/CustomerSlice';
import { resetCartStore } from '../../store/reducers/CartSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { customer } = useAppSelector((state) => state.customerReducer);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuHandler = () => {
    setIsMenuOpen((prev: boolean) => !prev);
  };
  const logoutHandler: MouseEventHandler = () => {
    setIsMenuOpen(false);
    dispatch(deleteCustomer());
    dispatch(resetCartStore());
    navigate('/login');
  };

  const linkStyle = ({ isActive }: { isActive: boolean }) => (isActive ? style.link_active : style.link);

  return (
    <header className={style.header}>
      <BurgerLogo isOpen={isMenuOpen} onClick={toggleMenuHandler} />
      <nav className={isMenuOpen ? `${style.nav} ${style.nav_open}` : style.nav}>
        <NavLink to="/" end className={linkStyle} onClick={() => setIsMenuOpen(false)}>
          Home
        </NavLink>
        <NavLink to="catalog" className={linkStyle} onClick={() => setIsMenuOpen(false)}>
          Catalog
        </NavLink>
        {!customer && (
          <>
            <NavLink to="login" className={linkStyle} onClick={() => setIsMenuOpen(false)}>
              Login
            </NavLink>
            <NavLink to="registration" className={linkStyle} onClick={() => setIsMenuOpen(false)}>
              Registration
            </NavLink>
          </>
        )}
        {customer && (
          <>
            <button type="button" className={`${style.link} ${style.logout}`} onClick={logoutHandler}>
              Logout
            </button>
            <div className={style.email}>
              <NavLink to="profile" className={linkStyle} onClick={() => setIsMenuOpen(false)}>
                <FaUser className={style.icon} />
                {customer.email}
              </NavLink>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
