import React from 'react';
import PropTypes from 'prop-types';
import styles from './Quantity.module.scss';

class Quantity extends React.Component {

  state = {value: 1};
  
  
  increment = () => {
    const {changeQuantity} = this.props;
    this.setState({...this.state, value: this.state.value + 1}, () => { changeQuantity(this.state.value);});
  }
  
  decrement = () => {
    const {changeQuantity} = this.props;
    if (this.state.value > 1) {
      this.setState({...this.state, value: this.state.value -1}, () => { changeQuantity(this.state.value);});
    }    
  }
  
  render() {
    
    return (
      <div>
        <p>
        Set the quantity
        </p>
        <div className={styles.quantityBox}>
          <button className={styles.quantityAdjust + ' ' + styles.down} onClick={this.decrement}>
            &mdash;
          </button>
          <input className={styles.quantityInput} type="text" value={this.state.value} readOnly />
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
};



export {
  Quantity,
  //QuantityContainer as Product,
  Quantity as QuantityComponent,
};

// ReactDOM.render(<Quantity />, document.getElementById('app'));