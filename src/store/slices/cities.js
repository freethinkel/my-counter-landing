import { createSlice } from '@reduxjs/toolkit';
import {
  getAllCities,
  detectCity,
  getServiceDate,
  getRegionsRequest
} from '../api';

export const defaultCity =
  window?.localStorage?.getItem('currentCity') || 'Владимир';

const citiesSlice = createSlice({
  name: 'cities',
  initialState: {
    currentCity: null,
    currentCityData: {},
    regions: [],
    cities: [],
    serviceDate: null,
    currentGeocode: null
  },
  reducers: {
    setRegions(state, action) {
      state.regions = action.payload;
    },
    setCurrentGeocode(state, action) {
      state.currentGeocode = action.payload;
    },
    setCurrentCityData(state, action) {
      state.currentCityData = action.payload;
    },
    setCurrentCity(state, action) {
      if (window.localStorage) {
        window.localStorage.setItem('currentCity', action.payload);
      }
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

export const {
  setCurrentCity,
  setCities,
  setCurrentCityData,
  setCurrentGeocode,
  setRegions
} = citiesSlice.actions;

export default citiesSlice.reducer;

export const initCitiesAction = dispatch => {
  try {
    getRegionsAction(dispatch);
    getAllCities()
      .then(cities => {
        cities = cities.filter(c => isNaN(+c.city));
        dispatch(setCities(cities));
        detectCity()
          .then(detectedCity => {
            const findedCity = cities.find(
              c =>
                c?.city?.trim()?.toLowerCase() ===
                detectedCity?.city?.trim()?.toLowerCase()
            );
            dispatch(setCurrentCity(findedCity.city || defaultCity));
            dispatch(setCurrentCityData(detectedCity));
          })
          .catch(err => {
            dispatch(setCurrentCity(defaultCity));
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

export const getRegionsAction = dispatch => {
  try {
    getRegionsRequest().then(reg => {
      dispatch(setRegions(reg));
    });
  } catch (err) {
    console.log(err);
  }
};
