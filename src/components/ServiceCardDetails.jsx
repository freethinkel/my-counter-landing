import React from 'react';
import { css } from 'linaria';
import { COLORS, SIZES } from '../assets/styles';
import Button from './Button';
import { DatePipe } from '../helpers/datePipe';

const ServiceCardDetails = ({
  title,
  description,
  price,
  photo,
  date,
  onEnroll
}) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <div className={classes.header}>
          <div className={classes.header_content}>
            <h5 className={classes.title}>{title}</h5>
            <p className={classes.description}>{description}</p>
            <img className={classes.photo_mobile} src={photo} alt="" />
            <hr className={classes.hr} />
            <div className={classes.price_wrapper}>
              <div>Стоимость работ</div>
              <b>от {price} руб.</b>
            </div>
          </div>
          <img className={classes.photo} src={photo} alt="" />
        </div>
        <div className={classes.content_footer}>
          <p className={classes.service_date_description}>
            Наш специалист приедет к вам:
          </p>
          <div className={classes.service_date}>
            {new DatePipe(date).getLongDate()}
          </div>
        </div>
      </div>
      <Button color="primary" onClick={onEnroll} className={classes.footer_btn}>
        Записаться
      </Button>
    </div>
  );
};

export default ServiceCardDetails;

const classes = {
  service_date_description: css`
    margin: 0;
    font-size: 18px;
  `,
  hr: css`
    margin: 0;
    border: none;
    background-color: #606060;
    height: 1px;
    @media screen and (max-width: ${SIZES.md}px) {
      display: none;
    }
  `,
  service_date: css`
    color: ${COLORS.primary};
    font-weight: bold;
    font-size: 24px;
    flex-grow: 1;
    padding-left: 32px;
    @media screen and (max-width: ${SIZES.md}px) {
      padding-left: 0;
    }
  `,
  price_wrapper: css`
    margin-top: 12px;
    font-size: 18px;
    @media screen and (max-width: ${SIZES.md}px) {
      margin-top: 24px;
    }
  `,
  content_footer: css`
    margin-top: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px 28px;
    @media screen and (max-width: ${SIZES.md}px) {
      margin-top: 32px;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 0 16px 24px;
    }
  `,
  header: css`
    padding: 32px;
    padding-bottom: 0;
    display: flex;
    @media screen and (max-width: ${SIZES.md}px) {
      padding: 24px 16px;
      flex-direction: column;
    }
  `,
  photo_mobile: css`
    display: none;
    object-fit: cover;
    object-position: center;
    margin: 0 -16px;
    height: 170px;
    @media screen and (max-width: ${SIZES.md}px) {
      display: block;
      width: calc(100% + 32px);
    }
  `,
  header_content: css`
    padding-right: 45px;
    @media screen and (max-width: ${SIZES.md}px) {
      padding-right: 0;
    }
  `,
  description: css`
    font-size: 20px;
    margin: 0;
    margin-bottom: 32px;
    @media screen and (max-width: ${SIZES.md}px) {
      margin-bottom: 16px;
      font-size: 14px;
    }
  `,
  photo: css`
    height: 182px;
    width: 250px;
    min-width: 250px;
    object-fit: cover;
    object-position: center;
    @media screen and (max-width: ${SIZES.md}px) {
      display: none;
    }
  `,
  title: css`
    font-size: 24px;
    margin-bottom: 12px;
    @media screen and (max-width: ${SIZES.md}px) {
      margin-bottom: 8px;
      font-size: 20px;
    }
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
