import React from 'react';
// import classes from './SelectCity.module.scss';
import CustomSelector from './CustomSelector';
import Skeleton from './Skeleton';
import { css } from 'linaria';

export default function SelectCity() {
  // const { selectedCity, cities } = state;
  const selectCity = i => {
    // state.actions.setSelectedCity(cities[i].city);
  };
  return (
    <div className={classes.wrapper}>
      {/* {!state.cities && <Skeleton />} */}
      {false && (
        <CustomSelector
          label="Ваш город"
          // defaultValue={selectedCity}
          onSelect={i => selectCity(i)}
          // options={cities.map(c => ({ title: c.city, value: c.id }))}
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
