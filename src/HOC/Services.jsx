import React from 'react';
import { css, cx } from 'linaria';
import ServiceCard from '../components/ServiceCard';
import ServiceCardDetails from '../components/ServiceCardDetails';
import SliderControls from '../components/SliderControls';
import { useSelector } from 'react-redux';

function Services() {
  const services = useSelector(state => state.settings.services);
  return (
    <section scroll-data="services" className={classes.section}>
      <div className="container">
        <div className="row">
          <div className={classes.header}>
            <h2 className={cx('section_title', classes.title)}>Услуги</h2>
          </div>
          <SliderControls />
          <div className={classes.services}>
            <div className={classes.service_item}>
              <ServiceCardDetails />
            </div>
            <div className={classes.service_item}>
              <ServiceCard />
            </div>
            <div className={classes.service_item}>
              <ServiceCard />
            </div>
            <div className={classes.service_item}>
              <ServiceCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;

const classes = {
  title: css`
    margin-bottom: 16px;
  `,
  p: css`
    font-size: 20px;
  `,
  header: css`
    width: 50%;
  `,
  section: css`
    padding: 0 0 64px;
  `,
  services: css`
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
    margin-top: 2px;
  `,
  service_item: css`
    width: 25%;
    padding: 0 15px;
    margin-top: 30px;
  `
};
