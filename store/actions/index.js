import * as actionTypes from '../constants/action-types';

export const addToCart = (item) => ({ type: actionTypes.ADD_TO_CART, item });

export const removeFromCart = (id) => ({
  type: actionTypes.REMOVE_FROM_CART,
  id,
});

export const clearCart = () => ({ type: actionTypes.CLEAR_CART });

export const increaseLoadedItems = (collection) => ({
  type: actionTypes.INCREASE_LOADED_ITEMS,
  collection,
});

export const changeOption = (option) => ({
  type: actionTypes.FILTER_OPTION,
  option,
});

export const clearOption = () => ({
  type: actionTypes.CLEAR_FILTER_OPTION,
});

export const changeDisplay = (option) => ({
  type: actionTypes.DISPLAY_OPTION,
  option,
});
