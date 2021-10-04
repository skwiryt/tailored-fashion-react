import React from 'react';
import PropTypes from 'prop-types';
import { NavLink} from 'react-router-dom';
import styles from './Header.module.scss';

const Header = ({cartLines}) => {
  const items = cartLines.reduce((a, c) => a + c.quantity, 0);
  return (
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
          <NavLink className={styles.link} exact to={`/cart`} activeClassName='active'>CART ({items})</NavLink>
        </div> 
      </nav>
    </div>
  );
};
Header.propTypes = {
  cartLines: PropTypes.array,
};

export {
  Header,
  // HeaderContainer as Header,
  Header as HeaderComponent,
};
