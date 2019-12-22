import { createSlice } from '@reduxjs/toolkit';
import { getSettingsContentful } from '../api';
import { selectService } from './ordering';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    app_loading: true,
    name: '',
    phone_number: '',
    header: '',
    description: {},
    banner_photo: {}
  },
  reducers: {
    setSettingsData(state, action) {
      console.log(action);
      Object.keys(action.payload).forEach(key => {
        state[key] = action.payload[key];
      });
      state.app_loading = false;
    }
  }
});

export const { setSettingsData } = settingsSlice.actions;

export default settingsSlice.reducer;

export const getAppSettingsAction = dispatch => () => {
  getSettingsContentful().then(data => {
    console.log(data);
    let _data = { ...data };
    _data.banner_photo = data.banner_photo.fields;
    _data.services = data.services.map(e => ({
      ...e.fields,
      photo: e.fields.photo.fields
    }));
    _data.advantages = data.advantages.map(e => ({
      ...e.fields,
      photo: e.fields.photo.fields
    }));
    _data.faqs = data.faqs.map(e => e.fields);
    _data.partners = data.partners.map(e => ({
      ...e.fields,
      photo: e.fields.photo.fields
    }));
    dispatch(setSettingsData(_data));
    dispatch(selectService(_data.services[0]));
  });
};
