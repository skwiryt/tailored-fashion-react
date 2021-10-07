export const initialState = {
  products: {
    //data: [{id: '123', title: 'First product'}, {id: '234', title: 'Second product'}],
    data: [],
    requests: {
      LOAD_PRODUCTS: {
        active: false,
        error: false,
      },
    },
  },
  cart: {
    activeAgent: false,
    lines: [],
    requests: {
      LOAD_CART: {
        active: false,
        error: false,
      },
      ADD_LINE: {
        active: false,
        error: false,
      },
      REMOVE_LINE: {
        active: false,
        error: false,
      }, 
      SEND_ORDER: {
        active: false,
        error: false,        
      },  
    },
  },
  
};