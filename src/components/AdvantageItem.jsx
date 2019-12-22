import { css } from 'linaria';
import React from 'react';
import { COLORS, SIZES } from '../assets/styles';

function AdvantageItem({ icon, title, description }) {
  return (
    <div className={classes.item}>
      <div className={classes.icon}>
        <img src={icon} alt="" />
      </div>
      <div className={classes.content}>
        <h3 className={classes.title}>{title}</h3>
        <p className={classes.description}>{description}</p>
      </div>
    </div>
  );
}

export default AdvantageItem;

const classes = {
  item: css`
    display: flex;
    & + & {
      margin-top: 40px;
    }
    @media screen and (max-width: ${SIZES.md}px) {
      flex-direction: column;
    }
  `,
  content: css`
    padding-left: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media screen and (max-width: ${SIZES.md}px) {
      padding-left: 0;
      padding-top: 16px;
    }
  `,
  title: css`
    font-size: 24px;
    margin-bottom: 8px;
    @media screen and (max-width: ${SIZES.md}px) {
      font-size: 20px;
    }
  `,
  description: css`
    font-size: 18px;
    @media screen and (max-width: ${SIZES.md}px) {
      font-size: 16px;
    }
  `,
  icon: css`
    height: 140px;
    width: 140px;
    min-width: 140px;
    background-color: ${COLORS.purple};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    & img {
      width: 88px;
      height: 88px;
      object-fit: contain;
      object-position: center;
    }
  `
};
