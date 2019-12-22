import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Provider, useDispatch } from 'react-redux';
import store from './store';
import Routes from './Routes';
import { initCitiesAction } from './store/slices/cities';
import { getAppSettingsAction } from './store/slices/settings';

ReactDOM.render(
  <Provider store={store}>
    <Bootstrap />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

function Bootstrap() {
  const dispatch = useDispatch();
  useEffect(() => {
    initCitiesAction(dispatch);
    getAppSettingsAction(dispatch)();
  }, []);
  return <Routes />;
}
