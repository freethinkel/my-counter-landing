import React, { useState } from 'react';
import { css, cx } from 'linaria';

const MultiSelect = ({ options, label, value, onSelect }) => {
  console.log(options);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={classes.wrapper} onClick={() => setIsOpen(!isOpen)}>
      <div className={classes.placeholder}>
        <img
          className={cx(classes.arrow, isOpen && classes.arrow_open)}
          src={require('../assets/images/arrow-down.svg')}
          alt=""
        />
        <span>{label}</span>
      </div>
      <div className={classes.value}>{value}</div>
      <div className={cx(classes.options, isOpen && classes.list_open)}>
        <ItemRenderer isRoot items={options} onSelect={onSelect} />
      </div>
    </div>
  );
};

export default MultiSelect;

const classes = {
  list_open: css`
    & > .items {
      opacity: 1;
      visibility: visible;
      top: 0 !important;
    }
  `,
  options: css`
    position: absolute;
    top: 100%;
    margin-top: 12px;
    & > .items {
      top: 10px;
    }
  `,
  arrow: css`
    transition: 0.4s;
  `,
  arrow_open: css`
    transform: rotate(-180deg);
  `,
  value: css`
    font-weight: 700;
    font-size: 20px;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  placeholder: css`
    display: flex;
    & span {
      padding-left: 8px;
      font-size: 14px;
    }
  `,
  wrapper: css`
    position: relative;
    cursor: pointer;
  `,
  items_wrapper: css`
    position: absolute;
    background-color: #fff;
    left: 100%;
    margin-left: 8px;
    opacity: 0;
    visibility: hidden;
    transition: 0.4s;
    top: 10px;
    border-radius: 5px;
    box-shadow: 0px 4px 10px rgba(70, 16, 16, 0.2);
    z-index: 10;
  `,
  last_items: css`
    max-height: 70vh;
    overflow-y: auto;
  `,
  root_items: css`
    left: 0;
    top: 100%;
    margin-left: 0px;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  `,
  item: css`
    border: none;
    position: relative;
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
    white-space: nowrap;
    &:hover {
      background-color: #eee5e5;
      & .items {
        opacity: 1;
        visibility: visible;
        top: 0;
      }
    }
  `
};

const ItemRenderer = ({ items, isRoot, isLast, onSelect }) => {
  return (
    <div
      onClick={e => e.stopPropagation()}
      className={cx(
        classes.items_wrapper,
        isRoot && classes.root_items,
        isLast && classes.last_items,
        'items'
      )}
    >
      {(items || []).map(e => (
        <button
          className={classes.item}
          onClick={() => e.isTarget && onSelect(e)}
        >
          {e.title}
          <ItemRenderer
            isLast={!items.children}
            items={e.children}
            onSelect={onSelect}
          />
        </button>
      ))}
    </div>
  );
};
