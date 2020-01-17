import React, { useEffect, useState } from 'react';
import {
  getHeaderSize,
  scrollToElem,
  scrollToSection,
  phonePipe
} from '../utils';
import SelectCity from './SelectCity';
import { COLORS, SIZES } from '../assets/styles';
import { cx, css } from 'linaria';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import MobileHeader from './MobileHeader';
import AnimatedLogo from './AnimatedLogo';

const menus = [
  {
    title: 'Услуги',
    url: 'services'
  },
  {
    title: 'О компании',
    url: 'about'
  },
  {
    title: 'Знаете ли вы',
    url: 'faq'
  },
  {
    title: 'Контакты',
    url: 'contacts'
  }
];

function Header() {
  const [scrollPos, changeScrollPos] = useState(0);
  const phone = useSelector(state => state.settings.phone_number);
  useEffect(() => {
    changeScrollPos(window.pageYOffset);
    function onScroll() {
      changeScrollPos(window.pageYOffset);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const history = useHistory();
  const goToHome = e => {
    scrollToElem('body', 0);
  };

  return (
    <header>
      <div className={cx(classes.header, classes.show_md, classes.none_md)}>
        <div className="container">
          <div className={classes.content}>
            <Link className={classes.logo} onClick={goToHome} to="/">
              <AnimatedLogo />
              {/* <img src={require('../assets/images/logo.svg')} alt="Логотип" /> */}
            </Link>
            <SelectCity />
            <PhoneView
              phone={phone}
              goOrder={() => {
                history.push('/');
                setTimeout(() => {
                  scrollToSection('ordering');
                });
              }}
            />
            <Menu scrollPos={scrollPos} />
          </div>
        </div>
      </div>
      <MobileHeader
        className={cx(classes.header, classes.none, classes.show_md_min)}
      />
    </header>
  );
}
export default Header;

function Menu({ scrollPos }) {
  const preventDefault = e => e.preventDefault();
  const history = useHistory();
  const changeMenu = menuId => {
    history.push('/');
    setTimeout(() => {
      scrollToSection(menuId);
    });
    return preventDefault;
  };
  const triggers = {};
  menus.forEach(el => {
    const section = document.querySelector(`[scroll-data=${el.url}]`);
    const headerSize = getHeaderSize();
    if (section) {
      triggers[el.url] =
        scrollPos / 0.69 + headerSize < section.offsetTop &&
        scrollPos / 0.69 + window.innerHeight / 0.69 >
          section.offsetTop + section.offsetHeight;
    }
  });
  return (
    <ul className={classes.menu}>
      {menus.map((l, i) => (
        <li key={i}>
          <a
            className={cx(classes.menu_item, triggers[l.url] && 'active')}
            onClick={e => changeMenu(l.url)(e)}
            href={`#${l.url}`}
          >
            {l.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

const PhoneView = ({ phone, goOrder }) => {
  return (
    <div className={classes.ordering_wrapper}>
      <a
        href="#ordering"
        className={classes.ordering_link}
        onClick={e => {
          e.preventDefault();
          goOrder();
        }}
      >
        Оставить заявку
      </a>
      <a className={classes.ordering_phone} href={'tel:' + phone}>
        {phonePipe(phone)}
      </a>
    </div>
  );
};

const classes = {
  none: css`
    display: none;
  `,
  show_md: css`
    @media screen and (min-width: ${SIZES.md}px) {
      display: block;
    }
  `,
  show_md_min: css`
    @media screen and (max-width: ${SIZES.md}px) {
      display: block;
    }
  `,
  none_md: css`
    @media screen and (max-width: ${SIZES.md}px) {
      display: none;
    }
  `,
  none_sm: css`
    @media screen and (max-width: ${SIZES.sm}px) {
      display: none;
    }
  `,
  ordering_wrapper: css`
    display: flex;
    flex-direction: column;
    padding-top: 8px;
  `,
  ordering_link: css`
    color: ${COLORS.primary};
    font-size: 14px;
  `,
  ordering_phone: css`
    font-size: 20px;
    color: #000;
    font-weight: bold;
    text-decoration: none;
    margin-top: 8px;
  `,
  header: css`
    padding: 18px 0;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 100;
    transition: 0.3s;
    background-color: #fcfcfc;
    box-shadow: 0px 4px 20px rgba(70, 16, 16, 0.2);
  `,
  content: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  logo: css`
    text-decoration: none;
    & img {
      height: 100%;
      object-fit: contain;
    }
    @media screen and (max-width: 1100px) {
      height: 60px;
    }
  `,
  menu: css`
    padding: 0;
    margin: 0;
    display: flex;
    & li {
      list-style: none;
      & + li {
        margin-left: 12px;
      }
    }
    &:hover {
      & li a {
        &.active {
          color: ${COLORS.primary};
          &:after {
            opacity: 0;
          }
        }
      }
    }
  `,
  menu_item: css`
    color: #000;
    text-decoration: none;
    font-size: 18px;
    padding: 12px;
    transition: 0.3s;
    position: relative;
    line-height: 25px;
    display: inline-block;
    @media screen and (max-width: 1100px) {
      font-size: 16px;
      padding: 8px;
    }
    &:after {
      content: '';
      position: absolute;
      background-color: ${COLORS.primary};
      top: 100%;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: -1;
      border-radius: 0 0 5px 5px;
      opacity: 0;
      transition: 0.3s;
    }
    &.active {
      color: #fff;
      &:after {
        top: -100px;
        opacity: 1;
      }
    }
    &:hover {
      color: #fff !important;
      &::after {
        opacity: 1 !important;
        top: -100px;
      }
    }
  `
};
