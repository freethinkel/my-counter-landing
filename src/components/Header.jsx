import React, { useEffect, useState } from 'react';
import { getHeaderSize, scrollToElem, scrollToSection } from '../utils';
import SelectCity from './SelectCity';
import { COLORS } from '../assets/styles';
import { cx, css } from 'linaria';

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
  useEffect(() => {
    changeScrollPos(window.pageYOffset);
    function onScroll() {
      changeScrollPos(window.pageYOffset);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollPos]);

  const goToHome = e => {
    e.preventDefault();
    window.history.pushState({}, 'home', '/');
    scrollToElem('body', 0);
  };

  return (
    <header className={cx(classes.header, scrollPos > 20 && classes.active)}>
      <div className="container">
        <div className={classes.content}>
          <a className={classes.logo} onClick={goToHome} href="/">
            <img src={require('../assets/images/logo.svg')} alt="Логотип" />
          </a>
          <SelectCity />
          <Menu scrollPos={scrollPos} />
        </div>
      </div>
    </header>
  );
}
export default Header;

function Menu({ scrollPos }) {
  const preventDefault = e => e.preventDefault();
  const changeMenu = menuId => {
    scrollToSection(menuId);
    return preventDefault;
  };
  const triggers = {};
  menus.forEach(el => {
    const section = document.querySelector(`[scroll-data=${el.url}]`);
    const headerSize = getHeaderSize();
    if (section) {
      triggers[el.url] =
        section.offsetTop - headerSize < scrollPos + window.innerHeight / 2 &&
        section.offsetTop - headerSize + section.offsetHeight >
          scrollPos + window.innerHeight / 2;
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

const classes = {
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
