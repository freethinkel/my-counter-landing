import React from 'react';
// import classes from './Contacts.module.scss';
import Map from '../components/Map';
import { cx, css } from 'linaria';
import { COLORS } from '../assets/styles';

export default function Contacts() {
  return (
    <section scroll-data="contacts" className={classes.contacts}>
      <div className="container">
        <div className={classes.card}>
          <h2 className={cx('section_title', classes.title)}>Контакты</h2>
          <div className={classes.city}>г. Владимир</div>
          <div className={classes.street}>ул. Студенческая д. 5А офис 503</div>
          <div className={classes.schedule}>График работы:</div>
          <div className={classes.schedule_value}>пн-пт с 8:00 - 17:00</div>
          <a className={classes.phone} href="tel:12">
            8 (800) 775 - 70 - 71
          </a>
        </div>
      </div>
      <div className={classes.map}>
        <Map
          coord={[55.823307, 49.123536]}
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
    padding: 48px 30px;
    position: relative;
    z-index: 1;
    max-width: 407px;
  `,
  city: css`
    color: $primary;
    font-size: 24px;
    font-weight: bold;
    margin-top: 32px;
  `,
  street: css`
    font-size: 24px;
    margin-top: 12px;
  `,
  schedule: css`
    font-size: 18px;
    margin-top: 40px;
  `,
  schedule_value: css`
    margin-top: 4px;
    font-size: 24px;
  `,
  phone: css`
    color: ${COLORS.primary};
    font-weight: bold;
    font-size: 24px;
    text-decoration: none;
    margin-top: 32px;
    display: block;
  `
};
