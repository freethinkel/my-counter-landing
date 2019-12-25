import React from 'react';
// import classes from './Contacts.module.scss';
import Map from '../components/Map';
import { cx, css } from 'linaria';
import { COLORS, SIZES } from '../assets/styles';
import { useSelector } from 'react-redux';
import { phonePipe, defaultCity } from '../utils';

export default function Contacts() {
  const city = useSelector(state => state.settings.company_city);
  const phone = useSelector(state => state.settings.phone_number);
  const address = useSelector(state => state.settings.company_street);
  const schedule = useSelector(state => state.settings.schedule);
  const isMobileWidth = window.innerWidth <= 700;
  const currentCityData = useSelector(state => state.cities.currentCityData);
  const currentCity = useSelector(state => state.cities.currentCity);
  let coord = [55, 49];
  if (
    (currentCity + '').toLowerCase().trim() !== defaultCity.toLowerCase().trim()
  ) {
    if (currentCityData.lat && currentCityData.lon) {
      coord = [currentCityData.lat - 0.002, currentCityData.lon - 0.001];
    }
  }
  let place = [...coord];
  coord[0] = coord[0] + (isMobileWidth ? 0.001 : 0);
  return (
    <section scroll-data="contacts" className={classes.contacts}>
      <div className="container">
        <div className={classes.card}>
          <h2 className={cx('section_title', classes.title)}>Контакты</h2>
          <div className={classes.city}>{city}</div>
          <div className={classes.street}>{address}</div>
          <div className={classes.schedule}>График работы:</div>
          <div className={classes.schedule_value}>{schedule}</div>
          <a className={classes.phone} href={'tel:' + phone}>
            {phonePipe(phone)}
          </a>
        </div>
      </div>
      <div className={classes.map}>
        <Map
          coord={coord}
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
