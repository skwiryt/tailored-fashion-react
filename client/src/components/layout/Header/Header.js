import React from 'react';
import PropTypes from 'prop-types';
import { NavLink} from 'react-router-dom';
import styles from './Header.module.scss';


class Header extends React.Component{
  render = () => {
    const {cartLines, activeAgent, userId} = this.props;
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
            {activeAgent && <NavLink className={styles.link} exact to={`/userOrders/${userId}`} activeClassName='active'>ORDERS</NavLink>}
            <NavLink className={styles.link} exact to={`/cart`} activeClassName='active'>CART ({items})</NavLink>
          </div> 
        </nav>
      </div>
    );
  }
} 
Header.propTypes = {
  cartLines: PropTypes.array,
  userId: PropTypes.string,
  activeAgent: PropTypes.bool,
};



export {
  Header,
  // HeaderContainer as Header,
  Header as HeaderComponent,
};
