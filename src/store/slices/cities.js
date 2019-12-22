import { createSlice } from '@reduxjs/toolkit';
import { getAllCities, detectCity } from '../api';

const defaultCity = 'Владимир';

const citiesSlice = createSlice({
  name: 'cities',
  initialState: {
    currentCity: defaultCity,
    cities: []
  },
  reducers: {
    setCurrentCity(state, action) {
      state.currentCity = action.payload;
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
  Promise.all([getAllCities(), detectCity()])
    .then(([cities, detectedCity]) => {
      cities = cities.filter(c => isNaN(+c.city));
      const findedCity = cities.find(
        c =>
          c.city.trim().toLowerCase() === detectedCity.city.trim().toLowerCase()
      );
      dispatch(setCurrentCity(findedCity || defaultCity));
      dispatch(setCities(cities));
    })
    .catch(err => {
      dispatch(setCurrentCity(defaultCity));
    });
};
