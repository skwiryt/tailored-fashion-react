import React from 'react';
import PropTypes from 'prop-types';
import styles from './MainLayout.module.scss';
import { connect } from 'react-redux';
import { getCartLines, loadCartRequest, getActiveAgent} from '../../../redux/cartRedux';
import { loadUserRequest, getUserId} from '../../../redux/userRedux';

import { Header } from './../Header/Header';
// import { Footer } from './../Footer/Footer';

class MainLayout extends React.Component {
  componentDidMount = () => {
    const {loadCart, loadUser} = this.props;
    loadCart();
    loadUser();
  }
  render = () => {
    const {children, cartLines, activeAgent, userId} = this.props;
    return (
      <div className={styles.root}>
        <Header cartLines={cartLines} activeAgent={activeAgent} userId={userId}/>
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
  activeAgent: PropTypes.bool,
  loadCart: PropTypes.func,
  loadUser: PropTypes.func,
  userId: PropTypes.string,
};


const mapStateToProps = (state, props) => ({
  cartLines: getCartLines(state),
  activeAgent: getActiveAgent(state),
  userId: getUserId(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadCart: () => dispatch(loadCartRequest()),
  loadUser: () => dispatch(loadUserRequest()),

});
const MainLayoutContainer = connect(mapStateToProps, mapDispatchToProps)(MainLayout);


export {
  // MainLayout,
  MainLayoutContainer as MainLayout,
  MainLayout as MainLayoutComponent,
};
