import React from 'react';
import { css } from 'linaria';
import { COLORS } from '../assets/styles';
import Button from './Button';

const ServiceCardDetails = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <div className={classes.header}>
          <div className={classes.header_content}>
            <h5 className={classes.title}>Воды</h5>
            <p className={classes.description}>
              Поверка/замена приборов учета воды
            </p>
          </div>
          <img
            className={classes.photo}
            src="https://source.unsplash.com/random"
            alt=""
          />
        </div>
        <div className="content_footer"></div>
      </div>
      <Button color="primary" className={classes.footer_btn}>
        Записаться
      </Button>
    </div>
  );
};

export default ServiceCardDetails;

const classes = {
  header: css`
    padding: 32px;
    display: flex;
  `,
  description: css`
    font-size: 20px;
    margin: 0;
  `,
  photo: css`
    object-fit: cover;
    object-position: center;
  `,
  title: css`
    font-size: 24px;
    margin-bottom: 12px;
  `,
  wrapper: css`
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0px 4px 10px rgba(70, 16, 16, 0.4);
    overflow: hidden;
  `,
  footer_btn: css`
    width: 100%;
    border-radius: 0;
    font-weight: bold;
  `
};
