import React from 'react';
import PropTypes from 'prop-types';
import styles from './Home.module.scss';

import { connect } from 'react-redux';
import {getProducts, loadProductsRequest} from '../../../redux/productsRedux';
import {PHOTO_URL} from '../../../config';


class Home extends React.Component {

  componentDidMount = () => {
    const {loadProducts, products} = this.props;
    loadProducts(products);
  }

  render = () => {
    const {products} = this.props;
    return (
      <div className={styles.root}>
      Home component here.
        <div>
          {products.map(product => (<p key={product.id}>{product.title}</p>))}
        </div>
        <img src={`${PHOTO_URL}/ebony.jpg`} alt="something"/>
      </div>
    );
  }
} 

Home.propTypes = {
  products: PropTypes.array,
  loadProducts: PropTypes.func,
};

const mapStateToProps = (state) => ({
  products: getProducts(state),
});
const mapDispatchToProps = (dispatch) => ({
  loadProducts: (products) => dispatch(loadProductsRequest(products)),
});

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
// const HomeContainer = connect(mapStateToProps)(Home);

export {
  // Home,
  HomeContainer as Home,
  Home as HomeComponent,
};
