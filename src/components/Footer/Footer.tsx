import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaFacebookSquare, FaInstagramSquare, FaSkype, FaPinterest } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { IconType } from 'react-icons';

import * as style from './Footer.module.css';

type Data = { Icon: IconType; url: string };

const data: Data[] = [
  {
    Icon: FaLinkedin,
    url: 'https://careers.linkedin.cn/',
  },
  {
    Icon: FaFacebookSquare,
    url: 'https://ru-ru.facebook.com/',
  },
  {
    Icon: FaInstagramSquare,
    url: 'https://www.instagram.com/',
  },
  {
    Icon: FaSkype,
    url: 'https://www.skype.com/ru/',
  },
  {
    Icon: FaSquareXTwitter,
    url: 'https://twitter.com/?lang=ru',
  },
  {
    Icon: FaPinterest,
    url: 'https://ru.pinterest.com/',
  },
];

function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.wrapper}>
        <div className={style.social}>
          {data.map(({ Icon, url }) => (
            <Link to={url} target="_blank" key={url}>
              <Icon className={style.icon} />
            </Link>
          ))}
        </div>
        <div>
          2024 Dead Pixel <span className={style.copyright}>&copy;</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
