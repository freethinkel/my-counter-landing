import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const orderingSlice = createSlice({
  name: 'ordering',
  initialState: {
    loading: false,
    success: false,
    error: false,
    currentService: null,
    phoneNumber: '',
    name: '',
    address: '',
    departDate: ''
  },
  reducers: {
    selectService(state, action) {
      state.currentService = action.payload;
    },
    setPhoneNumberOrdering(state, action) {
      state.phoneNumber = action.payload;
    },
    setNameOrdering(state, action) {
      state.name = action.payload;
    },
    setAddressOrdering(state, action) {
      state.address = action.payload;
    },
    setDepartDateOrdering(state, action) {
      state.departDate = action.payload;
    },
    setOrderingLoading(state, action) {
      state.loading = action.payload;
    },
    setOrderingError(state, action) {
      state.error = action.payload;
    },
    setOrderingSuccess(state, action) {
      state.success = action.payload;
    }
  }
});

export const {
  selectService,
  setPhoneNumberOrdering,
  setNameOrdering,
  setAddressOrdering,
  setDepartDateOrdering,
  setOrderingError,
  setOrderingLoading,
  setOrderingSuccess
} = orderingSlice.actions;

export default orderingSlice.reducer;

export const sendNewOrderAction = dispatch => model => {
  dispatch(setOrderingLoading(true));
  setTimeout(() => {
    dispatch(setOrderingLoading(false));
    dispatch(setOrderingSuccess(true));
  }, 2000);
  // axios.get
};
