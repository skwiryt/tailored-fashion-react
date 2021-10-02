import axios from 'axios';
import { API_URL } from '../config';

/* selectors */
export const getProducts = ({products}) => products.data;
export const getProduct = ({products}, id) => products.data.find(p => p.id === id);
export const getRequest = ({posts}, type) => posts.requests[type];

/* action name creator */
const reducerName = 'products';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const REQUEST_START = createActionName('REQUEST_START');
const REQUEST_SUCCESS = createActionName('REQUEST_SUCCESS');
const REQUEST_ERROR = createActionName('REQUEST_ERROR');

const LOAD_PRODUCTS = createActionName('LOAD_PRODUCTS');


/* action creators */
export const requestStart = payload => ({ payload, type: REQUEST_START });
export const requestSuccess = payload => ({ payload, type: REQUEST_SUCCESS });
export const requestError = payload => ({ payload, type: REQUEST_ERROR });
export const loadProducts = payload => ({ payload, type: LOAD_PRODUCTS });

/* thunk creators */
export const loadProductsRequest = loadedProducts => {
  console.log('loadProductsRequest thunk is called');  
  return async dispatch => {
    if (!loadedProducts || !loadedProducts.length) {
      console.log('dispatch for fetch fired by Thunk');
      dispatch(requestStart('LOAD_PRODUCTS'));
      try {
        const response = await axios.get(API_URL + '/products');
        dispatch(loadProducts(response.data));
        dispatch(requestSuccess('LOAD_PRODUCTS'));
        console.log('response.data: ', response.data);
      } catch(err) {
        // dispatch(requestError(err.message || true));
        dispatch(requestError('LOAD_PRODUCTS'));
      }
    }      
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
   
    case LOAD_PRODUCTS: {
      return {
        ...statePart,
        data: action.payload,
      };
    }
    case REQUEST_START : {
      return {
        ...statePart, requests: {...statePart.requests, [action.payload]: {active: true, error: false}},
      };  
    }
    case REQUEST_SUCCESS : {
      return {
        ...statePart, requests: {...statePart.requests, [action.payload]: {active: false, error: false}},
      };
    }
    case REQUEST_ERROR : {
      return {
        ...statePart, requests: {...statePart.requests, [action.payload]: {active: false, error: true}},
      };
    }
    default:
      return statePart;
  }
};