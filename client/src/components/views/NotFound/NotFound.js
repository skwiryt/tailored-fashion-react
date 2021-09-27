import React from 'react';
import PropTypes from 'prop-types';
import styles from './NotFound.module.scss';


const NotFound = () => (
  <div className={styles.root}>
    NotFound component here.
  </div>
);

NotFound.propTypes = {
  children: PropTypes.node,
};


export {
  NotFound,
  // NotFoundContainer as NotFound,
  NotFound as NotFoundComponent,
};