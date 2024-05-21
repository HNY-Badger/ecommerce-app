import React from 'react';

import { Link } from 'react-router-dom';
import * as style from './NotFoundPage.module.css';
import Button from '../../components/Button/Button';

function NotFoundPage() {
  return (
    <div className={style.wrapper}>
      <p className={style.text}>Page Not Found</p>
      <div className={style.code_wrapper}>
        <p className={style.code}>404</p>
        <Link to="/">
          <Button type="button">Return to Home Page</Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
