import axios from 'axios';
import { createClient } from 'contentful';

export const getAllCities = () => {
  return axios.get('https://itl33.ru/b24/poverka/get_cities.php').then(res => {
    return res.data || [];
  });
};

export const detectCity = () => {
  // FIXME: http://api.ipstack.com//check?access_key=c6d1e3b4851f1ab8a550b8a55b6d1aeb&language=ru

  return axios.get('https://poverka.herokuapp.com/geolocation').then(res => {
    return res.data;
  });
};

export const getServiceDate = (serviceId, cityId) => {
  return axios
    .get(`https://itl33.ru/b24/poverka/get_date.php?city_id=${cityId}`)
    .then(res => res.data);
};

// export const getServiceDate = (serviceId, cityId) => {
// return axios
//   .post(
//     `https://itl33.ru/b24/poverka/index.php?act=get_dates&city_id=${cityId}&serv_id=${serviceId}`,
//     {
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'content-type': 'text/html'
//       }
//     }
//   )
//   .then((...d) => {
//     console.log(d);
//   })
//   .catch((...err) => {
//     console.log(err.response);
//   });
// return axios({
//   url: `https://itl33.ru/b24/poverka/index.php?act=get_dates&city_id=${cityId}&serv_id=${serviceId}`,
//   adapter: axiosJsonp
// });
// return new Promise((rslv, rjct) => {
//   console.log(serviceId);
//   jsonp(
//     `https://itl33.ru/b24/poverka/index.php?act=get_dates&city_id=${cityId}&serv_id=${serviceId}`,
//     null,
//     (err, data) => {
//       if (err) {
//         console.log(err);
//         rjct(err);
//       } else {
//         rslv(data);
//       }
//     }
//   );
// });
// };

export const getSettingsContentful = () => {
  return cful
    .getEntries({ content_type: 'settings', include: 4 })
    .then(d => d.items[0].fields);
};

export const cful = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN
});
