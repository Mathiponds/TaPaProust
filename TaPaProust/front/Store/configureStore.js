// Store/configureStore.js

import { createStore } from 'redux';
import { combineReducers } from 'redux';
import toggleMyBooks from './Reducers/myBooksReducer'
import toggleFavorite from './Reducers/favoriteReducer'

export default createStore(combineReducers({
  toggleFavorite,
  toggleMyBooks
}))
