import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from './Footer';
import { css, cx } from 'linaria';
import SliderControls from '../components/SliderControls';
import Button from '../components/Button';
import { useHistory } from 'react-router-dom';

const Partners = () => {
  const partners = useSelector(state => state.settings.partners) || [];
  const [activeIndex, setIndex] = useState(0);
  const history = useHistory();
  const activeSlide = partners[activeIndex] || {};
  return (
    <div className="page_wrapper">
      <Header />
      <div className="page">
        <section className={classes.section}>
          <div className={classes.header}>
            <div className={cx('container', classes.header_container)}>
              <Button
                className={classes.header_btn}
                color="primary"
                onClick={() => history.push('/')}
              >
                Вернуться
              </Button>
            </div>
          </div>
          <div className={cx('container', classes.container)}>
            <div className={classes.slide_active_wrapper}>
              <div className={classes.slide_active_wrapper_header}>
                <h1 className={cx('section_title', classes.title)}>Партнеры</h1>
                <SliderControls
                  activeIndex={activeIndex}
                  onChange={i => setIndex(i)}
                  length={partners.length}
                />
              </div>
              <div className={classes.slide_active}>
                <h2 className={classes.active_slide_title}>
                  {activeSlide.name}
                </h2>
                <p className={classes.active_slide_description}>
                  {activeSlide.description}
                </p>
                <img
                  className={classes.active_slide_img}
                  src={activeSlide.photo?.file?.url}
                  alt=""
                />
              </div>
            </div>
            <div className={classes.other_slides}>
              {partners
                .filter((_, i) => i > activeIndex)
                .map((e, i) => (
                  <img
                    key={i}
                    className={classes.other_slides_img}
                    src={e.photo.file.url}
                    alt=""
                  />
                ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Partners;

const classes = {
  section: css`
    padding: 48px 0 88px;
    overflow: hidden;
  `,
  header_container: css`
    position: relative;
  `,
  header_btn: css`
    position: absolute;
    right: 15px;
    @media screen and (max-width: 880px) {
      margin-bottom: 32px;
      position: static;
    }
  `,
  container: css`
    display: flex;
  `,
  other_slides: css`
    display: flex;
    width: 0;
  `,
  other_slides_img: css`
    width: 400px;
    margin: 0 32px;
    object-fit: contain;
    object-position: center;
  `,
  slide_active_wrapper: css`
    max-width: 600px;
    width: 100%;
    margin-right: 32px;
    @media screen and (max-width: 660px) {
      margin-right: 0;
      max-width: 100%;
    }
  `,
  slide_active_wrapper_header: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    @media screen and (max-width: 660px) {
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 20px;
    }
  `,
  slide_active: css`
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0px 4px 10px rgba(70, 16, 16, 0.4);
    padding: 38px;
    @media screen and (max-width: 660px) {
      padding: 24px 16px;
    }
  `,
  active_slide_title: css`
    font-size: 24px;
    margin: 0;
    @media screen and (max-width: 660px) {
      font-size: 20px;
    }
  `,
  active_slide_description: css`
    font-size: 20px;
    margin-top: 8px;
    @media screen and (max-width: 660px) {
      font-size: 14px;
    }
  `,
  active_slide_img: css`
    width: 100%;
    margin-top: 18px;
  `,
  title: css`
    @media screen and (max-width: 660px) {
      margin-bottom: 32px;
    }
  `
};
