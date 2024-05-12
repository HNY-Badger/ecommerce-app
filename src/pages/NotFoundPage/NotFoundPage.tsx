import React from 'react';

import { Link } from 'react-router-dom';
import * as style from './NotFoundPage.module.css';
import Button from '../../components/Button/Button';

function NotFoundPage() {
  return (
    <div className={style.wrapper}>
      <div className={style.wrapper_text}>
        <h1>Page Not Found</h1>
      </div>
      <div className={style.wrapper_block}>
        <h2>404</h2>
        <Link to="/">
          <Button type="button">Return to Home Page</Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
