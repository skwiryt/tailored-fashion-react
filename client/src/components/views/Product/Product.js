import React from 'react';
import PropTypes from 'prop-types';
import styles from './Product.module.scss';
import axios from 'axios';
import {PHOTO_URL, API_URL} from '../../../config';
import { connect } from 'react-redux';
import {getProduct} from '../../../redux/productsRedux';
import { addToCartRequest} from '../../../redux/cartRedux';
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
  manageAddToCart = () => {
    const {product, quantity} = this.state;
    const {addToCart} = this.props;
    const line = {productId: product.id, title: product.title, price: product.price, photo: product.photo, quantity};
    addToCart(line);
  }
  render = () => {
    const {product, error} = this.state;
    const {imageLoaded, quantity, pickedImage} = this.state;   
    if(!product) return (
      
      <div>
        <div className=''>Loading ...</div>
        {error && <div className="alert errorAlert">Error occurred while loading.</div>}
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
          <div className='row gy-5 g-sm-5'>
            <div className='col-12 col-sm-7'>            
              <div className={styles.productImage}>
                <img onLoad={() => this.setImageLoaded(true)} className={imageLoaded ? styles.visible : styles.hidden} src={`${PHOTO_URL}/${mainImage}`} alt='Product'/>              
              </div>
            </div>
            <div className='col-12 col-sm-5'>
              <div className={styles.productInfo} >
                <div className={styles.logo}>Tailored Fashion</div>
                <div className={styles.productTitle}>{product.title}</div>
                <div className={styles.productPrice}>$ {product.price}</div>
                <div className={styles.productText}>{product.text}</div>
                <div className={styles.quantityBox}>
                  <div className={styles.legend}>
                    <p>
                      Quantity:
                    </p>
                    <Quantity value={quantity} changeQuantity={this.setQuantity}/>
                  </div>
                </div>
                <div onClick={this.manageAddToCart} className={styles.addButton}>ADD TO CART    ($ {product.price * quantity})</div>
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
  addToCart: (line) => dispatch(addToCartRequest(line)),
});

const ProductContainer = connect(mapStateToProps, mapDispatchToProps)(Product);

Product.propTypes = {
  match: PropTypes.object,
  addToCart: PropTypes.func,
};



export {
  // Product,
  ProductContainer as Product,
  Product as ProductComponent,
};
