import React from 'react';
import { COLORS } from '../assets/styles';
import Button from './Button';
import { cx, css } from 'linaria';

function ServiceCard({ image, className }) {
  return (
    <div className={cx(classes.wrapper, className)}>
      <div className={classes.header}>
        <div className={classes.action}>
          <Button color="primary">Записаться</Button>
        </div>
        <img className={classes.image} src={image} alt="Фото услуги" />
      </div>
      <h4 className={classes.title}>Поверка/замена счетчиков воды</h4>
      <div className={classes.price}>
        <span>Цена: </span>
        <b> от 370 руб.</b>
      </div>
      <div className={classes.departure}>
        Ближайшая дата выезда специалиста{' '}
        <span className={classes.primary_text}>
          <b>31 октября 2019</b>
        </span>
      </div>
    </div>
  );
}

export default ServiceCard;

const classes = {
  header: css`
    height: 214px;
    position: relative;
  `,
  action: css`
    background-color: rgba(#000, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    position: absolute;
    transition: 0.3s;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
    opacity: 0;
  `,
  wrapper: css`
    width: 100%;
    cursor: pointer;
    &:hover .action {
      opacity: 1;
    }
  `,
  title: css`
    font-size: 24px;
    margin-top: 9px;
  `,
  image: css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #e5e5e5;
    object-fit: cover;
    object-position: center;
  `,
  price: css`
    font-size: 18px;
    margin-top: 16px;
  `,
  departure: css`
    margin-top: 24px;
  `,
  primary_text: css`
    color: ${COLORS.primary};
  `
};
