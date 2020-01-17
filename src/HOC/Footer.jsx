import React from 'react';
import { scrollToSection, phonePipe, scrollToElem } from '../utils';
import Button from '../components/Button';
import { css, cx } from 'linaria';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

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
  const phone = useSelector(state => state.settings.phone_number);
  const currentCity = useSelector(state => state.cities.currentCity);
  return (
    <footer className={classes.footer}>
      <div className={cx('container', classes.container)}>
        <div className={classes.row}>
          <div className={classes.content}>
            <nav className={classes.menu}>
              <Menu />
              <Button className={classes.franshiz_mobile} color="white">
                Франшиза
              </Button>
              <Link
                to="/partners"
                onClick={() => scrollToElem('body', 0)}
                className={classes.parners_link}
              >
                Партнеры
              </Link>
            </nav>

            <div className={classes.content_center}>
              <CityView city={currentCity} />
              <PhoneView phone={phone} />
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

function CityView({ city }) {
  return (
    <div className={classes.city_wrapper}>
      <div className={classes.city_label}>Ваш город</div>
      <div className={classes.city_value}>{city}</div>
    </div>
  );
}

function PhoneView({ phone }) {
  const history = useHistory();
  const goToOrder = e => {
    e.preventDefault();
    history.push('/');
    setTimeout(() => {
      scrollToSection('ordering');
    });
  };
  return (
    <div className={classes.phone_wrapper}>
      <a href={'tel:' + phone} className={classes.phone_value}>
        {phonePipe(phone)}
      </a>
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
  return <div className={classes.copyright}>© 2020 Мой счетчик</div>;
}

function Menu() {
  const history = useHistory();
  function navigate(menuId) {
    history.push('/');
    setTimeout(() => {
      scrollToSection(menuId);
    });
    return e => e.preventDefault();
  }
  return (
    <ul>
      {menus.map((l, i) => (
        <li key={i}>
          <a onClick={e => navigate(l.url)(e)} href={`#${l.url}`}>
            {l.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

const mobileSize = '800px';

const classes = {
  container: css`
    @media screen and (max-width: ${mobileSize}) {
      padding: 0 32px;
    }
  `,
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
      @media screen and (max-width: ${mobileSize}) {
        display: none;
      }
    }
  `,
  franshiz_mobile: css`
    display: none;
    width: auto;
    margin: 48px 0 16px;
    @media screen and (max-width: ${mobileSize}) {
      display: block;
    }
  `,
  row: css`
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: ${mobileSize}) {
      flex-direction: column;
    }
  `,
  parners_link: css`
    color: #eee;
    font-weight: bold;
    font-size: 20px;
    margin-left: 100px;
    @media screen and (max-width: ${mobileSize}) {
      margin-left: 0;
    }
    @media screen and (max-width: 1100px) {
      margin-left: 24px;
    }
    @media screen and (max-width: 900px) {
      margin-left: 0;
      margin-top: 24px;
    }
  `,
  menu: css`
    display: flex;
    @media screen and (max-width: ${mobileSize}) {
      flex-direction: column;
      align-items: flex-start;
    }
    @media screen and (max-width: 900px) {
      flex-direction: column;
    }
    & ul {
      padding: 0;
      margin: 0;
      display: flex;
      @media screen and (max-width: ${mobileSize}) {
        flex-direction: column;
      }
      & li {
        list-style: none;
        padding: 0;
        margin: 0;
        & + li {
          margin-left: 38px;
          @media screen and (max-width: 1100px) {
            margin-left: 16px;
          }
          @media screen and (max-width: ${mobileSize}) {
            margin-left: 0;
            margin-top: 15px;
          }
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
    @media screen and (max-width: ${mobileSize}) {
      margin-top: 48px;
    }
  `,
  logo: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;
    position: relative;
    @media screen and (max-width: ${mobileSize}) {
      display: none;
    }
    & img {
      margin-top: 42px;
      height: 82px;
    }
  `,
  phone_value: css`
    font-size: 20px;
    font-weight: bold;
    color: #eeeeee;
    text-decoration: none;
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
    @media screen and (max-width: ${mobileSize}) {
      display: none;
    }
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
    @media screen and (max-width: ${mobileSize}) {
      margin-top: 32px;
    }
  `
};
