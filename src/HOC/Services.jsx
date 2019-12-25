import React, { useState, useEffect } from 'react';
import { css, cx } from 'linaria';
import ServiceCard from '../components/ServiceCard';
import ServiceCardDetails from '../components/ServiceCardDetails';
import SliderControls from '../components/SliderControls';
import { useSelector, useDispatch } from 'react-redux';
import { selectService } from '../store/slices/ordering';
import { scrollToSection } from '../utils';
import { SIZES } from '../assets/styles';
import {
  getServiceDateAction,
  setServicesPrice
} from '../store/slices/settings';

function Services() {
  const services = useSelector(state => state.settings.services) || [];
  const currentCity = useSelector(state => state.cities.currentCity) || '';
  const cities = useSelector(state => state.cities.cities) || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    if (services && services.length && currentCity && cities && cities.length) {
      const findedCity = cities.find(
        c => c.city.trim().toLowerCase() === currentCity.trim().toLowerCase()
      );
      getServiceDateAction(dispatch)(null, findedCity.id);
      dispatch(setServicesPrice(findedCity.price_pov));
      dispatch(selectService(services[0]));
    }
  }, [services, currentCity, cities]);
  const currentService = services[currentIndex] || {};
  const setService = () => {
    scrollToSection('ordering');
    dispatch(selectService(services[currentIndex]));
  };
  return (
    <section scroll-data="services" className={classes.section}>
      <div className="container">
        <div className="row">
          <div className={classes.services}>
            {currentIndex > 0 && (
              <div
                className={cx(
                  classes.items_wrapper,
                  classes.items_wrapper_left
                )}
              >
                {services
                  .filter((_, i) => i < currentIndex)
                  .map((service, i) => (
                    <div
                      key={i + service.name}
                      className={classes.service_item}
                    >
                      <ServiceCard
                        onClick={() => setCurrentIndex(i)}
                        title={service.name}
                        photo={service.photo.file.url}
                      />
                    </div>
                  ))}
              </div>
            )}
            <div className={classes.service_item_active}>
              <div className={classes.active_item_header}>
                <h2 className={cx('section_title', classes.title)}>
                  Мой счетчик:
                </h2>
                <SliderControls
                  activeIndex={currentIndex}
                  onChange={setCurrentIndex}
                  length={services.length}
                />
              </div>
              <ServiceCardDetails
                title={currentService.name}
                photo={currentService.photo?.file?.url}
                price={currentService.price}
                date={currentService.date}
                description={currentService.description}
                onEnroll={() => setService()}
              />
            </div>
            <div
              className={cx(classes.items_wrapper, classes.items_wrapper_right)}
            >
              {services
                .filter((_, i) => i > currentIndex)
                .map((service, i) => (
                  <div key={i + service.name} className={classes.service_item}>
                    <ServiceCard
                      onClick={() => setCurrentIndex(i + currentIndex + 1)}
                      title={service.name}
                      photo={service.photo.file.url}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;

const classes = {
  active_item_header: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    @media screen and (max-width: ${SIZES.md}px) {
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 20px;
    }
  `,
  title: css`
    @media screen and (max-width: ${SIZES.md}px) {
      margin-bottom: 24px;
    }
  `,
  p: css`
    font-size: 20px;
  `,
  header: css`
    width: 50%;
  `,
  section: css`
    padding: 48px 0 64px;
    @media screen and (max-width: ${SIZES.md}px) {
      padding: 32px 0 64px;
    }
    overflow: hidden;
    position: relative;
    &::before,
    &::after {
      content: '';
      display: block;
      top: 0;
      bottom: 0;
      width: 160px;
      position: absolute;
    }
    &::before {
      left: 0;
      background-image: linear-gradient(
        90deg,
        #f9f9f9 0%,
        rgba(249, 249, 249, 0) 100%
      );
    }
    &::after {
      right: 0;
      background-image: linear-gradient(
        -90deg,
        #f9f9f9 0%,
        rgba(249, 249, 249, 0) 100%
      );
    }
  `,
  items_wrapper_right: css`
    justify-content: flex-start;
  `,
  items_wrapper_left: css`
    justify-content: flex-end;
  `,
  items_wrapper: css`
    width: 0;
    display: flex;
    padding-top: 81px;
    @media screen and (max-width: ${SIZES.md}px) {
      padding-top: 111px;
    }
  `,
  services: css`
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
    margin-top: 2px;
  `,
  service_item: css`
    width: 300px;
    min-width: 300px;
    padding: 0 15px;
  `,
  service_item_active: css`
    max-width: 655px;
    width: 100%;
    padding: 0 15px;
    z-index: 10;
  `
};
