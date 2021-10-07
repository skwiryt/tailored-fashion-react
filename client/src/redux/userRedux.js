/* selectors */

export const getUserId = ({user}) => user.id;


/* action name creator */
const reducerName = 'user';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const REQUEST_START = createActionName('REQUEST_START');
const REQUEST_SUCCESS = createActionName('REQUEST_SUCCESS');
const REQUEST_ERROR = createActionName('REQUEST_ERROR');

const LOAD_USER = createActionName('LOAD_USER');

/* action creators */
export const requestStart = payload => ({ payload, type: REQUEST_START });
export const requestSuccess = payload => ({ payload, type: REQUEST_SUCCESS });
export const requestError = payload => ({ payload, type: REQUEST_ERROR });

export const loadUser = payload => ({ payload, type: LOAD_USER });


/* thunk creators */
// now userId is loaded from local storage
// it is artificially generated if not existing

export const loadUserRequest = () => {
  console.log('loadUserRequest thunk is called'); 
  let userId = localStorage.getItem('TF_userId') || '';
  // artificialy generated userID      
  if (!userId) {
    userId = Math.floor(Math.random() * 10000).toString();
    localStorage.setItem('TF_userId', userId);
  }      
  return async dispatch => {    
    dispatch(loadUser(userId));
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    
    case LOAD_USER: {
      return {
        ...statePart,
        id: action.payload,
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