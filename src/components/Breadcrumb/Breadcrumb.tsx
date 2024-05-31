import React from 'react';
import { NavLink } from 'react-router-dom';
import * as styles from './Breadcrumb.module.css';
import { BreadcrumbLink } from '../../types/breadcrumb';

type Props = {
  links: BreadcrumbLink[];
};

function Breadcrumb({ links }: Props) {
  return (
    <div className={styles.breadcrumb}>
      {links.map((link) => (
        <NavLink key={link.name} to={link.to}>
          {link.name}
        </NavLink>
      ))}
    </div>
  );
}

export default Breadcrumb;
