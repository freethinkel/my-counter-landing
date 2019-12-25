import React from 'react';
import { css } from 'linaria';

const AnimatedLogo = () => {
  return (
    <div className={classes.wrapper}>
      <img src={require('../assets/images/logo_number.svg')} alt="" />
    </div>
  );
};

export default AnimatedLogo;

const classes = {
  wrapper: css`
    position: relative;
  `
};
