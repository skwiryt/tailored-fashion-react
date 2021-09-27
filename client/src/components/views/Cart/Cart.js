import React from 'react';
import PropTypes from 'prop-types';
import styles from './Cart.module.scss';

const Cart = () => (
  <div className={styles.root}>
    Cart component here.
  </div>
);

Cart.propTypes = {
  children: PropTypes.node,
};


export {
  Cart,
  // CartContainer as Cart,
  Cart as CartComponent,
};
