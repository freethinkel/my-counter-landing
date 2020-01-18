import React from 'react';
import { css, cx } from 'linaria';
import Button from './Button';
import { COLORS } from '../assets/styles';
import Skeleton from './Skeleton';

const SureCity = ({ city, onYes, onNo }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.card}>
        <div className={classes.title}>Ваш город</div>
        {!city && <Skeleton width={190} height={24} />}
        {!!city && <div className={classes.city}>{city}?</div>}
        <div className={classes.footer}>
          <Button onClick={onYes} color="primary">
            Все верно
          </Button>
          <Button onClick={onNo}>Нет, выбрать</Button>
        </div>
      </div>
    </div>
  );
};

export default SureCity;

const classes = {
  title: css`
    font-size: 28px;
    margin-bottom: 4px;
  `,
  city: css`
    font-size: 24px;
    font-weight: bold;
    color: ${COLORS.primary};
  `,
  wrapper: css`
    position: relative;
  `,
  card: css`
    position: absolute;
    margin-top: 12px;
    background-color: #fff;
    padding: 18px;
    border-radius: 5px;
    box-shadow: 0px 4px 10px rgba(70, 16, 16, 0.2);
  `,
  footer: css`
    display: flex;
    margin: 18px -8px 0;
    & button {
      white-space: nowrap;
      margin: 0 8px;
    }
  `
};
