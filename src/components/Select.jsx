import React, { useState, useEffect } from 'react';
// import classes from './Select.module.scss';
import ClickOutside from './ClickOutside';
import { cx, css } from 'linaria';
// import { css } from '../../utils';

export default function Select({
  options = [],
  placeholder,
  onSelect,
  appearance,
  importantPlaceholder,
  defaultIndex = -1,
  className
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [changed, setChanged] = useState(false);
  const [currentIndex, setIndex] = useState(defaultIndex);
  let autoSet = false;
  useEffect(() => {
    if (defaultIndex !== -1 && currentIndex !== defaultIndex && !changed) {
      setIndex(defaultIndex);
    }
  });
  function setCurrentIndex(i) {
    setIndex(i);
    onSelect && onSelect(i);
    setChanged(true);
    setIsOpen(false);
  }
  return (
    <div className={cx(classes.wrapper, className, classes[appearance])}>
      <button
        className={cx(classes.select, isOpen && classes.select_open)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={cx(currentIndex === -1 && classes.placeholder)}>
          {importantPlaceholder
            ? placeholder || 'Выберите'
            : currentIndex !== -1
            ? options[currentIndex].title
            : placeholder || 'Выберите'}
        </span>
        <img src={require('../assets/images/arrow-down.svg')} alt="" />
      </button>
      {isOpen && (
        <ClickOutside onClickOutside={() => setIsOpen(false)}>
          <div>
            <List setValue={i => setCurrentIndex(i)} options={options} />
          </div>
        </ClickOutside>
      )}
      `
    </div>
  );
}

function List({ options, setValue }) {
  return (
    <ul className={classes.list}>
      {options.map((o, i) => (
        <li key={i}>
          <button onClick={() => setValue(i)}>{o.title}</button>
        </li>
      ))}
    </ul>
  );
}

const classes = {
  wrapper: css`
    position: relative;
    width: 100%;
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
      &.placeholder {
        color: rgba(#000, 0.54);
      }
    }
  `,
  select_open: css`
    & img {
      transform: rotate(180deg);
    }
  `,
  small: css`
    & .select {
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
    }
    & .list {
      margin-top: 8px;
    }
  `,
  list: css`
    position: absolute;
    top: 100%;
    padding: 0;
    margin: 0;
    background-color: #fff;
    padding: 12px 0;
    max-height: 400px;
    overflow: auto;
    left: 0;
    margin-top: 12px;
    min-width: 100%;
    border-radius: 5px;
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
        height: 32px;
        display: flex;
        align-items: center;
        outline: none;
        cursor: pointer;
        font-size: 18px;
        color: #000;
        &:hover {
          background-color: rgba(#000, 0.12);
        }
      }
    }
  `
};
