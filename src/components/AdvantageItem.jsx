import { css } from 'linaria';
import React from 'react';

function AdvantageItem({ icon, title, description }) {
  return (
    <div className={classes.item}>
      <div className={classes.item_icon}>
        <img src={icon} alt="" />
      </div>
      <div className={classes.item_content}>
        <h3 className={classes.item_title}>{title}</h3>
        <p className={classes.item_descrption}>{description}</p>
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
  `,
  content: css`
    padding-left: 38px;
  `,
  title: css`
    font-size: 24px;
    margin-top: 10px;
  `,
  description: css`
    font-size: 18px;
    margin-top: 8px;
  `,
  icon: css`
    height: 110px;
    width: 110px;
    min-width: 110px;
    background-color: $purple;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    & img {
      width: 66px;
      height: 66px;
    }
  `
};
