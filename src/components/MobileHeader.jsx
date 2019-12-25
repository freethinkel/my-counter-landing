import React, { useState } from 'react';
import { css, cx } from 'linaria';
import { Link, useHistory } from 'react-router-dom';
import SelectCity from './SelectCity';
import { scrollToSection, phonePipe } from '../utils';
import { useSelector } from 'react-redux';
import { COLORS } from '../assets/styles';

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

const MobileHeader = ({ className }) => {
  const [isOpen, _setIsOpen] = useState(false);
  let setIsOpen = state => {
    document.body.style.overflow = state ? 'hidden' : 'auto';
    _setIsOpen(state);
  };
  const history = useHistory();
  const phone = useSelector(state => state.settings.phone_number);
  return (
    <>
      <div className={className}>
        <div className={cx('container', classes.container)}>
          <Burger onClick={() => setIsOpen(!isOpen)} state={isOpen} />
          <Link to="/" className={classes.logo}>
            <img src={require('../assets/images/logo.svg')} alt="" />
          </Link>
        </div>
      </div>
      <div
        className={cx(
          classes.header_content,
          isOpen && classes.header_content_active
        )}
      >
        <SelectCity />
        <Menu onChange={() => setIsOpen(false)} />
        <PhoneView
          phone={phone}
          goOrder={() => {
            history.push('/');
            setIsOpen(false);
            setTimeout(() => {
              scrollToSection('ordering');
            });
          }}
        />
      </div>
    </>
  );
};

export default MobileHeader;

const Menu = ({ onChange }) => {
  const history = useHistory();
  const changeMenu = menuId => {
    history.push('/');
    setTimeout(() => {
      scrollToSection(menuId);
    });
    onChange && onChange();
    return e => e.preventDefault();
  };
  return (
    <nav className={classes.menu}>
      <ul>
        {menus.map((l, i) => (
          <li key={i}>
            <a
              className={cx(classes.menu_item)}
              onClick={e => changeMenu(l.url)(e)}
              href={`#${l.url}`}
            >
              {l.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const Burger = ({ state, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cx(classes.burger, state && classes.burger_open)}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

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
  container: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  header_content: css`
    background-color: #fff;
    position: fixed;
    top: -1000px;
    bottom: 100%;
    overflow: hidden;
    transition: 0.3s;
    left: 0;
    width: 100%;
    padding: 112px 24px 48px;
    opacity: 0;
    z-index: 15;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  header_content_active: css`
    top: 0;
    bottom: 0;
    opacity: 1;
  `,
  logo: css`
    height: 43px;
    & img {
      height: 100%;
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
  burger: css`
    padding: 7px 4px;
    margin: 0;
    background-color: transparent;
    border: none;
    outline: none;
    width: 32px;
    height: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    & span {
      display: block;
      width: 24px;
      height: 2px;
      background-color: #000;
      transition: 0.3s;
    }
  `,
  burger_open: css`
    & span {
      &:nth-child(1) {
        transform: rotate(-45deg) translate(-7px, 6px);
      }
      &:nth-child(3) {
        transform: rotate(45deg) translate(-6px, -5px);
      }
      &:nth-child(2) {
        opacity: 0;
      }
    }
  `,
  menu: css`
    margin-top: 48px;
    flex-grow: 1;
    & ul {
      padding: 0;
      margin: 0;
      & li {
        list-style: none;
        display: block;
      }
    }
  `,
  menu_item: css`
    color: #000;
    display: block;
    text-decoration: none;
    padding: 8px 0;
    font-size: 18px;
  `
};
