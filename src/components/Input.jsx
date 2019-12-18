import React, { useState } from 'react';
// import classes from './Input.module.scss';
import InputMask from 'react-input-mask';
import { css } from 'linaria';

export default function Input({ placeholder, type, inputProps, onChange }) {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const setInputValue = v => {
    setValue(v);
    onChange && onChange(v);
  };
  return (
    <label>
      <InputMask
        {...inputProps}
        value={value}
        onChange={e => setInputValue(e.target.value)}
        placeholder={placeholder}
        type={type || 'text'}
        className={classes.input}
      />
      <span className={classes.error}>{errorMessage}</span>
    </label>
  );
}

const classes = {
  input: css`
    border: none;
    border-bottom: 2px solid #000;
    font-size: 24px;
    width: 100%;
    height: 48px;
    outline: none;
    &::placeholder {
      color: rgba(#000, 0.54);
    }
  `,
  error: css`
    color: #e32b04;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 13px;
    margin-top: 3px;
  `
};
