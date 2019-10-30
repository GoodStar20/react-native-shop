export const ADD_TO_CART = 'ADD_TO_CART';
export const DELETE_FROM_CART = 'DELETE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART'

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    product: product
  }
}

export const deleteFromCart = (product) => {
  return {
    type:DELETE_FROM_CART,
    product:product
  }
}

export const clearCart = () => {
  return {type: CLEAR_CART}
}