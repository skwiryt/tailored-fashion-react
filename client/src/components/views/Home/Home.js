import React from 'react';
import PropTypes from 'prop-types';
import styles from './Home.module.scss';

import { connect } from 'react-redux';
import {getProducts} from '../../../redux/productsRedux';


const Home = ({products}) => (
  <div className={styles.root}>
    Home component here.
    <div>
      {products.map(product => (<p key={product.id}>{product.title}</p>))}
    </div>
  </div>
);

Home.propTypes = {
  products: PropTypes.array,
};

const mapStateToProps = (state) => ({
  products: getProducts(state),
});
/*
const mapDispatchToProps = dispatch => ({
  loadProducts: arg => dispatch(loadProductsRequest(arg)),
});
*/
// const Container = connect(mapStateToProps, mapDispatchToProps)(Home);
const HomeContainer = connect(mapStateToProps)(Home);

export {
  // Home,
  HomeContainer as Home,
  Home as HomeComponent,
};
