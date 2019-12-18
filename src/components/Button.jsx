import React from 'react';
import { css, cx } from 'linaria';
import { COLORS } from '../assets/styles';

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
    &[disabled] {
      opacity: 0.6;
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
