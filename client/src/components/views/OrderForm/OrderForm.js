import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import validator from 'validator';
import styles from './OrderForm.module.scss';
import { connect } from 'react-redux';
// import { sendOrderRequest , getRequest} from '../../../redux/orderRedux';
import { getCartLines, sendOrderRequest , getRequest } from '../../../redux/cartRedux';
import { getUserId } from '../../../redux/userRedux';


class OrderForm extends React.Component {
  state = {    
    email: '', 
    name: '',
    error: {email: null, name: null},
    sent: false,
  };
  
  handleChange = ({target}) => {
    const verifyError = () => {
      if (this.state.error.email || this.state.error.name) {
        switch (name) {
          case 'email' : 
            if (!this.emailEmpty(value) && this.emailOK(value)) this.setState({...this.state, error: {...this.state.error, email: null}});
            break;
          case 'name' :
            if (!this.nameEmpty(value) && this.nameOK(value)) this.setState({...this.state, error: {...this.state.error, name: null}});
            break;
          default : 
            return;
        }
      }
    };
    const { name, value } = target;
    this.setState({...this.state, [name]: value}, verifyError);
  };
  emailEmpty = (email) => !email.length;
  nameEmpty = (name) => !name.length;
  nameOK = (name) => (name.length >= 5 && name.length <= 30);
  emailOK = (email) => validator.isEmail(email);

  validateData = () => {
    const {email, name} = this.state;
    console.log('name.length: ', name.length);
    console.log('nameOK: ', this.nameOK(name));
    let error = {email: null, name: null};
    if(this.emailEmpty(email) ) error.email = `You can't leave email field empty`;
    else if(this.nameEmpty(name)) error.name = `You can't leave name field empty`;
    else if(!this.nameOK(name)) error.name = `Enter between 5 and 30 characters`;
    else if(!this.emailOK(email)) error.email =  `Enter valid email`;

    return error;
  }
  
  handleSubmit = (e) => {
    const { userId } = this.props;
    const { email, name } = this.state;
    const lines = this.props.cartLines;
    const order = {lines, email, name, userId}; 
    const {sendOrder} = this.props;
    
    e.preventDefault();
    
    const error = this.validateData();
    // const error = {email: null, name: null};
    if(!error.email && !error.name) {      
      sendOrder(order);
      this.setState({ ...this.state, error: {email: null, name: null}, sent: true });
      
    }
    else this.setState({ ...this.state, error });  
  }

  render = () => {    
    const {request, cartLines} = this.props;
    const {sent, error} = this.state;
    const total = cartLines.reduce((a, c) => a + c.quantity * c.price, 0);
    return (
      <div className={styles.root}>
        { (sent && !request.active && !request.error) && <div className="alert successAlert" role="alert">Your order has been succesfully submited.</div> }
        { (sent && request.error) && <div className="alert errorAlert" role="alert">Request Error.</div> }
        { (sent && request.active) && <div className="d-flex justify-content-center"><div className="spinner-border text-secondary" role="status"><span className="sr-only">Loading...</span></div></div> }
        { !sent && (
          <div>
            <div className={styles.pageHeader} >Checkout Form</div>
            <div className={styles.order}>
              <div className={styles.tableHeader}>
                <div className="row">            
                  <div className="col-1"></div>
                  <div className="col-5">Product</div>
                  <div className="col-2 d-flex justify-content-center">Quantity</div>
                  <div className="col-2">Price</div>
                  <div className="col-2 d-flex justify-content-end">Total</div>
                </div>
              </div>
              <div className={styles.orderLines}>
                {cartLines.map((cl, i) => (
                  <div key={cl.productId} className="row p-1 align-items-center">
                    <div className="col-1 d-flex justify-content-center">{i + 1}.</div>
                    <div className="col-5">
                      <div className="row">
                        <div className="col-12">{cl.title}</div>
                        <div className="col-12">{cl.note ? 
                          (<div className={styles.note}>{cl.note}</div>) :
                          (<div className={styles.noNote}>No notes to this item</div>)
                        }
                        </div>
                      </div>
                    </div>
                    <div className="col-2 d-flex justify-content-center">{cl.quantity}</div>
                    <div className="col-2">$ {cl.price}</div>
                    <div className="col-2 d-flex justify-content-end">$ {cl.price * cl.quantity}</div>                    
                  </div>
                ))}
              </div>  
            </div>
            <div className={styles.total}>
                Total: $ {total}
            </div>
            <div className={styles.contact}>
              <div className={styles.contactHeader} >Contact info</div>
              
              <div className="row g-4 gx-lg-5">
                <div className="col-12 col-md-6">                  
                  <div className={styles.formGroup}>
                    { error.email && <div className={styles.validationMessage}>{error.email}</div> }
                    <input onChange={this.handleChange} name="email" type="email" placeholder="Your Email" className={styles.email} />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className={styles.formGroup}>
                    { error.name && <div className={styles.validationMessage}>{error.name}</div> }
                    <input onChange={this.handleChange} name="name" type="text" placeholder="Your Name" className={styles.name} />
                  </div>
                  
                </div>
                <div className="col-12 col-md-6">
                  <button type="submit" onClick={this.handleSubmit} className={styles.sendButton}>Send Order</button>
                </div>
                <div className="col-12 col-md-6">
                  <Link to="/cart"><button type="button" className={styles.backButton}>Back to Cart</button></Link>
                </div>
              </div>
              
            </div>
          </div>
        )}
      </div>
    );
  }
}

OrderForm.propTypes = {
  sendOrder: PropTypes.func,
  cartLines: PropTypes.array,
  request: PropTypes.object,
  userId: PropTypes.string,
};

const mapStateToProps = (state) => ({
  cartLines: getCartLines(state),
  request: getRequest(state, 'SEND_ORDER'),
  userId: getUserId(state),
});

const mapDispatchToProps = (dispatch) => ({
  sendOrder: (payload) => dispatch(sendOrderRequest(payload)),
});

const OrderFormContainer = connect(mapStateToProps, mapDispatchToProps)(OrderForm);
export {
  //OrderForm,
  OrderFormContainer as OrderForm,
  OrderForm as OrderFormComponent,
};
