import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {API_URL} from '../../../config';
import styles from './UserOrders.module.scss';

class UserOrders extends React.Component  {
  state = {
    error: false,    
  }
  componentDidMount = () => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(API_URL + '/orders/user/' + this.props.match.params.userId);
        this.setState({...this.state, orders: response.data, error: false});
        
      } catch(err) {
        this.setState({...this.state, error: true});
      }
    };
    fetchOrders();
  }
  manageRemoveLine = (productId) => {
    const {removeLine} = this.props;
    removeLine(productId);
  }
  render = () => {
    const {orders, error} = this.state;  
    
    if(!orders) return (
    
      <div className={styles.root}>
        <div className=''>Loading ...</div>
        {error && <div className="alert errorAlert">Error occurred while loading.</div>}
      </div>
    );
    else {
      const isContent = orders.length > 0;
      return (
        <div className={styles.root}>
          { isContent && (<div>
            <div className={styles.pageHeader}>Your Orders</div>
            {orders.map(order => (
              <div key={order.id}>
                <div className={styles.orderHeader}>Order id: {order.id}, Amount: $ {order.lines.reduce((a, c) => c.price * c.quantity + a, 0)}</div>
                <div className={styles.orderContent}>
                  {order.lines.map((line, i) => (
                    <div key={line.productId} className={styles.orderLine}>
                      <div className="row">
                        <div className="col-1">
                          {i + 1}.
                        </div>
                        <div className="col-7">
                          {line.title} ($ {line.price})
                        </div>
                        <div className="col-1 col-lg-2 d-flex justify-content-end">
                          {line.quantity}
                        </div>
                        <div className="col-3 col-lg-2 d-flex justify-content-end">
                          $ {line.quantity * line.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
              </div>
            ))}
            
          </div>)
          }
          {!isContent &&  <div className={styles.pageHeader}>There is no orders of this user</div> }
          
        </div>
      );
    }
      
    
  }
}

UserOrders.propTypes = {
  match: PropTypes.object,
  cartLines: PropTypes.array,
  removeLine: PropTypes.func,
};



export {
  UserOrders,
  //UserOrdersContainer as UserOrders,
  UserOrders as UserOrdersComponent,
};
