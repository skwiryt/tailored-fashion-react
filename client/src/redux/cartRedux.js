
/* selectors */

export const getCartLines = ({cart}) => cart.lines;


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

/* action creators */
export const requestStart = payload => ({ payload, type: REQUEST_START });
export const requestSuccess = payload => ({ payload, type: REQUEST_SUCCESS });
export const requestError = payload => ({ payload, type: REQUEST_ERROR });

export const loadCart = payload => ({ payload, type: LOAD_CART });
export const addLine = payload => ({ payload, type: ADD_LINE }); // payload is a line object
export const setQuantity = payload => ({ payload, type: SET_QUANTITY }); // payload: {productId, quantity}
export const setNote = payload => ({ payload, type: SET_NOTE }); // payload: {productId, note}
export const removeLine = payload => ({ payload, type: REMOVE_LINE }); // payload = productId


/* thunk creators */
// now cart is loaded just from local storage

export const loadCartRequest = () => {
  console.log('loadCartRequest thunk is called');  
  return async dispatch => { 
    const cartLines = JSON.parse(localStorage.getItem('cartLines')) || [];
    dispatch(loadCart(cartLines));
  };
};
export const addToCartRequest = (line) => {  
  return async (dispatch, getState) => {
    const {cart} = getState();
    if (cart.lines.some(l => l.productId === line.productId)) {
      //setQuantity
      const lines = JSON.parse(localStorage.getItem('cartLines'));
      const lineIndex = lines.findIndex(l => l.productId === line.productId);
      const newQuantity = lines[lineIndex].quantity += line.quantity;  
      localStorage.setItem(`cartLines`, JSON.stringify(lines));
      dispatch(setQuantity({productId: line.productId, quantity:newQuantity }));
    } else {
      //addLine
      const lines = JSON.parse(localStorage.getItem('cartLines')) || [];
      lines.push(line);
      localStorage.setItem(`cartLines`, JSON.stringify(lines));
      dispatch(addLine(line));
    }
  };
};
export const setQuantityRequest = ({productId, quantity}) => {
  return async (dispatch, getState) => {
    const {cart} = getState();
    if (cart.lines.some(l => l.productId === productId)) {
      //setQuantity
      const lines = JSON.parse(localStorage.getItem('cartLines'));
      const lineIndex = lines.findIndex(l => l.productId === productId);
      lines[lineIndex].quantity = quantity;  
      localStorage.setItem(`cartLines`, JSON.stringify(lines));
      dispatch(setQuantity({productId, quantity}));
    } 
  };
};
export const setNoteRequest = ({productId, note}) => {
  return async (dispatch, getState) => {
    const {cart} = getState();
    if (cart.lines.some(l => l.productId === productId)) {
      //setNote
      const lines = JSON.parse(localStorage.getItem('cartLines'));
      const lineIndex = lines.findIndex(l => l.productId === productId);
      lines[lineIndex].note = note;  
      localStorage.setItem(`cartLines`, JSON.stringify(lines));
      dispatch(setNote({productId, note}));
    } 
  };
};

export const removeLineRequest = (productId) => {  
  return async (dispatch, getState) => {
    const {cart} = getState();
    if (cart.lines.some(l => l.productId === productId)) {
      //remove line
      const lines = JSON.parse(localStorage.getItem('cartLines'));
      const newSet = lines.filter(l => l.productId!== productId);
      localStorage.setItem(`cartLines`, JSON.stringify(newSet));
      dispatch(removeLine(productId));
    } 
    
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
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