import { createSlice } from '@reduxjs/toolkit';
import { getSettingsContentful } from '../api';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {},
  reducers: {
    setData(state, action) {
      state = action.payload;
    }
  }
});

export const { setData } = settingsSlice.actions;

export default settingsSlice.reducer;

export const getAppSettingsAction = dispatch => () => {
  getSettingsContentful().then(data => {
    console.log(data);
  });
};
