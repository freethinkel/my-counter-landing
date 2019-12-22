import React, { useState, useEffect } from 'react';
import { css, cx } from 'linaria';
import { COLORS, SIZES } from '../assets/styles';

const SliderControls = ({ activeIndex = 0, length = 0, onChange }) => {
  const [_activeIndex, setActiveIndex] = useState(activeIndex);
  useEffect(() => {
    setActiveIndex(activeIndex);
  }, [activeIndex]);
  const changeIndex = i => {
    setActiveIndex(i);
    onChange && onChange(i);
  };
  return (
    <div className={classes.wrapper}>
      <button
        onClick={() => _activeIndex !== 0 && changeIndex(_activeIndex - 1)}
        className={cx(classes.btn, classes.left_btn)}
        disabled={_activeIndex === 0}
      >
        <img src={require('../assets/images/arrow-primary.svg')} alt="" />
      </button>
      <div className={classes.dot_wrapper}>
        {new Array(length).fill(0).map((_, i) => (
          <button
            key={i}
            className={cx(
              classes.dot,
              _activeIndex === i && classes.dot_active
            )}
          ></button>
        ))}
      </div>
      <button
        onClick={() =>
          _activeIndex !== length - 1 && changeIndex(_activeIndex + 1)
        }
        className={classes.btn}
        disabled={_activeIndex === length - 1}
      >
        <img src={require('../assets/images/arrow-primary.svg')} alt="" />
      </button>
    </div>
  );
};

export default SliderControls;

const classes = {
  wrapper: css`
    display: flex;
    align-items: center;
  `,
  dot: css`
    opacity: 0.6;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 34px;
    width: 20px;
    padding: 0;
    margin: 0;
    border: none;
    outline: none;
    background-color: transparent;
    &::before {
      content: '';
      display: block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #f9d5d5;
      transition: 0.3s;
      @media screen and (max-width: ${SIZES.md}px) {
        width: 9px;
        height: 9px;
      }
    }
  `,
  dot_active: css`
    &::before {
      background-color: ${COLORS.primary};
    }
  `,
  btn: css`
    border: none;
    background-color: transparent;
    cursor: pointer;
    height: 34px;
    padding: 0;
    margin: 0;
    outline: none;
    transition: 0.3s;
    & img {
      height: 100%;
    }
    @media screen and (max-width: ${SIZES.md}px) {
      height: 27px;
    }
    &[disabled] {
      opacity: 0.4;
      cursor: default;
    }
  `,
  left_btn: css`
    transform: rotate(180deg);
  `,
  dot_wrapper: css`
    padding: 0 16px;
    display: flex;
    @media screen and (max-width: ${SIZES.md}px) {
      padding: 0 8px;
    }
  `
};
