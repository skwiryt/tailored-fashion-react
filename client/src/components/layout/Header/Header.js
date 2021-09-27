import React from 'react';
import { NavLink} from 'react-router-dom';
// import PropTypes from 'prop-types';
import styles from './Header.module.scss';

const Header = () => (
  <div className={styles.root}>
    <nav className={styles.navBar}>
      <NavLink className={styles.link} exact to={`/`} activeClassName='active'>Home</NavLink>
      <NavLink className={styles.link} exact to={`/cart`} activeClassName='active'>Cart</NavLink>
      <NavLink className={styles.link} exact to={`/orderform`} activeClassName='active'>OrderForm</NavLink>
      <NavLink className={styles.link} exact to={`/product/2`} activeClassName='active'>Some product link</NavLink>
    </nav>
  </div>
);

export {
  Header,
  // HeaderContainer as Header,
  Header as HeaderComponent,
};
