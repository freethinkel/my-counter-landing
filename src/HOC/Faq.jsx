import React, { useState, useEffect } from 'react';
import RichText from '@madebyconnor/rich-text-to-jsx';
import { cx, css } from 'linaria';
import { useSelector } from 'react-redux';
import { SIZES } from '../assets/styles';

export default function Faq() {
  const [selectedIndex, setIndex] = useState(0);
  const faqs = useSelector(state => state.settings.faqs) || [];
  useEffect(() => {
    const allItems = document.querySelectorAll('.faqs_list .faqs_list_content');
    const currentEl = allItems[selectedIndex];
    if (currentEl) {
      currentEl.style.height = 'auto';
      const currentHeight = currentEl.clientHeight + 32;
      currentEl.style.height = 0;
      allItems.forEach(e => (e.style.height = 0));
      setTimeout(() => {
        currentEl.style.height = currentHeight + 'px';
      }, 100);
    }
  }, [selectedIndex]);
  useEffect(() => {
    setTimeout(() => {
      const allItems = document.querySelectorAll(
        '.faqs_list .faqs_list_content'
      );
      const currentEl = allItems[selectedIndex];
      if (currentEl) {
        currentEl.style.height = 'auto';
      }
    }, 300);
  }, [faqs]);
  return (
    <section className={classes.faq} scroll-data="faq">
      <div className="container">
        <h2 className={cx('section_title', classes.title)}>Знаете ли вы?</h2>
        <div className={classes.row}>
          <div className={classes.list_wrapper}>
            <div className={classes.arrows}>
              <button
                className={classes.arrow_btn}
                disabled={selectedIndex === 0}
                onClick={() => setIndex(selectedIndex - 1)}
              >
                <img
                  alt=""
                  src={require('../assets/images/arrow-primary.svg')}
                />{' '}
              </button>
              <button
                className={cx(classes.arrow_btn, classes.arrow_btn_right)}
                disabled={selectedIndex === faqs.length - 1}
                onClick={() => setIndex(selectedIndex + 1)}
              >
                <img
                  alt=""
                  src={require('../assets/images/arrow-primary.svg')}
                />{' '}
              </button>
            </div>
            <ul className={cx('faqs_list', classes.list)}>
              {faqs.map((f, i) => (
                <li key={i + f.name}>
                  <button
                    onClick={() => setIndex(i)}
                    className={cx(
                      selectedIndex === i && classes.list_item_active
                    )}
                  >
                    {f.name}
                  </button>
                  <div
                    // style={{
                    //   height: selectedIndex === i ? currentHeight + 'px' : 0
                    // }}
                    className={cx(
                      'faqs_list_content',
                      classes.mobile_content,
                      selectedIndex === i && classes.mobile_content_active
                    )}
                  >
                    <RichText richText={faqs[i].text} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={classes.content}>
            {faqs[selectedIndex] && (
              <RichText richText={faqs[selectedIndex].text} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const classes = {
  content: css`
    background: #ffffff;
    box-shadow: 0px 4px 10px rgba(70, 16, 16, 0.2);
    border-radius: 10px;
    padding: 48px 64px 48px;
    flex-grow: 1;
    font-size: 20px;
    line-height: 36px;
    @media screen and (max-width: ${SIZES.md}px) {
      display: none;
    }
  `,
  title: css`
    margin-bottom: 32px;
  `,
  faq: css`
    padding: 55px 0;
  `,
  list: css`
    background: #f9d5d5;
    box-shadow: 0px 4px 10px rgba(70, 16, 16, 0.2);
    border-radius: 10px;
    padding: 0;
    margin: 0;
    overflow: hidden;
    @media screen and (max-width: ${SIZES.md}px) {
      border-radius: 0;
      margin: 0 -15px;
    }
    & li {
      list-style: none;
      width: 100%;
      color: #000;
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: 0.3s;
      position: relative;
      z-index: 1;
      @media screen and (max-width: ${SIZES.md}px) {
        flex-direction: column;
      }
      & button {
        border: none;
        transition: 0.3s;
        background-color: transparent;
        font-size: 24px;
        text-align: left;
        padding: 24px 12px;
        width: 100%;
        outline: none;
        z-index: 10;
        @media screen and (max-width: ${SIZES.md}px) {
          padding: 12px 15px;
          font-size: 20px;
        }
        &:hover {
          background: #fff;
        }
      }
    }
  `,
  list_item_active: css`
    background-color: #fff !important;
  `,
  list_wrapper: css`
    width: 40%;
    min-width: 40%;
    position: relative;
    z-index: 10;
    padding-bottom: 40px;
    margin-right: -20px;
    @media screen and (max-width: ${SIZES.md}px) {
      width: 100%;
    }
  `,
  mobile_content: css`
    display: none;
    background-color: #fff;
    overflow: hidden;
    padding: 0 16px;
    transition: 0.3s;
    font-size: 16px;
    height: 0;
    & p {
      font-size: 16px;
      line-height: 22px;
    }
    @media screen and (max-width: ${SIZES.md}px) {
      display: block;
    }
  `,
  mobile_content_active: css`
    padding: 16px;
    box-shadow: 0px 4px 10px rgba(70, 16, 16, 0.2);
  `,
  row: css`
    display: flex;
  `,
  arrows: css`
    display: flex;
    margin-bottom: 20px;
  `,
  arrow_btn: css`
    border: 0;
    margin: 0;
    width: 32px;
    height: 32px;
    padding: 0;
    display: flex;
    background-color: transparent;
    cursor: pointer;
    outline: none;
    &[disabled] {
      opacity: 0.4;
      cursor: default;
    }
    & img {
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
    }
  `,
  arrow_btn_right: css`
    margin-left: 24px;
    & img {
      transform: rotate(90deg);
    }
  `
};
