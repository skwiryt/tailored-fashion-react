export const initialState = {
  products: {
    data: [{id: '123', title: 'First product'}, {id: '234', title: 'Second product'}],
    request: {
      LOAD_PRODUCTS: {
        active: false,
        error: false,
      },
    },
  },
  order: {
    lines: [],
    detailes: {
      name: '',
      email: '',
    },
    status: 'empty',
    request: {   
      SEND_ORDER: {
        active: false,
        error: false,
      },
    },  
  },  
};