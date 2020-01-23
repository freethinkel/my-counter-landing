import React from 'react';
import { css, cx } from 'linaria';
import { COLORS, SIZES } from '../assets/styles';

const AnimatedLogo = ({ isMobile }) => {
  const reAnimate = () => {
    const numbers = document.querySelectorAll('header a .numbers');
    numbers.forEach(num => {
      num.style.display = 'none';
    });
    setTimeout(() => {
      numbers.forEach(num => {
        num.style.display = 'block';
      });
    }, 100);
  };
  return (
    <div
      className={cx(classes.wrapper, isMobile && classes.mobile_wrapper)}
      onClick={reAnimate}
    >
      <div className={cx(classes.numbers_wrapper, 'numbers_wrapper')}>
        <div className={cx(classes.numbers, 'numbers')}>
          {new Array(10)
            .fill(0)
            .map((e, i) => i)
            .reverse()
            .map(e => (
              <span key={e}>{e}</span>
            ))}
          {new Array(10)
            .fill(0)
            .map((e, i) => i)
            .reverse()
            .map(e => (
              <span key={e}>{e}</span>
            ))}
          {new Array(10)
            .fill(0)
            .map((e, i) => i)
            .reverse()
            .map(e => (
              <span key={e}>{e}</span>
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
    left: 24px;
    overflow: hidden;
    height: 66px;
    padding: 0 3px;
    width: 20px;
    @media screen and (max-width: ${SIZES.md}px) {
      width: 15px;
    }
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
    transform: translateY(-194px);
    ${'' /* position: absolute;
    top: 0;
    left: 2px;
    @media screen and (max-width: ${SIZES.md}px) {
      left: 3px;
    } */}
    animation: numbers 1.3s 5 linear;
    & span {
      color: ${COLORS.primary};
      font-weight: bold;
      display: block;
      text-shadow: 0px 0px 2px ${COLORS.primary};
      font-size: 26px;
      line-height: 26px;
      height: 24px;
    }
    @keyframes numbers {
      from {
        transform: translateY(-435px);
      }
      to {
        transform: translateY(-194px);
      }
    }
  `,
  mobile_wrapper: css`
    height: 43px;
    & .numbers {
      transform: translateY(-112px);
      animation: numbers-mobile 1.3s 5 linear;
    }
    & .numbers_wrapper {
      left: 15px;
      height: 42px;
    }
    & span {
      font-size: 15px;
      line-height: 15px;
      height: 14px;
    }

    @keyframes numbers-mobile {
      from {
        transform: translateY(-252px);
      }
      to {
        transform: translateY(-112px);
      }
    }
  `
};
