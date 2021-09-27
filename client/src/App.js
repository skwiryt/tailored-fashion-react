import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { Cart } from './components/views/Cart/Cart';
import { OrderForm } from './components/views/OrderForm/OrderForm';
import { Product } from './components/views/Product/Product';
import { Home } from './components/views/Home/Home';
import { NotFound } from './components/views/NotFound/NotFound';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/orderform' component={OrderForm} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/product/:id' component={Product} />
            <Route path='*' component={NotFound} />
          </Switch>
        </MainLayout>
      </BrowserRouter>
    </Provider>
    
    
  );
}

export default App;
