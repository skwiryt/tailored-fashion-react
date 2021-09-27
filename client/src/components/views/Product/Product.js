import React from 'react';
import PropTypes from 'prop-types';
import styles from './Product.module.scss';

const Product = () => (
  <div className={styles.root}>
    Product component here.
  </div>
);

Product.propTypes = {
  children: PropTypes.node,
};



export {
  Product,
  // ProductContainer as Product,
  Product as ProductComponent,
};
