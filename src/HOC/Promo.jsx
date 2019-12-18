import React from 'react';
import Button from '../components/Button';
import { cx, css } from 'linaria';

export default function Promo() {
  return (
    <section className={classes.promo}>
      <div className="container">
        <div className={classes.row}>
          <div className={classes.col}>
            <h4 className={classes.title}>Вызвать мастера на дом легко!</h4>
            <p className={classes.description}>
              Позвоните нам или оставьте заявку на сайте
            </p>
          </div>
          <div className={cx(classes.col, classes.actions)}>
            <Button className={classes.button} color="primary">
              Оставить заявку
            </Button>
            <a href="tel: 1313" className={classes.phone}>
              <img src={require('../assets/images/phone.svg')} alt="Телефон" />8
              (800) 775 - 70 - 71
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const classes = {
  promo: css`
    background-color: #fff;
    padding: 48px 0;
  `,
  title: css`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 8px;
    width: 100%;
  `,
  description: css`
    font-size: 24px;
    width: 100%;
  `,
  row: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  col: css`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  `,
  phone: css`
    display: flex;
    align-items: center;
    color: $primary;
    font-weight: bold;
    font-size: 24px;
    text-decoration: none;
    flex-wrap: nowrap;
    white-space: nowrap;
    margin-left: 48px;
    & img {
      margin-right: 16px;
    }
  `,
  button: css`
    white-space: nowrap;
  `,
  actions: css`
    flex-wrap: nowrap;
  `
};
