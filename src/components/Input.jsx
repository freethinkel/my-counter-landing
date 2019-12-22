import React, { useState } from 'react';
// import classes from './Input.module.scss';
import InputMask from 'react-input-mask';
import { css, cx } from 'linaria';

export default function Input({
  placeholder,
  type,
  inputProps,
  onChange,
  isError,
  onBlur,
  label
}) {
  const [value, setValue] = useState('');
  const [isFocus, setFocus] = useState(false);
  const setInputValue = v => {
    setValue(v);
    onChange && onChange(v);
  };
  return (
    <label className={classes.wrapper}>
      {!!label && (
        <span className={cx(classes.label, isError && !isFocus && 'error')}>
          {label}
        </span>
      )}
      <InputMask
        {...inputProps}
        onFocus={() => setFocus(true)}
        onBlur={e => {
          setFocus(false);
          inputProps.onBlur && inputProps.onBlur();
        }}
        value={value}
        onChange={e => setInputValue(e.target.value)}
        placeholder={placeholder}
        type={type || 'text'}
        className={cx(classes.input, isError && 'error')}
      />
    </label>
  );
}

const classes = {
  wrapper: css`
    &:hover {
      & input {
        border-color: #3e4863;
      }
    }
  `,
  input: css`
    border: none;
    border-bottom: 2px solid #000;
    font-size: 24px;
    width: 100%;
    height: 48px;
    outline: none;
    padding: 0 8px;
    transition: 0.3s;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    appearance: none;
    -webkit-appearance: none;
    &.error {
      background-color: #eee5e5;
      border-color: #e32b04 !important;
    }
    &:focus {
      background-color: #eee5e5;
      border-color: #3e4863 !important;
    }
    &::placeholder {
      color: rgba(#000, 0.54);
    }
  `,
  label: css`
    font-size: 20px;
    color: #4b4b4b;
    display: block;
    margin-bottom: 8px;
    transition: 0.3s;
    &.error {
      color: #e32b04;
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
