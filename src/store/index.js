import { combineReducers } from 'redux';
import cities from './slices/cities';
import settings from './slices/settings';
import { configureStore } from '@reduxjs/toolkit';

const reducers = combineReducers({
  cities,
  settings
});

export default configureStore({ reducer: reducers });
