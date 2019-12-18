import React, { useState } from 'react';
import Select from './Select';
import { cx, css } from 'linaria';

export default function CustomSelector({
  options = [],
  className,
  defaultValue,
  placeholder,
  label,
  onSelect
}) {
  const [currentValue, setValue] = useState({});
  const setCurrentValue = i => {
    setValue([i]);
    onSelect && onSelect(i);
  };
  return (
    <div className={cx(classes.wrapper, className)}>
      <div className={classes.select}>
        <Select
          placeholder={label}
          className={classes.select_el}
          appearance="small"
          options={options}
          importantPlaceholder
          onSelect={i => setCurrentValue(i)}
        />
        <div className={classes.value}>
          {currentValue.title || defaultValue || placeholder}
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
    flex-direction: column;
    justify-content: flex-start;
  `,
  value: css`
    font-weight: bold;
    font-size: 20px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
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
