import axios from 'axios';
import { API_URL } from '../config';

/* selectors */
export const getRequest = ({cart}, type) => cart.requests[type];
export const getCartLines = ({cart}) => cart.lines;
export const getActiveAgent = ({cart}) => cart.activeAgent;


/* action name creator */
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const REQUEST_START = createActionName('REQUEST_START');
const REQUEST_SUCCESS = createActionName('REQUEST_SUCCESS');
const REQUEST_ERROR = createActionName('REQUEST_ERROR');

const LOAD_CART = createActionName('LOAD_CART');
const ADD_LINE = createActionName('ADD_LINE');
const REMOVE_LINE = createActionName('REMOVE_LINE');
const SET_QUANTITY = createActionName('SET_QUANTITY');
const SET_NOTE = createActionName('SET_NOTE');
const MARK_AGENT = createActionName('MARK_AGENT');

/* action creators */
export const requestStart = payload => ({ payload, type: REQUEST_START });
export const requestSuccess = payload => ({ payload, type: REQUEST_SUCCESS });
export const requestError = payload => ({ payload, type: REQUEST_ERROR });

export const loadCart = payload => ({ payload, type: LOAD_CART });
export const addLine = payload => ({ payload, type: ADD_LINE }); // payload is a line object
export const setQuantity = payload => ({ payload, type: SET_QUANTITY }); // payload: {productId, quantity}
export const setNote = payload => ({ payload, type: SET_NOTE }); // payload: {productId, note}
export const removeLine = payload => ({ payload, type: REMOVE_LINE }); // payload = productId
export const markAgent = payload => ({payload, type: MARK_AGENT });


/* thunk creators */
// now cart is loaded just from local storage

export const loadCartRequest = () => {
  console.log('loadCartRequest thunk is called');  
  return async dispatch => { 
    const cartLines = JSON.parse(localStorage.getItem('TF_cartLines')) || [];
    const activeAgent = JSON.parse(localStorage.getItem('TF_activeAgent')) || false;
    dispatch(loadCart(cartLines));
    dispatch(markAgent(activeAgent));
  };
};
export const addToCartRequest = (line) => {  
  return async (dispatch, getState) => {
    const {cart} = getState();
    if (cart.lines.some(l => l.productId === line.productId)) {
      //setQuantity
      const lines = JSON.parse(localStorage.getItem('TF_cartLines'));
      const lineIndex = lines.findIndex(l => l.productId === line.productId);
      const newQuantity = lines[lineIndex].quantity += line.quantity;  
      localStorage.setItem('TF_cartLines', JSON.stringify(lines));
      dispatch(setQuantity({productId: line.productId, quantity:newQuantity }));
    } else {
      //addLine
      const lines = JSON.parse(localStorage.getItem('TF_cartLines')) || [];
      lines.push(line);
      localStorage.setItem('TF_cartLines', JSON.stringify(lines));
      dispatch(addLine(line));
    }
  };
};
export const setQuantityRequest = ({productId, quantity}) => {
  return async (dispatch, getState) => {
    const {cart} = getState();
    if (cart.lines.some(l => l.productId === productId)) {
      //setQuantity
      const lines = JSON.parse(localStorage.getItem('TF_cartLines'));
      const lineIndex = lines.findIndex(l => l.productId === productId);
      lines[lineIndex].quantity = quantity;  
      localStorage.setItem('TF_cartLines', JSON.stringify(lines));
      dispatch(setQuantity({productId, quantity}));
    } 
  };
};
export const setNoteRequest = ({productId, note}) => {
  return async (dispatch, getState) => {
    const {cart} = getState();
    if (cart.lines.some(l => l.productId === productId)) {
      //setNote
      const lines = JSON.parse(localStorage.getItem('TF_cartLines'));
      const lineIndex = lines.findIndex(l => l.productId === productId);
      lines[lineIndex].note = note;  
      localStorage.setItem('TF_cartLines', JSON.stringify(lines));
      dispatch(setNote({productId, note}));
    } 
  };
};

export const removeLineRequest = (productId) => {  
  return async (dispatch, getState) => {
    const {cart} = getState();
    if (cart.lines.some(l => l.productId === productId)) {
      //remove line
      const lines = JSON.parse(localStorage.getItem('TF_cartLines'));
      const newSet = lines.filter(l => l.productId!== productId);
      localStorage.setItem(`TF_cartLines`, JSON.stringify(newSet));
      dispatch(removeLine(productId));
    } 
    
  };
};

export const sendOrderRequest = (order) => {
  
  return async (dispatch) => {
    console.log('order.lines: ', order.lines);
    const {lines, name, email, userId} = order;
    const data = {lines, name, email, userId};
    dispatch(requestStart('SEND_ORDER'));
    try {
      const response = await axios.post(API_URL + '/orders', data);
      dispatch(requestSuccess('SEND_ORDER'));
      console.log('response.data: ', response.data);

      // mark agent as active
      localStorage.setItem(`TF_activeAgent`, JSON.stringify(true));
      dispatch(markAgent(true));

    } catch(err) {      
      console.log('err: ', err);
      dispatch(requestError('SEND_ORDER'));
    }
        
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case MARK_AGENT: {
      return {
        ...statePart,
        activeAgent: action.payload,
      };
    }
    case ADD_LINE: {
      return {
        ...statePart,
        lines: [...statePart.lines, action.payload],
      };
    }
    case SET_QUANTITY: {      
      const lines = [...statePart.lines];
      const lineIndex = lines.findIndex(l => l.productId === action.payload.productId);
      lines[lineIndex].quantity = action.payload.quantity;
      return {
        ...statePart,
        lines,
      };
    }
    case SET_NOTE: {      
      const lines = [...statePart.lines];
      const lineIndex = lines.findIndex(l => l.productId === action.payload.productId);
      lines[lineIndex].note = action.payload.note;
      return {
        ...statePart,
        lines,
      };
    }
    case REMOVE_LINE :
      return {
        ...statePart,
        lines: statePart.lines.filter(l => l.productId !== action.payload),
      };
    case LOAD_CART: {
      return {
        ...statePart,
        lines: action.payload,
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