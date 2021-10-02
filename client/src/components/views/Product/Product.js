import React from 'react';
import PropTypes from 'prop-types';
import styles from './Product.module.scss';
import axios from 'axios';
import {PHOTO_URL, API_URL} from '../../../config';
import { connect } from 'react-redux';
import {getProduct, loadProductsRequest} from '../../../redux/productsRedux';
import { Quantity } from '../../common/Quantity/Quantity';

class Product extends React.Component {
  state = {
    imageLoaded: false,
    quantity: 1,
    pickedImage: '',
    error: false,    
  }
  componentDidMount = () => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(API_URL + '/products/' + this.props.match.params.id);
        this.setState({...this.state, product: response.data, error: false});
        
      } catch(err) {
        this.setState({...this.state, error: true});
      }
    };
    fetchProduct();
  }
  setImageLoaded = (booleanValue) => {
    this.setState({...this.state, imageLoaded: booleanValue});
  }
  setPickedImage = (name) => {
    this.setState({...this.state, pickedImage: name});
  }
  setQuantity = (value) => {
    this.setState({...this.state, quantity: value});
  }
  render = () => {
    const {product, error} = this.state;
    const {imageLoaded, quantity, pickedImage} = this.state;   
    if(!product) return (
      
      <div>
        <div className=''>Loading ...</div>
        {error && <div>Error occurred while loading.</div>}
      </div>
    );
    else {
      const mainImage = pickedImage ? pickedImage : product.photo;
      const getThumbClass = (image) => {
        if (image === mainImage) {
          return styles.thumbnail + ' ' + styles.active;
        } else {
          return styles.thumbnail;
        }        
      };
      return (
        <div className={styles.root}>
          <div className='row g-5'>
            <div className='col-7'>            
              <div className={styles.productImage}>
                { !imageLoaded && <div className={styles.placeholder}>Loading...</div> }
                <img onLoad={() => this.setImageLoaded(true)} className={imageLoaded ? styles.visible : styles.hidden} src={`${PHOTO_URL}/${mainImage}`} alt='Product'/>              
              </div>
            </div>
            <div className='col-5'>
              <div className={styles.productInfo} >
                <div className={styles.logo}>Tailored Fashion</div>
                <div className={styles.productTitle}>{product.title}</div>
                <div className={styles.productPrice}>$ {product.price}</div>
                <div className={styles.productText}>{product.text}</div>
                <div className={styles.quantityBox}>
                  <div className={styles.legend}>
                    <Quantity changeQuantity={this.setQuantity}/>
                  </div>
                </div>
                <div className={styles.addButton}>ADD TO CART    ($ {product.price * quantity})</div>
                <div className={styles.thumbnails}>                
                  <div className={getThumbClass(product.photo)}>
                    <img onClick={() => this.setPickedImage(product.photo)} src={`${PHOTO_URL}/${product.photo}`} alt='thumbnail' />
                  </div>
                  {product.images.map(img => (
                    <div key={img} className={getThumbClass(img)}>
                      <img onClick={() => this.setPickedImage(img)} src={`${PHOTO_URL}/${img}`} alt='thumbnail' />
                    </div>
                  ))}
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
      );
    }
  }
}
  

const mapStateToProps = (state, props) => ({
  product: getProduct(state, props.match.params.id),
});
const mapDispatchToProps = (dispatch) => ({
  loadProducts: (products) => dispatch(loadProductsRequest(products)),
});

const ProductContainer = connect(mapStateToProps, mapDispatchToProps)(Product);

Product.propTypes = {
  match: PropTypes.object,
};



export {
  // Product,
  ProductContainer as Product,
  Product as ProductComponent,
};
