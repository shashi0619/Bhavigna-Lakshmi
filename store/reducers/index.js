import { combineReducers } from 'redux';
import { ITEMS_PER_PAGE } from '../../util/globals';

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  INCREASE_LOADED_ITEMS,
  FILTER_OPTION,
  DISPLAY_OPTION,
  CLEAR_FILTER_OPTION,
} from '../constants/action-types';

export const initialState = {
  cart: [],
  loadMore: { all: ITEMS_PER_PAGE },
  filter: { option: '', display: 'all' },
};

const cart = (state = initialState.cart, action) => {
  if (action.type === ADD_TO_CART) {
    if (state.some((item) => item._id === action.item._id)) return state;
    return [...state, { ...action.item, images: [...action.item.images] }];
  }
  if (action.type === REMOVE_FROM_CART) {
    return state.filter((item) => item._id !== action.id);
  }
  if (CLEAR_CART === action.type) {
    return [];
  }
  return state;
};

const loadMore = (state = initialState.loadMore, action) => {
  if (INCREASE_LOADED_ITEMS === action.type) {
    return {
      ...state,
      [action.collection]:
        (state[action.collection] || ITEMS_PER_PAGE) + ITEMS_PER_PAGE,
    };
  }
  return state;
};

const filter = (state = initialState.filter, action) => {
  if (FILTER_OPTION === action.type) {
    return { ...state, option: action.option };
  }
  if (CLEAR_FILTER_OPTION === action.type) {
    return { ...state, option: '' };
  }
  if (DISPLAY_OPTION === action.type) {
    return { ...state, display: action.option };
  }
  return state;
};

export default combineReducers({ cart, loadMore, filter });
