import React from 'react';
import { NavLink} from 'react-router-dom';
// import PropTypes from 'prop-types';
import styles from './Header.module.scss';

const Header = () => (
  <div className={styles.root}>
    <nav className={styles.navBar}>
      <div className={styles.pageMenu}>
        <NavLink className={styles.link} exact to={`/`} activeClassName='active'>HOME</NavLink>
        <NavLink className={styles.link} exact to={`/`} activeClassName='active'>ABOUT</NavLink>
      </div>
      <div className={styles.logo}>
        <NavLink className={styles.link} exact to={`/`} activeClassName='active'>TAILORED FASHION</NavLink>
      </div>
      <div className={styles.shopMenu}>
        <NavLink className={styles.link} exact to={`/cart`} activeClassName='active'>CART</NavLink>
      </div> 
    </nav>
  </div>
);

export {
  Header,
  // HeaderContainer as Header,
  Header as HeaderComponent,
};
