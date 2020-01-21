import axios from 'axios';
import { createClient } from 'contentful';

export const getAllCities = () => {
  return axios
    .get('https://itl33.ru/b24/poverka/get_cities.php')
    .then(res => {
      return res.data || [];
    })
    .catch(err => {
      console.log(err);
    });
};

export const getRegionsRequest = () => {
  return axios
    .get('https://itl33.ru/b24/poverka/get_regions.php')
    .then(res => res.data || []);
};

export const detectCity = () => {
  return axios
    .get('/geolocation.php')
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const geoCodeFromCity = city => {
  return axios
    .get(
      `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=e4628a39-f3e2-48af-bee1-371f77c27de9&geocode=${city}`
    )
    .then(res =>
      res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
        .split(' ')
        .map(e => +e)
    )
    .catch(err => {
      console.log(err);
    });
};

export const getServiceDates = (serviceId, cityId) => {
  return axios
    .get(
      `https://itl33.ru/b24/poverka/index.php?act=get_dates&city_id=${cityId}&serv_id=${serviceId}`
    )
    .then(res => res.data)
    .catch(err => {
      console.log(err);
    });
};

export const getServicePrices = cityId => {
  return axios
    .get(`https://itl33.ru/b24/poverka/get_prices.php?city_id=${cityId}`)
    .then(res => res.data)
    .catch(err => console.log(err));
};

export const sendLeadToBitrix = model => {
  return axios.post(
    `https://energo-m.bitrix24.ru/rest/1/5ooyrhggic6b4fx6/crm.lead.add`,
    model
  );
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
    .then(d => d.items[0].fields)
    .catch(err => {
      console.log(err);
    });
};

export const cful = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN
});
