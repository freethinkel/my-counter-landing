import React from 'react';
import { css, cx } from 'linaria';
import { COLORS } from '../assets/styles';

const Button = ({ children, color, className, ...props }) => {
  console.log(classes);
  return (
    <button
      {...props}
      className={cx(classes.btn, color && classes[color], className)}
    >
      {children}
    </button>
  );
};

export default Button;

const classes = {
  btn: css`
    border: none;
    background-color: transparent;
    padding: 0;
    border-radius: 5px;
    height: 57px;
    padding: 0 24px;
    outline: none;
    font-size: 24px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eee;
    cursor: pointer;
    transition: 0.3s;
    &:not([disabled]) {
      &:focus,
      &:hover {
        box-shadow: 0px 4px 3px rgba(47, 12, 12, 0.3);
      }
      &:active {
        box-shadow: 0px 6px 10px rgba(47, 12, 12, 0.3);
      }
    }
    &[disabled] {
      opacity: 0.4;
      cursor: default;
    }
  `,
  white: css`
    color: ${COLORS.primary};
    background-color: #fff;
  `,
  primary: css`
    background-color: ${COLORS.primary};
    color: #fff;
  `
};
