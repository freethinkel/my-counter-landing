import axios from 'axios';

export const getAllCities = () => {
  return axios.get('https://itl33.ru/b24/poverka/get_cities.php').then(res => {
    return res.data || [];
  });
};

export const detectCity = () => {
  return axios.get('http://ip-api.com/json?lang=ru').then(res => {
    return { ...res.data, city: 'Шуя' };
  });
};
