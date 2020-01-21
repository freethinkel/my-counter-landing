import { createSlice } from '@reduxjs/toolkit';
import {
  getSettingsContentful,
  getServiceDates,
  getServicePrices
} from '../api';
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
    },
    setServicesDate(state, action) {
      state.services.forEach(s => (s.dates = []));
      (action.payload || []).forEach(d => {
        state.services.forEach(service => {
          if (d.serviceId === service.service_id) {
            service.dates = d.dates || [];
          }
        });
      });
      // state.services.forEach(e => (e.dates = action.payload));
    },
    setServicesPrice(state, action) {
      const prices = action.payload;
      prices.forEach(_price => {
        const { serv_id, price } = _price;
        state.services.forEach(service => {
          if (service.service_id === serv_id) {
            service.price = price;
          }
        });
      });
    }
  }
});

export const {
  setSettingsData,
  setServicesDate,
  setServicesPrice
} = settingsSlice.actions;

export default settingsSlice.reducer;

export const getAppSettingsAction = dispatch => () => {
  getSettingsContentful().then(data => {
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
  });
};

export const getServiceDateAction = dispatch => (servicesId, cityId) => {
  Promise.all(
    servicesId.map(serviceId => getServiceDates(serviceId, cityId))
  ).then(datess => {
    dispatch(
      setServicesDate(
        servicesId.map((id, i) => ({
          serviceId: id,
          dates: datess[i] || []
        }))
      )
    );
  });
};

export const getServicePricesAction = dispatch => cityId => {
  getServicePrices(cityId).then(data => {
    dispatch(setServicesPrice(data || []));
  });
};
