import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderForm.module.scss';

const OrderForm = () => (
  <div className={styles.root}>
    OrderForm component here.
  </div>
);

OrderForm.propTypes = {
  children: PropTypes.node,
};


export {
  OrderForm,
  // OrderFormContainer as OrderForm,
  OrderForm as OrderFormComponent,
};
