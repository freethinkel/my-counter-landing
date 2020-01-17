import React, { useEffect } from 'react';
// import classes from './Contacts.module.scss';
import Map from '../components/Map';
import { cx, css } from 'linaria';
import { COLORS, SIZES } from '../assets/styles';
import { useSelector } from 'react-redux';
import { phonePipe, defaultCity } from '../utils';
import { geoCodeFromCity } from '../store/api';
import { useDispatch } from 'react-redux';
import { setCurrentGeocode } from '../store/slices/cities';

export default function Contacts() {
  const city = useSelector(state => state.settings.company_city);
  const phone = useSelector(state => state.settings.phone_number);
  const address = useSelector(state => state.settings.company_street);
  const schedule = useSelector(state => state.settings.schedule);
  const isMobileWidth = window.innerWidth <= 700;
  const currentCityData = useSelector(state => state.cities.currentCityData);
  const currentCity = useSelector(state => state.cities.currentCity);
  const currentGeocode = useSelector(state => state.cities.currentGeocode);
  let coord = [56.140224, 40.382677];
  let place = [...coord];
  if (
    (currentCity + '').toLowerCase().trim() !==
      defaultCity.toLowerCase().trim() &&
    currentGeocode
  ) {
    if (currentGeocode.lat && currentGeocode.lon) {
      coord = [currentGeocode.lat - 0.002, currentGeocode.lon - 0.001];
    }
    place = null;
  }

  coord[0] = coord[0] + (isMobileWidth ? 0.001 : 0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentGeocode(null));
    geoCodeFromCity(currentCity).then(data => {
      let _geo = {
        lon: data[0],
        lat: data[1]
      };
      dispatch(setCurrentGeocode(_geo));
    });
  }, [currentCity]);
  return (
    <section scroll-data="contacts" className={classes.contacts}>
      <div className="container">
        <div className={classes.card}>
          <h2 className={cx('section_title', classes.title)}>Контакты</h2>
          {!place && <div className={classes.city}>г. {currentCity}</div>}
          {place && (
            <>
              <div className={classes.city}>{city}</div>
              <div className={classes.street}>{address}</div>
              <div className={classes.schedule}>График работы:</div>
              <div className={classes.schedule_value}>{schedule}</div>
            </>
          )}
          <a className={classes.phone} href={'tel:' + phone}>
            {phonePipe(phone)}
          </a>
        </div>
      </div>
      <div className={classes.map}>
        <Map
          state={{
            center: coord,
            zoom: 17
          }}
          // coord={coord}
          placeCoord={place}
          zoom={17}
          height={'100%'}
          icon={require('../assets/images/placemark.svg')}
        />
      </div>
    </section>
  );
}

const classes = {
  contacts: css`
    position: relative;
    padding: 100px 0;
    min-height: 663px;
    @media screen and (max-width: ${SIZES.md}px) {
      padding: 35px 0 430px;
    }
  `,
  title: css`
    @media screen and (max-width: ${SIZES.md}px) {
      font-size: 24px;
    }
  `,
  map: css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #e5e5e5;
  `,
  card: css`
    background-color: #ffffff;
    border-radius: 5px;
    position: relative;
    z-index: 1;
    max-width: 407px;
    padding: 48px 30px;
    @media screen and (max-width: ${SIZES.md}px) {
      padding: 24px 16px 48px;
    }
  `,
  city: css`
    color: ${COLORS.primary};
    font-size: 24px;
    font-weight: bold;
    margin-top: 32px;
    @media screen and (max-width: ${SIZES.md}px) {
      font-size: 20px;
    }
  `,
  street: css`
    font-size: 24px;
    margin-top: 12px;
    @media screen and (max-width: ${SIZES.md}px) {
      font-size: 20px;
      margin-top: 6px;
    }
  `,
  schedule: css`
    font-size: 18px;
    margin-top: 40px;
    @media screen and (max-width: ${SIZES.md}px) {
      font-size: 16px;
      margin-top: 32px;
    }
  `,
  schedule_value: css`
    margin-top: 4px;
    font-size: 24px;
    @media screen and (max-width: ${SIZES.md}px) {
      font-size: 20px;
    }
  `,
  phone: css`
    color: ${COLORS.primary};
    font-weight: bold;
    font-size: 24px;
    text-decoration: none;
    margin-top: 32px;
    display: block;
    @media screen and (max-width: ${SIZES.md}px) {
      margin-top: 24px;
      font-size: 20px;
    }
  `
};
