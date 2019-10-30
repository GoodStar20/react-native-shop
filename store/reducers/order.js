import { ADD_ORDER, PLACE_ORDER } from '../actions/order';
import Order from '../../models/order';

const initialState = {
  orders: [],
  total: 0,
  orderAdded: false
}

export default (state = initialState, action) => {

  switch (action.type) {

    case ADD_ORDER:
      return {
        ...state,
        orderAdded: action.bool
      }

    case PLACE_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date);
      return {
        ...state,
        orders: state.orders.concat(newOrder),
        total: action.orderData.amount
      }
  }
  return state;
}