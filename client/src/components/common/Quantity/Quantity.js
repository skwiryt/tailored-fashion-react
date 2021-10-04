import React from 'react';
import PropTypes from 'prop-types';
import styles from './Quantity.module.scss';

class Quantity extends React.Component {
  
  increment = () => {
    const {changeQuantity, value} = this.props;
    const newValue = value + 1;
    changeQuantity(newValue);
  }
  
  decrement = () => {
    const {changeQuantity, value} = this.props;    
    if (value > 1) {
      const newValue = value - 1;
      changeQuantity(newValue);      
    }    
  }
  
  render() {
    const {value} = this.props;
    return (
      <div>
       
        <div className={styles.quantityBox}>
          <button className={styles.quantityAdjust + ' ' + styles.down} onClick={this.decrement}>
            &mdash;
          </button>
          <input className={styles.quantityInput} type="text" value={value} readOnly />
          <button className={styles.quantityAdjust + ' ' + styles.up} onClick={this.increment}>
            &#xff0b;
          </button>  
        </div>  
      </div>
    );
  }
}

Quantity.propTypes = {
  changeQuantity: PropTypes.func,
  value: PropTypes.number,
};



export {
  Quantity,
  //QuantityContainer as Product,
  Quantity as QuantityComponent,
};

// ReactDOM.render(<Quantity />, document.getElementById('app'));