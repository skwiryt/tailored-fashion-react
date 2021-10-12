import React from 'react';
import PropTypes from 'prop-types';
import { slide as Menu } from 'react-burger-menu';
import { NavLink, Link} from 'react-router-dom';
import styles from './Header.module.scss';


class Header extends React.Component{  
  render = () => {
    const {cartLines, activeAgent, userId} = this.props;
    const items = cartLines.reduce((a, c) => a + c.quantity, 0);
    var hamburgerStyle = {
      bmBurgerButton: {
        position: 'fixed',
        width: '34px',
        height: '23px',
        // left: '36px',
        top: '20px',
        
      },
      bmBurgerBars: {
        background: '#373a47',
      },
      bmBurgerBarsHover: {
        background: '#a90000',
      },
      bmCrossButton: {
        height: '24px',
        width: '24px',
        top: '20px',
        right: '20px',
      },
      bmCross: {
        background: '#bdc3c7',
      },
      bmMenuWrap: {
        position: 'fixed',
        top: '0px',
        left: '0px',
        height: '100%',
        width: '20vw',
        minWidth: '180px',
      },
      bmMenu: {
        // background: '#373a47',
        background: 'white',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em',
        

      },
      bmMorphShape: {
        fill: '#373a47',
      },
      bmItemList: {
        color: '#b8b7ad',
        padding: '0.8em',
      },
      bmItem: {
        display: 'inline-block',
      },
      bmOverlay: {
        top: '0px',
        left: '0px',
        background: 'rgba(0, 0, 0, 0.3)',
      },
    };
    
    return (
      <div className={styles.root}>
        <div className={styles.hamburger}>
          
          <Menu styles={hamburgerStyle}>            
            <NavLink className={styles.link} exact to={`/`} activeClassName='active'>HOME</NavLink>            
            {/* <NavLink className={styles.link} exact to={`/`} activeClassName='active'>ABOUT</NavLink> */}
            {activeAgent && <NavLink className={styles.link} exact to={`/userOrders/${userId}`} activeClassName='active'>ORDERS</NavLink>}
            <NavLink className={styles.link} exact to={`/cart`} activeClassName='active'>CART ({items})</NavLink>
          </Menu>
          
        </div>       
        <nav className={styles.navBar}>
          <div className={styles.menu}>
            <NavLink className={styles.link} exact to={`/`} activeClassName='active'>HOME</NavLink>
            
            {/* <NavLink className={styles.link} exact to={`/`} activeClassName='active'>ABOUT</NavLink> */}
          </div>
          <div className={styles.logo}>
            <Link className={styles.link} to={`/`} >TAILORED FASHION</Link>
          </div>
          <div className={styles.menu}>
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
