import React, { useState } from 'react';
// import classes from './Faq.module.scss';
import { cx, css } from 'linaria';

export default function Faq() {
  const [selectedIndex, setIndex] = useState(0);
  return (
    <section className={classes.faq} scroll-data="faq">
      <div className="container">
        <div className={classes.row}>
          <div className={classes.list_wrapper}>
            <button className={classes.arrow_btn}>
              <img alt="" src={require('../assets/images/arrow-large.svg')} />{' '}
            </button>
            <ul className={classes.list}>
              <li>Как уменьшить расходы электронергии</li>
              <li>Как уменьшить расходы электронергии</li>
              <li>Как уменьшить расходы электронергии</li>
              <li>Как уменьшить расходы электронергии</li>
              <li>Как уменьшить расходы электронергии</li>
              <li>Как уменьшить расходы электронергии</li>
            </ul>
            <button className={cx(classes.arrow_btn, classes.arrow_btn_down)}>
              <img alt="" src={require('../assets/images/arrow-large.svg')} />{' '}
            </button>
          </div>
          <div className={classes.content}></div>
        </div>
      </div>
    </section>
  );
}

const classes = {
  content: css`
    background: #ffffff;
    box-shadow: 0px 4px 10px rgba(70, 16, 16, 0.2);
    border-radius: 10px;
    padding: 48px;
    flex-grow: 1;
  `,
  faq: css`
    padding: 55px 0;
  `,
  list: css`
    background: #fff4f4;
    box-shadow: 0px 4px 10px rgba(70, 16, 16, 0.2);
    border-radius: 10px;
    padding: 0;
    margin: 0;
    & li {
      list-style: none;
      padding: 24px 12px;
      padding-right: 42px;
      width: calc(100% + 30px);
      font-size: 24px;
      color: #000;
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: 0.3s;
      position: relative;
      z-index: 1;
      &:hover {
        background: #fff;
      }
    }
  `,
  list_wrapper: css`
    width: 45%;
    padding-right: 30px;
  `,
  row: css`
    display: flex;
  `,
  arrow_btn: css`
    border: 0;
    margin: 0;
    margin-bottom: 20px;
    width: 100%;
    padding: 12px 0;
    display: flex;
    background-color: transparent;
    cursor: pointer;
    outline: none;
  `,
  arrow_btn_down: css`
    margin-top: 20px;
    & img {
      transform: rotate(180deg);
    }
  `
};
