import React from 'react';
import Button from '../components/Button';
import { scrollToSection } from '../utils';
import { css, cx } from 'linaria';
import { useSelector } from 'react-redux';
import RichText from '@madebyconnor/rich-text-to-jsx';
import { SIZES } from '../assets/styles';

function MainBanner() {
  const loading = useSelector(state => state.settings.app_loading);
  const description = useSelector(state => state.settings.description);
  const header = useSelector(state => state.settings.header);
  const banner_photo = useSelector(state => state.settings.banner_photo);
  const scrollToOrder = () => {
    scrollToSection('ordering');
  };
  return (
    <div className={classes.banner}>
      <div className={cx('container', classes.container)}>
        <div className={classes.row}>
          <div className={classes.col}>
            <h1 className={classes.title}>{header}</h1>
            <div className={classes.description}>
              <RichText richText={description} />
            </div>
            <Button
              onClick={() => scrollToOrder()}
              className={classes.button}
              color="primary"
            >
              Оставить заявку
            </Button>
          </div>
        </div>
        {!loading && (
          <img
            className={classes.image}
            src={banner_photo.file.url}
            alt="Баннер"
          />
        )}
      </div>
    </div>
  );
}

export default MainBanner;

const classes = {
  title: css`
    font-size: 42px;
    margin-bottom: 16px;
    @media screen and (max-width: ${SIZES.md}px) {
      font-size: 28px;
      margin-bottom: 12px;
    }
  `,
  container: css`
    position: relative;
  `,
  description: css`
    & p {
      font-size: 24px;
    }
    font-size: 24px;
    @media screen and (max-width: ${SIZES.md}px) {
      & p {
        font-size: 16px;
      }
      font-size: 16px;
    }
  `,
  button: css`
    margin-top: 48px;
    @media screen and (max-width: ${SIZES.md}px) {
      margin-top: 32px;
    }
  `,
  row: css`
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 1;
  `,
  col: css`
    width: 50%;
    @media screen and (max-width: ${SIZES.md}px) {
      width: 100%;
    }
  `,
  banner: css`
    position: relative;
    background-color: #fff;
    padding: 82px 0;
    @media screen and (max-width: ${SIZES.md}px) {
      padding: 32px 0;
      user-select: none;
    }
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
    @media screen and (max-width: ${SIZES.md}px) {
      width: 100%;
      position: static;
      max-width: 700px;
      margin: 16px auto 0;
      display: block;
    }
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
