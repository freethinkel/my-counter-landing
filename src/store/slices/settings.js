import { createSlice } from '@reduxjs/toolkit';

const defaultCity = '';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    currentCity: ''
  },
  reducers: {}
});

export const {} = settingsSlice.actions;

export default settingsSlice.reducer;

// export const logoutAction = dispatch => () => {
//   // dispatch(setToken(''));
// };
