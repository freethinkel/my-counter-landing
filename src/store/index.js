import { combineReducers } from 'redux';
import cities from './slices/cities';
import { configureStore } from '@reduxjs/toolkit';

const reducers = combineReducers({
  cities
});

export default configureStore({ reducer: reducers });
