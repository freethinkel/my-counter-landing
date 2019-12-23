import axios from 'axios';
import { createClient } from 'contentful';

export const getAllCities = () => {
  return axios.get('https://itl33.ru/b24/poverka/get_cities.php').then(res => {
    return res.data || [];
  });
};

export const detectCity = () => {
  // FIXME: http://api.ipstack.com//check?access_key=c6d1e3b4851f1ab8a550b8a55b6d1aeb&language=ru
  return axios.get('https://ip-api.com/json?lang=ru').then(res => {
    return res.data;
  });
};

export const getSettingsContentful = () => {
  return cful
    .getEntries({ content_type: 'settings', include: 4 })
    .then(d => d.items[0].fields);
};

export const cful = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN
});
