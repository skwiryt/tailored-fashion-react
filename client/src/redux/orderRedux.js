import axios from 'axios';
import { API_URL } from '../config';
export const getRequest = ({order}, type) => order.requests[type];

/* selectors */


/* action name creator */
const reducerName = 'products';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const REQUEST_START = createActionName('REQUEST_START');
const REQUEST_SUCCESS = createActionName('REQUEST_SUCCESS');
const REQUEST_ERROR = createActionName('REQUEST_ERROR');


/* action creators */
export const requestStart = payload => ({ payload, type: REQUEST_START });
export const requestSuccess = payload => ({ payload, type: REQUEST_SUCCESS });
export const requestError = payload => ({ payload, type: REQUEST_ERROR });

/* thunk creators */
export const sendOrderRequest = (order) => {
  
  return async (dispatch) => {
    console.log('order.lines: ', order.lines);
    const {lines, name, email} = order;
    const data = {lines, name, email};
    dispatch(requestStart('SEND_ORDER'));
    try {
      const response = await axios.post(API_URL + '/orders', data);
      dispatch(requestSuccess('SEND_ORDER'));
      //console.log('response.data: ', response.data);
    } catch(err) {      
      console.log('err: ', err);
      dispatch(requestError('SEND_ORDER'));
    }
        
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
   
    
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