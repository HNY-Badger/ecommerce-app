import React, { MouseEventHandler } from 'react';
import * as styles from './Button.module.css';

interface Props {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  variant?: 'dark' | 'white' | 'grey' | 'transparent';
  type?: 'button' | 'submit';
  testid?: string;
  disabled?: boolean;
  className?: string;
}

function Button({ onClick, children, variant = 'dark', type = 'button', testid, disabled, className }: Props) {
  return (
    // Type stupidity is made due to ESlint error :/
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={`${styles.button} ${styles[variant]} ${className || ''}`}
      onClick={onClick}
      data-testid={testid}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
