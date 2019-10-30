import { ADD_TO_CART, DELETE_FROM_CART,CLEAR_CART } from '../actions/cart';
import Cart from '../../models/cart';
import { useSelector } from 'react-redux';
import { REMOVE_ORDER } from '../actions/order';
const initialState = {
  items: {},
  totalAmount: 0,
  quantity: 0
}


export default (state = initialState, action) => {

  switch (action.type) {

    case ADD_TO_CART:
      state.quantity++;
      let itemQuantity = 1, sum = 0;
      if (state.items[action.product.id]) {
        itemQuantity = state.items[action.product.id].quantity + 1;
        sum = state.items[action.product.id].sum + action.product.price;
      }
      let item = new Cart(
        itemQuantity,
        action.product.title,
        action.product.price,
        sum
      )

      return {
        ...state,
        items: { ...state.items, [action.product.id]: item },
        totalAmount: state.totalAmount + action.product.price,
        quantity: state.quantity
      }

    case DELETE_FROM_CART:
      const itemsQuantity = state.quantity - action.product.quantity;
      const total = state.totalAmount - (action.product.price * action.product.quantity);
      delete state.items[action.product.id]
      return {
        ...state,
        items: state.items,
        totalAmount: total,
        quantity: itemsQuantity
      }
      case CLEAR_CART:
        return {items: {},
        totalAmount: 0,
        quantity: 0}
        

  }

  return state;
}