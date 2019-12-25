import React from 'react';
import { css } from 'linaria';
import { COLORS } from '../assets/styles';

const AnimatedLogo = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.numbers_wrapper}>
        <div className={classes.numbers}>
          {new Array(10).fill(0).map((e, i) => (
            <span key={i}>{i}</span>
          ))}
          {new Array(10).fill(0).map((e, i) => (
            <span key={i}>{i}</span>
          ))}
        </div>
      </div>
      <img src={require('../assets/images/logo_number.svg')} alt="" />
    </div>
  );
};

export default AnimatedLogo;

const classes = {
  wrapper: css`
    position: relative;
  `,
  numbers_wrapper: css`
    position: absolute;
    top: 0;
    left: 25px;
    overflow: hidden;
    height: 66px;
    padding: 0 3px;
    &::before,
    &::after {
      content: '';
      height: 20px;
      position: absolute;
      left: 0;
      width: 100%;
      z-index: 1;
    }
    &::before {
      top: 0;
      background-image: linear-gradient(
        0,
        rgba(252, 252, 252, 0),
        rgba(252, 252, 252, 1)
      );
    }
    &::after {
      bottom: 0;
      background-image: linear-gradient(
        0,
        rgba(252, 252, 252, 1),
        rgba(252, 252, 252, 0)
      );
    }
  `,
  numbers: css`
    transform: translateY(-225px);
    animation: numbers 1.3s 5 linear;
    & span {
      color: ${COLORS.primary};
      font-weight: bold;
      display: block;
      text-shadow: 0px 0px 2px ${COLORS.primary};
      font-size: 26px;
      line-height: 26px;
    }
    @keyframes numbers {
      from {
        transform: translateY(0);
      }
      to {
        transform: translateY(-50%);
      }
    }
  `
};
