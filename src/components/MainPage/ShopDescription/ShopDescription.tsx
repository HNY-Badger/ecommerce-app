import React from 'react';

import * as style from './ShopDescription.module.css';
import image from '../../../assets/images/main.png';

function ShopDescription() {
  return (
    <div className={style.wrapper}>
      <div className={style.description}>
        <h2>The electronics store for tomorrow, offering timeless designs</h2>
        <p>
          Welcome to our cutting-edge electronics emporium, where innovation meets sophistication. As a pioneer in the
          realm of technology, we curate a diverse collection of state-of-the-art gadgets, gizmos, and devices designed
          to elevate your lifestyle. Our store offers a comprehensive range of products meticulously selected to meet
          the needs and desires of today&apos;s discerning consumers.
        </p>
        <p>
          Experience the future of electronics shopping with us, where every purchase is an investment in quality,
          style, and innovation. Discover the possibilities today and embark on a journey towards a more connected,
          convenient, and enriched way of living.
        </p>
      </div>
      <div className={style.image_wrapper}>
        <img className={style.image} src={image} alt="Electronics products" />
      </div>
    </div>
  );
}

export default ShopDescription;
