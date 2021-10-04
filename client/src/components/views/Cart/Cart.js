import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './Cart.module.scss';
import { CartLine} from '../../features/CartLine/CartLine';
import {getCartLines, removeLineRequest} from '../../../redux/cartRedux';


class Cart extends React.Component  {
  checkOut = () => {};
  manageRemoveLine = (productId) => {
    const {removeLine} = this.props;
    removeLine(productId);
  }
  render = () => {
    const {cartLines} = this.props;
    const cartValue = cartLines.reduce((a, c) => c.quantity * c.price + a, 0);
    const buttonText = cartLines && cartLines.length ? `CHECK OUT    ($ ${cartValue})` : 'CART IS EMPTY';
    return (
      <div className={styles.root}>
        {cartLines.map((cartLine, i) => (
          <CartLine removeLine={this.manageRemoveLine} lineNb={i + 1} key={cartLine.productId} cartLine={cartLine}/>
        ))}
        <div onClick={this.checkOut} className={styles.orderButton}>{buttonText}</div>
       
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
