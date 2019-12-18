import React from 'react';
import { scrollToElem, getHeaderSize, scrollToSection } from '../utils';
import Button from '../components/Button';
import { css } from 'linaria';

const menus = [
  {
    title: 'О компании',
    url: 'about'
  },
  {
    title: 'Услуги',
    url: 'services'
  },
  {
    title: 'Контакты',
    url: 'contacts'
  },
  {
    title: 'Знаете ли вы',
    url: 'faq'
  }
];

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className="container">
        <div className={classes.row}>
          <div className={classes.content}>
            <Menu />
            <div className={classes.content_center}>
              <CityView />
              <PhoneView />
            </div>
          </div>
          <div className={classes.logo}>
            <Button color="white">Франшиза</Button>
            <img src={require('../assets/images/logo-white.svg')} alt="" />
          </div>
        </div>
        <Copyright />
      </div>
    </footer>
  );
}

function CityView() {
  return (
    <div className={classes.city_wrapper}>
      <div className={classes.city_label}>Ваш город</div>
      <div className={classes.city_value}>Владимир</div>
    </div>
  );
}

function PhoneView() {
  const goToOrder = e => {
    e.preventDefault();
    scrollToSection('ordering');
  };
  return (
    <div className={classes.phone_wrapper}>
      <div className={classes.phone_value}>8 (800) 775 - 70 - 71</div>
      <a
        href="#ordering"
        onClick={e => goToOrder(e)}
        className={classes.phone_label}
      >
        Оставить заявку
      </a>
    </div>
  );
}

function Copyright() {
  return <div className={classes.copyright}>© 2016 Мой счетчик</div>;
}

function Menu() {
  function navigate(menuId) {
    scrollToSection(menuId);
    return e => e.preventDefault();
  }
  return (
    <nav className={classes.menu}>
      <ul>
        {menus.map((l, i) => (
          <li key={i}>
            <a onClick={e => navigate(l.url)(e)} href={`#${l.url}`}>
              {l.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const classes = {
  footer: css`
    background-color: #616161;
    padding: 32px 0;
    position: relative;
    z-index: 1;
    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: calc(33%);
      background-color: #4b4b4b;
      z-index: 0;
    }
  `,
  row: css`
    display: flex;
    justify-content: space-between;
  `,
  menu: css`
    & ul {
      padding: 0;
      margin: 0;
      display: flex;
      & li {
        list-style: none;
        padding: 0;
        margin: 0;
        & + li {
          margin-left: 38px;
        }
        & a {
          text-decoration: none;
          outline: none;
          cursor: pointer;
          font-weight: bold;
          font-size: 18px;
          color: #fff;
        }
      }
    }
  `,
  content_center: css`
    margin-top: 64px;
    display: flex;
  `,
  logo: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;
    position: relative;
    & img {
      margin-top: 42px;
      height: 82px;
    }
  `,
  phone_value: css`
    font-size: 20px;
    font-weight: bold;
    color: #eeeeee;
  `,
  phone_label: css`
    font-size: 14px;
    color: #eeeeee;
    outline: none;
    margin-top: 10px;
    display: block;
  `,
  city_wrapper: css`
    width: 220px;
  `,
  city_label: css`
    font-size: 14px;
    color: #eeeeee;
  `,
  city_value: css`
    font-size: 20px;
    font-weight: bold;
    color: #eeeeee;
    margin-top: 10px;
  `,
  copyright: css`
    display: flex;
    width: 100%;
    font-size: 17px;
    margin-top: 42px;
    color: #eeeeee;
    align-items: center;
  `
};
