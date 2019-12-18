import React from 'react';
import { cx, css } from 'linaria';
import Select from '../components/Select';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Ordering() {
  const { cities } = {};
  let cityIndex = -1;
  if (cities && cities.length) {
    for (let i = 0; i < cities.length; i++) {
      if (
        // state.selectedCity.trim().toLowerCase() ===
        // cities[i].city.trim().toLowerCase()
        true
      ) {
        cityIndex = i;
        break;
      }
    }
  }
  const selectCity = i => {
    // state.actions.setSelectedCity(cities[i].city);
  };
  return (
    <section scroll-data="ordering" className={classes.ordering}>
      <div className="cotainer">
        <h2 className={cx('section_title', classes.title)}>
          Вызовите мастера на дом
        </h2>
        <div className={classes.ordering_container}>
          <div className={classes.input_field}>
            <Select
              defaultIndex={cityIndex}
              onSelect={i => selectCity(i)}
              options={(cities || []).map(c => ({
                title: c.city,
                value: c.id
              }))}
              placeholder="Выберите город"
            />
          </div>
          <div className={classes.input_field}>
            <Select options={[]} placeholder="Выберите услугу" />
          </div>
          <div className={classes.input_field}>
            <Input placeholder="Ваше имя" />
          </div>
          <div className={classes.input_field}>
            <Input
              placeholder="Ваш номер телефона"
              type="tel"
              inputProps={{ mask: '+7 (999) 999 - 99 - 99' }}
            />
          </div>
          <div className={classes.description_wrapper}>
            <p className={classes.description}>
              Наш специалист обязательно с вами свяжется для уточнения даты и
              времени выезда
            </p>
          </div>
          <Button color="primary" className={classes.button} disabled={true}>
            Оставить заявку
          </Button>
          <div className={classes.policy_wrapper}>
            <div className={classes.policy}>
              Нажимая на кнопку, вы соглашаетесь с{' '}
              <a className={classes.policy_link} href="#plocy">
                политикой конфиденциальности
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const classes = {
  ordering: css`
    background-color: #ffffff;
    box-shadow: 0px 4px 20px rgba(70, 16, 16, 0.2);
    padding: 48px 0;
  `,
  ordering_container: css`
    margin: 0 auto;
    max-width: 655px;
    display: flex;
    flex-wrap: wrap;
  `,
  title: css`
    text-align: center;
  `,
  input_field: css`
    width: 50%;
    padding: 0 15px;
    margin-top: 12px;
  `,
  description: css`
    text-align: center;
    font-size: 18px;
    margin: 0 auto;
    max-width: 440px;
  `,
  button: css`
    margin: 48px auto 0;
    width: 270px;
  `,
  policy: css`
    max-width: 270px;
    margin: 0 auto;
    font-size: 14px;
    text-align: center;
  `,
  policy_wrapper: css`
    width: 100%;
    margin-top: 16px;
  `,
  policy_link: css`
    color: #000;
    outline: none;
  `
};
