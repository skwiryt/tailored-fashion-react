import React from 'react';
import PropTypes from 'prop-types';
import styles from './Home.module.scss';

import { connect } from 'react-redux';
import {getProducts, loadProductsRequest} from '../../../redux/productsRedux';
import {PHOTO_URL} from '../../../config';
import { Link } from 'react-router-dom';


class Home extends React.Component {

  componentDidMount = () => {
    const {loadProducts, products} = this.props;
    loadProducts(products);
  }

  render = () => {
    const {products} = this.props;
    return (
      <div className={styles.root}>

        <div className="row gy-4 gx-3 g-md-5">
          {products.map(product => (            
            <div key={product.id}  className="col-4 col-md-3" >
              <Link  to={`/product/${product.id}`}>
                <div className={styles.productBox}>
                  <div className={styles.productImage} >
                    <img src={`${PHOTO_URL}/${product.photo}`} alt="something" />
                  </div>
                  <div className={styles.productTitle} >
                    {product.title}
                  </div>
                  <div className={styles.productPrice}>
                    $ {product.price}
                  </div>
                </div>
              </Link>   
            </div>                   
          ))}
        </div>
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
