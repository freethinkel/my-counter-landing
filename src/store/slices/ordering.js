import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { sendLeadToBitrix } from '../api';
import { DatePipe } from '../../helpers/datePipe';

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
      const service = action.payload;
      state.currentService = service;
      if (service && service.dates && service.dates.length) {
        const dates = service.dates
          .map(e => new Date(e.date))
          .filter(
            e =>
              new Date(e.setHours(0, 0, 0, 0)).getTime() >=
              new Date(new Date().setHours(0, 0, 0, 0)).getTime()
          )
          .sort((a, b) => a.getTime() - b.getTime());
        console.log(dates);
        if (dates.length) {
          state.departDate = dates[0] + '';
        } else {
          state.departDate = null;
        }
      }
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
  let _model = {
    fname: model.name,
    city: `${model.city.name}_${model.city.id}`,
    date: new DatePipe(model.departDate).getShortDate(),
    address: model.address,
    tel: (model.phoneNumber + '')
      .split('')
      .filter(e => !isNaN(+e) && e !== ' ')
      .join(''),
    act: 'submit_pform',
    service: model.currentService.service_id
    // fields: {
    //   NAME: model.name,
    //   STATUS_ID: 'NEW',
    //   OPENED: 'Y',
    //   PHONE: [{ VALUE: model.phoneNumber, VALUE_TYPE: 'WORK' }],
    //   OPPORTUNITY: model.currentService.price,
    //   TITLE: `Заявка с сайта - ${model.currentService.description}`,
    //   ADDRESS_CITY: model.city,
    //   ADDRESS: model.address,
    //   HAS_PHONE: 'Y',
    //   SOURCE_DESCRIPTION: 'Заявка с сайта "Мой счетчик"',
    //   COMMENTS: `Выбранная дата выезда ${new DatePipe(
    //     model.departDate
    //   ).getLongDate()}`
    // }
  };
  sendLeadToBitrix(_model)
    .then(data => {
      dispatch(setOrderingSuccess(true));
      setTimeout(() => {
        dispatch(setOrderingSuccess(false));
      }, 1000 * 5);
    })
    .catch(err => {
      dispatch(setOrderingError(true));
    })
    .finally(() => {
      dispatch(setOrderingLoading(false));
    });
  setTimeout(() => {}, 2000);
  // axios.get
};
