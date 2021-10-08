import React from 'react';
import PropTypes from 'prop-types';
import styles from './Home.module.scss';

import { connect } from 'react-redux';
import {getProducts, getRequest, loadProductsRequest} from '../../../redux/productsRedux';
import {PHOTO_URL} from '../../../config';
import { Link } from 'react-router-dom';


class Home extends React.Component {
  state = {
    images: 0,
  }
  componentDidMount = () => {
    const {loadProducts, products} = this.props;
    loadProducts(products);
  }
  setImageLoaded = () => {
    this.setState({...this.state, images: this.state.images + 1});
  }
  render = () => {
    const {products, request} = this.props;
    const { images} = this.state;
    const imagesLoaded = images === products.length;
    return ( 
      <div className={styles.root}>
        { request.error && <div className="alert errorAlert" role="alert" > Request Error.</div> }
        { (request.active && !request.error) && <div className="d-flex justify-content-center"><div className="spinner-border text-secondary" role="status"><span className="sr-only">Loading...</span></div></div> }
        { !request.active && !request.error && (
          <div className="row gy-4 gx-3 g-md-5">
            {products.map(product => (            
              <div key={product.id}  className="col-4 col-md-3" >
                <Link  to={`/product/${product.id}`}>
                  <div className={styles.productBox}>
                    <div className={styles.productImage} >
                      <img onLoad={() => this.setImageLoaded()} className={imagesLoaded ? styles.visible : styles.hidden} src={`${PHOTO_URL}/${product.photo}`} alt="something" />
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
          </div>) }
      </div>
    );
  }
} 

Home.propTypes = {
  products: PropTypes.array,
  loadProducts: PropTypes.func,
  request: PropTypes.object,
};

const mapStateToProps = (state) => ({
  products: getProducts(state),
  request: getRequest(state, 'LOAD_PRODUCTS'),
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
