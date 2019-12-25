import { createSlice } from '@reduxjs/toolkit';
import { getAllCities, detectCity, getServiceDate } from '../api';

const defaultCity = 'Владимир';

const citiesSlice = createSlice({
  name: 'cities',
  initialState: {
    currentCity: null,
    cities: [],
    serviceDate: null
  },
  reducers: {
    setCurrentCity(state, action) {
      state.currentCity = action.payload;
    },
    setServiceDate(state, action) {
      state.serviceDate = new Date(action.payload);
    },
    setCities(state, action) {
      console.log(action);
      state.cities = action.payload || [];
    }
  }
});

export const { setCurrentCity, setCities } = citiesSlice.actions;

export default citiesSlice.reducer;

export const initCitiesAction = dispatch => {
  getAllCities().then(cities => {
    cities = cities.filter(c => isNaN(+c.city));
    dispatch(setCities(cities));
    detectCity()
      .then(detectedCity => {
        const findedCity = cities.find(
          c =>
            c.city.trim().toLowerCase() ===
            detectedCity.city.trim().toLowerCase()
        );
        dispatch(setCurrentCity(findedCity || defaultCity));
      })
      .catch(err => {
        dispatch(setCurrentCity(defaultCity));
      });
  });
};
