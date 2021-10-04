import React from 'react';
import PropTypes from 'prop-types';
import styles from './CartLine.module.scss';
import { Quantity } from '../../common/Quantity/Quantity';
import { connect } from 'react-redux';
import { setQuantityRequest, setNoteRequest } from '../../../redux/cartRedux';

import {PHOTO_URL} from '../../../config';



class CartLine extends React.Component  {
  state = {
    quantity: this.props.cartLine.quantity,
    note: this.props.cartLine.note,
  }
  manageQuantity = (quantity) => {
    const {setQuantity, cartLine} = this.props;
    this.setState({...this.state, quantity}, 
      () => setQuantity({productId: cartLine.productId, quantity}));    
  }
  manageNote = (e) => {
    const noteText = e.target.value;
    const {setNote, cartLine} = this.props;
    this.setState({...this.state, note: noteText}, 
      () => setNote({productId: cartLine.productId, note: noteText}));    
  }
  cancelNote = () => {
    const {setNote, cartLine} = this.props;
    this.setState({...this.state, note: ''}, 
      () => setNote({productId: cartLine.productId, note: ''}));    
  }
  render = () => {
    const {cartLine, lineNb, removeLine} = this.props;
    const { quantity, note} = this.state;
    return (
      <div className={styles.root}>        
        <div className='row g-3'>          
          <div className='col-1'>
            <div className={styles.itemNb}>
              <div>{`${lineNb}.`}</div>
            </div>
          </div>
          <div className='col-2'>
            <div className={styles.productImage}>
              <img src={`${PHOTO_URL}/${cartLine.photo}`} alt='product'/>
            </div>
          </div>
          <div className='col-4'>
            <div className={styles.productInfo}>
              <div>
                <div className={styles.productTitle}>
                  {cartLine.title}
                </div>
                <div className={styles.productPrice}>
                  $ {cartLine.price}
                </div>
              </div>
              
              <div className={styles.controllQuantity}>                  
                <Quantity value={quantity} changeQuantity={this.manageQuantity}/>
                <button onClick={() => removeLine(cartLine.productId)} className={styles.removeBtn} type="button">Remove</button>
              </div>
                
            </div>
          </div>
          <div className='col-4'>
            <div className={styles.notes}>              
              <textarea onChange={this.manageNote} placeholder="Add your notes here" value={note}></textarea>
            </div>
          </div>
          <div className='col-1'>
            <div className={styles.closeButton}>
              <button onClick={this.cancelNote} type="button" className="btn-close" aria-label="Close"></button>
            </div>
          </div>
         
        </div>    
       
      </div>
    );
  }
}

CartLine.propTypes = {
  cartLine: PropTypes.object,
  lineNb: PropTypes.number,
  setQuantity: PropTypes.func,
  setNote: PropTypes.func,
  removeLine: PropTypes.func,
};


const mapDispatchToProps = (dispatch) => ({
  setQuantity: (payload) => dispatch(setQuantityRequest(payload)),
  setNote: (payload) => dispatch(setNoteRequest(payload)),
});

const CartLineContainer = connect(null, mapDispatchToProps)(CartLine);
export {
  // CartLine,
  CartLineContainer as CartLine,
  CartLine as CartLineComponent,
};
