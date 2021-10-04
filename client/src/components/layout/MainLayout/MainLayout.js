import React from 'react';
import PropTypes from 'prop-types';
import styles from './MainLayout.module.scss';
import { connect } from 'react-redux';
import { getCartLines, loadCartRequest} from '../../../redux/cartRedux';

import { Header } from './../Header/Header';
// import { Footer } from './../Footer/Footer';

class MainLayout extends React.Component {
  componentDidMount = () => {
    const {loadCart} = this.props;
    loadCart();
  }
  render = () => {
    const {children, cartLines} = this.props;
    return (
      <div className={styles.root}>
        <Header cartLines={cartLines}/>
        <div className={styles.content}>
          {children}
        </div>   
      </div>
    );
  }
} 

MainLayout.propTypes = {
  children: PropTypes.node,
  cartLines: PropTypes.array,  
  loadCart: PropTypes.func,
};


const mapStateToProps = (state, props) => ({
  cartLines: getCartLines(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadCart: () => dispatch(loadCartRequest()),
});
const MainLayoutContainer = connect(mapStateToProps, mapDispatchToProps)(MainLayout);


export {
  // MainLayout,
  MainLayoutContainer as MainLayout,
  MainLayout as MainLayoutComponent,
};
