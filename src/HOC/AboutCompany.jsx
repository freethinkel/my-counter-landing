import React, { useState } from 'react';
import AdvantageItem from '../components/AdvantageItem';
import { cx, css } from 'linaria';
import { useSelector } from 'react-redux';
import RichText from '@madebyconnor/rich-text-to-jsx';
import SliderControls from '../components/SliderControls';
import { SIZES } from '../assets/styles';
import SwipeableViews from 'react-swipeable-views';

function AboutCompany() {
  const aboutTitle = useSelector(state => state.settings.about_title);
  const [sliderIndex, setSliderIndex] = useState(0);
  const aboutDescription = useSelector(
    state => state.settings.about_description
  );
  const advantages = useSelector(state => state.settings.advantages) || [];
  const isMobileWidth = window.innerWidth <= SIZES.md;
  return (
    <section scroll-data="about" className={classes.about_company}>
      <div className="container">
        <div className={classes.row}>
          <div className={classes.col}>
            <h2 className={cx('section_title', classes.title)}>{aboutTitle}</h2>
            <div className={classes.about_description}>
              <RichText richText={aboutDescription} />
            </div>
          </div>
          <div className={classes.col}>
            <div className={classes.items}>
              <SliderControls
                activeIndex={sliderIndex}
                onChange={i => setSliderIndex(i)}
                length={advantages.length}
              />
              <div className={classes.items_wrapper}>
                <div className={classes.advantage_items}>
                  <div className={classes.carousel_wrapper}>
                    <div
                      className={classes.carousel}
                      // style={{
                      //   transform:
                      //     !isMobileWidth &&
                      //     `translateX(-${(sliderIndex /
                      //       (isMobileWidth ? 1 : advantages.length)) *
                      //       100}%)`
                      // }}
                    >
                      <SwipeableViews
                        index={sliderIndex}
                        onSwitching={i => setSliderIndex(i)}
                      >
                        {advantages.map((item, i) => (
                          <div
                            key={i}
                            className={cx(
                              classes.advantage_item_wrapper,
                              i !== sliderIndex && classes.inactive_item
                            )}
                          >
                            <AdvantageItem
                              icon={item.photo.file.url}
                              title={item.name}
                              description={item.description}
                            />
                          </div>
                        ))}
                      </SwipeableViews>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutCompany;

const classes = {
  about_company: css`
    padding: 64px 0;
    overflow: hidden;
  `,
  title: css`
    margin-bottom: 16px;
  `,
  about_description: css`
    & p {
      font-size: 20px;
      @media screen and (max-width: ${SIZES.md}px) {
        font-size: 16px;
      }
    }
  `,
  items_wrapper: css`
    display: flex;
    transition: 0.3s;
    margin-top: 31px;
    @media screen and (max-width: ${SIZES.md}px) {
      margin-top: 20px;
      display: block;
    }
  `,
  inactive_item: css`
    opacity: 0.4;
    @media screen and (max-width: ${SIZES.md}px) {
      padding-left: 15px !important;
    }
  `,
  carousel: css`
    display: flex;
    transition: 0.3s;
    align-items: center;
  `,
  carousel_wrapper: css`
    overflow: hidden;
    padding: 42px 21px;
    @media screen and (max-width: ${SIZES.md}px) {
      padding: 32px 15px;
    }
  `,
  advantage_item_wrapper: css`
    width: 580px;
    padding: 0 21px;
    @media screen and (max-width: ${SIZES.md}px) {
      width: 100%;
      min-width: 100%;
      padding: 0;
    }
  `,
  advantage_items: css`
    display: flex;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(70, 16, 16, 0.4);
    @media screen and (max-width: ${SIZES.md}px) {
      border-radius: 0;
      margin: 0 -15px;
    }
  `,
  row: css`
    display: flex;
    @media screen and (max-width: ${SIZES.md}px) {
      flex-direction: column;
    }
  `,
  col: css`
    width: 50%;
    @media screen and (max-width: ${SIZES.md}px) {
      width: 100%;
    }
  `,
  items: css`
    padding-left: 30px;
    @media screen and (max-width: ${SIZES.md}px) {
      padding-left: 0;
      margin-top: 32px;
    }
  `
};
