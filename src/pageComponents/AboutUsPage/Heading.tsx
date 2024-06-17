import React from 'react';
import { Link } from 'react-router-dom';
import * as styles from './Heading.module.css';
import image from '../../assets/images/rs-logo.svg';

function Heading() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>
        This project was created thanks to
        <Link to="https://rs.school/courses" target="_blank" className={styles.link} data-testid="rss-link">
          <img src={image} className={styles.image} alt="logo rss" />
        </Link>
        <br />
        our mentors and our wonderful team <span className={styles.span}>Dead Pixel</span>
      </h2>
    </div>
  );
}

export default Heading;
