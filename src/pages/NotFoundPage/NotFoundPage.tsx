import React from 'react';

import { Link } from 'react-router-dom';
import * as style from './NotFoundPage.module.css';
import Button from '../../components/Button/Button';

function NotFoundPage() {
  return (
    <div className={style.wrapper}>
      <div className={style.wrapper_text}>
        <p>Page Not Found</p>
      </div>
      <div className={style.wrapper_block}>
        <p>404</p>
        <Link to="/">
          <Button type="button">Return to Home Page</Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
