import React, { useState, useEffect } from 'react';
// import classes from './Select.module.scss';
import ClickOutside from './ClickOutside';
import { cx, css } from 'linaria';
// import { css } from '../../utils';

export default function Select({
  options = [],
  placeholder = 'Выберите',
  label,
  value,
  onSelect,
  appearance,
  className,
  state,
  onChange,
  customList
}) {
  const [isOpen, setIsOpen] = useState(!!state);
  const [changed, setChanged] = useState(false);
  let autoSet = false;
  useEffect(() => {
    setIsOpen(state);
  }, [state]);
  function setCurrentIndex(i) {
    onSelect && onSelect(i);
    setChanged(true);
    setIsOpen(false);
  }
  return (
    <div className={cx(classes.wrapper, className)}>
      {!!label && <span className={classes.label}>{label}</span>}
      <button
        type="button"
        className={cx(
          classes.select,
          classes[appearance],
          isOpen && classes.select_open
        )}
        onClick={() => {
          setIsOpen(!isOpen);
          onChange && onChange();
        }}
      >
        <span className={cx(classes.value, !value && classes.placeholder)}>
          {value || placeholder}
        </span>
        <img src={require('../assets/images/arrow-down.svg')} alt="" />
      </button>
      {isOpen && (
        <ClickOutside
          onClickOutside={() => {
            setIsOpen(false);
            onChange && onChange();
          }}
        >
          {customList || (
            <div>
              <List
                appearance={appearance}
                setValue={i => setCurrentIndex(i)}
                options={options}
              />
            </div>
          )}
        </ClickOutside>
      )}
    </div>
  );
}

function List({ options, setValue, appearance }) {
  return (
    <ul className={cx(classes.list, classes[appearance] + '_list')}>
      {options.map((v, i) => (
        <li key={v + i}>
          <button onClick={() => setValue(i)}>{v}</button>
        </li>
      ))}
    </ul>
  );
}

const classes = {
  wrapper: css`
    position: relative;
    width: 100%;
    & img {
      transition: 0.3s;
    }
  `,
  select: css`
    border: none;
    outline: none;
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #000;
    background-color: transparent;
    font-size: 24px;
    height: 48px;
    cursor: pointer;
    width: inherit;

    & span {
      padding-right: 12px;
      color: #000;
    }
  `,
  placeholder: css`
    span& {
      color: rgba(0, 0, 0, 0.54);
    }
  `,
  value: css`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  `,
  label: css`
    font-size: 20px;
    color: #4b4b4b;
    display: block;
    margin-bottom: 8px;
  `,
  select_open: css`
    & img {
      transform: rotate(180deg);
    }
  `,
  small_list: css`
    margin-top: 8px;
  `,
  small: css`
    border-bottom: none !important;
    flex-direction: row-reverse;
    justify-content: flex-end;
    height: 32px;
    & span {
      padding: 0;
      font-size: 14px;
      padding-left: 8px;
    }
    & img {
      width: 10px;
    }
  `,
  list: css`
    position: absolute;
    top: 100%;
    padding: 0;
    margin: 0;
    background-color: #fff;
    padding: 12px 0;
    max-height: 50vh;
    overflow: auto;
    left: 0;
    margin-top: 0;
    min-width: 100%;
    border-radius: 5px;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    box-shadow: 0px 4px 10px rgba(70, 16, 16, 0.2);
    z-index: 10;
    & li {
      list-style: none;
      padding: 0;
      margin: 0;
      white-space: nowrap;
      & button {
        border: none;
        background-color: transparent;
        padding: 0;
        margin: 0;
        width: 100%;
        padding: 0 12px;
        height: 65px;
        display: flex;
        align-items: center;
        outline: none;
        cursor: pointer;
        font-size: 24px;
        color: #000;
        &:hover {
          background-color: #eee5e5;
        }
      }
    }
  `
};
