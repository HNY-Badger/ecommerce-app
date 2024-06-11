import React from 'react';
import { Link } from 'react-router-dom';
import * as styles from './TeamMember.module.css';
import logo from '../../assets/images/github.svg';

type Props = {
  image: string;
  content: string;
  github: string;
};

function TeamMember({ image, content, github }: Props) {
  return (
    <div className={styles.wrapper}>
      <img src={image} className={styles.image} alt=" member" />
      <div className={styles.container}>
        <div>{content}</div>
        <Link to={`https://github.com/${github}`} target="_blank" className={styles.link} data-testid={github}>
          <img src={logo} className={styles.logo} alt=" github" />
          {github}
        </Link>
      </div>
    </div>
  );
}

export default TeamMember;
