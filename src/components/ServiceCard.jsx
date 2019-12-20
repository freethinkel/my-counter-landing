import React from 'react';
import { COLORS } from '../assets/styles';
import Button from './Button';
import { cx, css } from 'linaria';

function ServiceCard({ title, photo, className }) {
  return (
    <div className={cx(classes.wrapper, className)}>
      <div className={classes.header}>
        <h5 className={classes.title}>{title}asdas</h5>
      </div>
      <img className={classes.image} src={photo} alt="Фото услуги" />
    </div>
  );
}

export default ServiceCard;

const classes = {
  wrapper: css`
    height: 284px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0px 4px 10px rgba(70, 16, 16, 0.4);
  `,
  header: css`
    height: 82px;
    display: flex;
    align-items: center;
  `,
  title: css`
    font-size: 24px;
    padding: 0 16px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  `,
  photo: css`
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
    background-color: red;
  `
};
