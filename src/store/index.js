import { combineReducers } from 'redux';
import cities from './slices/cities';
import settings from './slices/settings';
import ordering from './slices/ordering';
import { configureStore } from '@reduxjs/toolkit';

const reducers = combineReducers({
  cities,
  ordering,
  settings
});

export default configureStore({ reducer: reducers });
