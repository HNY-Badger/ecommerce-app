import React from 'react';

import * as style from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <div className={style.wrapper}>
      <div className={style.wrapper_text}>
        <h1>Page Not Found</h1>
      </div>
      <div className={style.wrapper_block}>
        <h2>404</h2>
      </div>
    </div>
  );
}

export default NotFoundPage;
