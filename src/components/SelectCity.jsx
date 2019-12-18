import React from 'react';
import { useSelector } from 'react-redux';
// import classes from './SelectCity.module.scss';
import CustomSelector from './CustomSelector';
import Skeleton from './Skeleton';
import { css } from 'linaria';
import { setCurrentCity } from '../store/slices/cities';
import { useDispatch } from 'react-redux';

export default function SelectCity() {
  const selectedCity = useSelector(state => state.cities.currentCity);
  const cities = useSelector(state => state.cities.cities);
  const dispatch = useDispatch();
  const selectCity = i => {
    dispatch(setCurrentCity(cities[i].city));
  };
  return (
    <div className={classes.wrapper}>
      {!(cities && cities.length) && <Skeleton height={24} />}
      {!!(cities && cities.length) && (
        <CustomSelector
          label="Ваш город"
          defaultValue={selectedCity}
          onSelect={i => selectCity(i)}
          options={cities.map(c => ({ title: c.city, value: c.id }))}
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
  `
};
