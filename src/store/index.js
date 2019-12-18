import { combineReducers } from 'redux';
import settings from './slices/settings';
import { configureStore } from '@reduxjs/toolkit';

const reducers = combineReducers({
  settings
});

export default configureStore({ reducer: reducers });
