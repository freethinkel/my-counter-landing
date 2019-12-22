import React, { useState } from 'react';
import Select from './Select';
import { cx, css } from 'linaria';
import { SIZES } from '../assets/styles';

export default function CustomSelector({
  options = [],
  className,
  value,
  placeholder,
  label,
  onSelect
}) {
  const [currentValue, setValue] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const setCurrentValue = i => {
    setValue([i]);
    onSelect && onSelect(i);
  };
  return (
    <div className={cx(classes.wrapper, className)}>
      <div
        className={classes.select}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <Select
          placeholder={label}
          className={classes.select_el}
          appearance="small"
          state={isOpen}
          options={options}
          importantPlaceholder
          onChange={() => setIsOpen(!isOpen)}
          onSelect={i => {
            setCurrentValue(i);
          }}
        />
        <div className={cx(classes.value, isOpen && classes.value_open)}>
          {currentValue.title || value || placeholder}
        </div>
      </div>
    </div>
  );
}

const classes = {
  wrapper: css`
    width: 100%;
  `,
  select: css`
    display: flex;
    cursor: pointer;
    flex-direction: column;
    justify-content: flex-start;
    & ul {
      margin-top: 35px;
    }
  `,
  value: css`
    font-weight: bold;
    font-size: 20px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    @media screen and (max-width: ${SIZES.md}px) {
      padding-bottom: 6px;
    }
  `,
  value_open: css`
    @media screen and (max-width: ${SIZES.md}px) {
      border-bottom: 2px solid #000;
    }
  `,
  placeholder: css`
    color: #000;
    font-size: 14px;
    flex-grow: 1;
    padding-left: 8px;
  `,
  select_el: css`
    & span {
      color: #000 !important;
    }
  `
};
