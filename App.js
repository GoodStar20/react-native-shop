import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import { theme } from './constants/theme';
import { Provider } from 'react-redux';
import ShopNavigation from './navigation/ShopNavigation';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import productsReducer from './store/reducers/products';
import cartsReducer from './store/reducers/cart';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import FlashMessage from "react-native-flash-message";




export default function App() {


  const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartsReducer,
    order: orderReducer,
    auth: authReducer
  });
  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ShopNavigation />
      </ThemeProvider>
      <FlashMessage position="top" />
    </Provider>

  );
}

