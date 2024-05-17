import React from 'react';
import * as style from './BurgerLogo.module.css';

type Props = {
  isOpen: boolean;
  onClick: () => void;
};

function BurgerLogo({ isOpen, onClick }: Props) {
  return (
    <button
      className={isOpen ? `${style.burger} ${style.burger_open}` : style.burger}
      onClick={onClick}
      type="button"
      aria-label="BurgerLogo"
    >
      <span className={isOpen ? `${style.line} ${style.top_open}` : style.line} />
      <span className={isOpen ? `${style.line} ${style.middle_open}` : style.line} />
      <span className={isOpen ? `${style.line} ${style.bottom_open}` : style.line} />
    </button>
  );
}

export default BurgerLogo;
