import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link} from 'react-router-dom';
import styles from './Cart.module.scss';
import { CartLine} from '../../features/CartLine/CartLine';
import {getCartLines, removeLineRequest} from '../../../redux/cartRedux';


class Cart extends React.Component  {
  
  manageRemoveLine = (productId) => {
    const {removeLine} = this.props;
    removeLine(productId);
  }
  render = () => {
    const {cartLines} = this.props;
    const isContent = cartLines.length > 0;
    const cartValue = cartLines.reduce((a, c) => c.quantity * c.price + a, 0);
    return (
      <div className={styles.root}>
        <div className={styles.pageHeader}>Your Cart</div>
        {cartLines.map((cartLine, i) => (
          <CartLine removeLine={this.manageRemoveLine} lineNb={i + 1} key={cartLine.productId} cartLine={cartLine}/>
        ))}
        { isContent && <Link to="/orderform"><div className={styles.orderButton}>{`CHECK OUT    ($ ${cartValue})`}</div></Link>}
        { !isContent && <div className={styles.orderButton}>CART IS EMPTY</div>}
        
       
      </div>
    );
  }
}

Cart.propTypes = {
  cartLines: PropTypes.array,
  removeLine: PropTypes.func,
};


const matchStateToProps = (state) => ({
  cartLines: getCartLines(state),
});
const matchDispatchToProps = (dispatch) => ({
  removeLine: (productId) => dispatch(removeLineRequest(productId)),
});

const CartContainer = connect(matchStateToProps, matchDispatchToProps)(Cart);

export {
  // Cart,
  CartContainer as Cart,
  Cart as CartComponent,
};
