import React from 'react';
import Button from '../components/Button';
import { scrollToSection } from '../utils';
import { css } from 'linaria';

function MainBanner() {
  const scrollToOrder = () => {
    scrollToSection('ordering');
  };
  return (
    <div className={classes.banner}>
      <div className="container">
        <div className={classes.row}>
          <div className={classes.col}>
            <h1 className={classes.title}>Поверка и замена любых счетчиков:</h1>
            <ul className={classes.list}>
              <li>- воды</li>
              <li>- электричества</li>
              <li>- газа</li>
              <li>- тепла</li>
            </ul>
            <Button
              onClick={() => scrollToOrder()}
              className={classes.button}
              color="primary"
            >
              Оставить заявку
            </Button>
          </div>
        </div>
      </div>
      <img
        className={classes.image}
        src={require('../assets/images/banner.png')}
        alt="Баннер"
      />
    </div>
  );
}

export default MainBanner;

const classes = {
  title: css`
    font-size: 42px;
    margin-bottom: 16px;
  `,
  description: css`
    font-size: 24px;
  `,
  button: css`
    margin-top: 48px;
  `,
  row: css`
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 1;
  `,
  col: css`
    width: 50%;
  `,
  banner: css`
    position: relative;
    background-color: #fff;
    padding: 82px 0;
    padding-top: 159px;
  `,
  image: css`
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    object-fit: contain;
    object-position: 100% 80%;
    z-index: 0;
  `,
  list: css`
    margin: 0;
    padding: 0;
    & li {
      padding: 0;
      margin: 0;
      list-style: none;
      font-size: 24px;
    }
  `
};
