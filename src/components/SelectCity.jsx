import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Skeleton from './Skeleton';
import { css } from 'linaria';
import { setCurrentCityAction } from '../store/slices/cities';
import { useDispatch } from 'react-redux';
import { SIZES } from '../assets/styles';
import MultiSelect from './MultiSelect';
import SureCity from './ SureCity';

export default function SelectCity() {
  const selectedCity = useSelector(state => state.cities.currentCity);
  const [isOpenSelector, setIsOpenSelector] = useState(false);
  const [openedSureCity, setSureCityOpened] = useState(true);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const _cities = useSelector(state => state.cities.cities);
  const _regions = useSelector(state => state.cities.regions);
  const dispatch = useDispatch();
  useEffect(() => {
    if (_cities && _cities.length && _regions && _regions.length) {
      setLoading(false);
      setRegions(
        _regions.map(r => ({
          title: r.region,
          value: r.id,
          isTarget: false,
          children: (_cities || [])
            .filter(c => c.r_id === r.id)
            .map(c => ({ title: c.city, value: c.id, isTarget: true }))
        }))
      );
    }
  }, [_cities, _regions]);
  const selectCity = e => {
    // dispatch(setCurrentCity(e.title));
    setCurrentCityAction(dispatch)(e.title);
  };
  const showSureCity =
    !isOpenSelector &&
    openedSureCity &&
    !window?.localStorage?.getItem('sureCityState');
  return (
    <div className={classes.wrapper}>
      {loading && <Skeleton height={24} />}
      {!loading && (
        <MultiSelect
          label="Ваш город"
          value={selectedCity}
          opened={isOpenSelector}
          onSelect={e => {
            selectCity(e);
            if (window.localStorage) {
              window.localStorage.setItem('sureCityState', true);
            }
          }}
          options={regions}
        />
      )}
      {showSureCity && (
        <SureCity
          onYes={() => {
            setIsOpenSelector(false);
            if (window.localStorage) {
              window.localStorage.setItem('sureCityState', true);
            }
            setSureCityOpened(false);
          }}
          onNo={() => {
            setIsOpenSelector(true);
            setSureCityOpened(false);
          }}
          city={selectedCity}
        />
      )}
    </div>
  );
}

const classes = {
  wrapper: css`
    position: relative;
    min-width: 170px;
    max-width: 190px;
    @media screen and (max-width: ${SIZES.md}px) {
      min-width: 100%;
      max-width: 100%;
      padding-bottom: 6px;
    }
  `
};
