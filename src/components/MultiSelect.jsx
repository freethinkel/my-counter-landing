import React, { useState, useEffect } from 'react';
import { css, cx } from 'linaria';
import ClickOutside from './ClickOutside';
import { SIZES } from '../assets/styles';

const MultiSelect = ({ options, label, value, onSelect, opened }) => {
  useEffect(() => {
    setIsOpen(!!opened);
  }, [opened]);
  const [isOpen, setIsOpen] = useState(false);
  return (
    // <ClickOutside onClickOutside={() => isOpen && setIsOpen(false)}>
    <div className={classes.wrapper}>
      <div onClick={() => setIsOpen(!isOpen)}>
        <div className={classes.placeholder}>
          <img
            className={cx(classes.arrow, isOpen && classes.arrow_open)}
            src={require('../assets/images/arrow-down.svg')}
            alt=""
          />
          <span>{label}</span>
        </div>
        <div className={classes.value}>{value}</div>
      </div>
      <div className={cx(classes.options, isOpen && classes.list_open)}>
        <ItemRenderer
          isRoot
          items={options}
          onSelect={(...props) => {
            onSelect(...props);
            setIsOpen(false);
          }}
        />
      </div>
    </div>
    // </ClickOutside>
  );
};

export default MultiSelect;

const md = SIZES.md;

const classes = {
  list_open: css`
    z-index: 100;
    visibility: visible !important;
    display: block !important;
    & > .items {
      opacity: 1;
      visibility: visible !important;
      top: 0 !important;
    }
  `,
  options: css`
    @media screen and (max-width: ${md}px) {
      width: 100%;
    }
    position: absolute;
    top: 100%;
    margin-top: 12px;
    visibility: hidden;
    z-index: -100;
    display: none;
    & .items {
      visibility: hidden;
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
    @media screen and (max-width: ${md}px) {
      width: 100%;
      left: 0;
      margin-left: 0;
      margin-top: 62px;
    }
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
    max-height: 50vh;
    overflow-y: auto;
  `,
  root_items: css`
    left: 0;
    top: 100%;
    margin-left: 0px;
    margin-top: 0;
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
      ${'' /* & .items {
        opacity: 1;
        visibility: visible;
        top: 0;
      } */}
    }
  `,
  open_state: css`
    & .items {
      opacity: 1;
      visibility: visible;
      top: 0;
    }
  `
};

const ItemRenderer = ({ items, isRoot, isLast, onSelect }) => {
  const [openedIndex, setOpenedIndex] = useState();
  return (
    <div
      className={cx(
        classes.items_wrapper,
        isRoot && classes.root_items,
        isLast && classes.last_items,
        false && classes.open_state,
        'items'
      )}
    >
      <div
      // onClick={e => {
      //   e.stopPropagation();
      // }}
      >
        {(items || []).map((e, i) => (
          <div
            key={i}
            onMouseEnter={() => {
              setOpenedIndex(i);
            }}
            onTouchEnd={() => {
              setOpenedIndex(i);
            }}
            onMouseLeave={() => {
              setOpenedIndex(-1);
            }}
          >
            <DropDownItem
              className={i === openedIndex && classes.open_state}
              items={items}
              onClick={() => {
                setOpenedIndex(i);
              }}
              onSelect={onSelect}
              elem={e}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const DropDownItem = ({ onSelect, elem, items, className }) => {
  return (
    <div
      className={cx(classes.item, className)}
      onClick={() => {
        elem.isTarget && onSelect && onSelect(elem);
      }}
    >
      {elem.title}
      <ItemRenderer
        isLast={!items.children}
        items={elem.children}
        onSelect={onSelect}
      />
    </div>
  );
};
