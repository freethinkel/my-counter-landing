import React, { useState, useEffect } from 'react';
import { cx, css } from 'linaria';
import Select from '../components/Select';
import Input from '../components/Input';
import Button from '../components/Button';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentCity } from '../store/slices/cities';
import {
  selectService,
  setPhoneNumberOrdering,
  setNameOrdering,
  setAddressOrdering,
  setDepartDateOrdering,
  sendNewOrderAction
} from '../store/slices/ordering';
import DatePicker from '../components/DatePicker';

export default function Ordering() {
  const cities = useSelector(state => state.cities.cities);
  const currentCity = useSelector(state => state.cities.currentCity);
  const orderingState = useSelector(state => state.ordering);
  const services = useSelector(state => state.settings.services) || [];
  const pastDateBefore = orderingState.currentService
    ? new Date(orderingState.currentService.date)
    : null;
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    name: { error: true, touched: false },
    phone: { error: true, touched: false },
    address: { error: true, touched: false },
    date: { error: true, touched: false }
  });

  useEffect(() => {
    dispatch(setDepartDateOrdering(null));
  }, [currentCity]);
  const _selectCity = i => {
    dispatch(setCurrentCity(cities[i].city));
  };
  const _selectService = i => {
    dispatch(selectService(services[i]));
    dispatch(setDepartDateOrdering(null));
    setErrors({ ...errors, date: { error: true, touched: true } });
  };
  const _setDate = d => {
    setErrors({ ...errors, date: { error: false, touched: true } });
    dispatch(setDepartDateOrdering(d.toString()));
  };
  const onSubmit = e => {
    e.preventDefault();
    sendNewOrderAction(dispatch)({ ...orderingState, city: currentCity });
    console.log(errors);
  };
  const isValid = () =>
    !Object.keys(errors).some(k => !(!errors[k].error && errors[k].touched));
  return (
    <section scroll-data="ordering" className={classes.ordering}>
      <div className="container">
        {orderingState.success && (
          <>
            <h2 className={cx('section_title', classes.title)}>
              Ваша заявка успешно отправлена
            </h2>
            <p className={classes.description}>
              Наш специалист обязательно с вами свяжется для уточнения даты и
              времени выезда
            </p>
          </>
        )}
        {!orderingState.success && (
          <form onSubmit={onSubmit}>
            <h2 className={cx('section_title', classes.title)}>
              Вызовите мастера на дом
            </h2>
            <div className={classes.ordering_container}>
              <div className={classes.input_field}>
                <Select
                  value={currentCity}
                  onSelect={_selectCity}
                  label="Город"
                  options={(cities || []).map(c => c.city)}
                  placeholder="Выберите город"
                />
              </div>
              <div className={classes.input_field}>
                <Input
                  onChange={v => dispatch(setNameOrdering(v))}
                  value={orderingState.name}
                  isError={errors.name.error && errors.name.touched}
                  inputProps={{
                    onBlur: () =>
                      setErrors({
                        ...errors,
                        name: { error: !orderingState.name, touched: true }
                      })
                  }}
                  label="Имя"
                  placeholder="Ваше имя"
                />
              </div>
              <div className={classes.input_field}>
                <Input
                  label="Адрес"
                  placeholder="Улица, дом, квартира"
                  value={orderingState.address}
                  onChange={v => dispatch(setAddressOrdering(v))}
                  isError={errors.address.error && errors.address.touched}
                  inputProps={{
                    onBlur: () =>
                      setErrors({
                        ...errors,
                        address: {
                          error: !orderingState.address,
                          touched: true
                        }
                      })
                  }}
                />
              </div>
              <div className={classes.input_field}>
                <Select
                  label="Услуга"
                  onSelect={_selectService}
                  value={
                    'Счетчики ' +
                    (orderingState?.currentService?.name || '').toLowerCase()
                  }
                  options={services.map(
                    s => 'Счетчики ' + s.name.toLowerCase(0)
                  )}
                  placeholder="Выберите услугу"
                />
              </div>
              <div className={classes.input_field}>
                <Input
                  placeholder="Ваш номер телефона"
                  type="tel"
                  label="Телефон"
                  isError={errors.phone.error && errors.phone.touched}
                  onChange={v => dispatch(setPhoneNumberOrdering(v))}
                  value={orderingState.phoneNumber}
                  inputProps={{
                    mask: '+7 (999) 999 - 99 - 99',
                    onBlur: () =>
                      setErrors({
                        ...errors,
                        phone: {
                          error: !/\+7 \(\d{3}\) \d{3} - \d{2} - \d{2}/gm.test(
                            orderingState.phoneNumber
                          ),
                          touched: true
                        }
                      })
                  }}
                />
              </div>
              <div className={classes.input_field}>
                <DatePicker
                  onSelect={v => _setDate(v)}
                  value={orderingState.departDate}
                  pastBefore={pastDateBefore}
                  placeholder="Дата выезда"
                  label="Удобная для вас дата"
                />
              </div>
            </div>
            <div className={classes.ordering_footer}>
              <Button
                color="primary"
                type="submit"
                className={classes.button}
                disabled={!isValid() || orderingState.loading}
              >
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
          </form>
        )}
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
    max-width: 1000px;
    display: flex;
    flex-wrap: wrap;
    @media screen and (max-width: 1000px) {
      margin: 0 -15px;
    }
  `,
  ordering_footer: css`
    margin-top: 64px;
    @media screen and (max-width: 800px) {
      margin-top: 48px;
    }
  `,
  title: css`
    text-align: center;
    margin-bottom: 8px;
  `,
  input_field: css`
    width: 33.333%;
    padding: 0 15px;
    margin-top: 40px;
    @media screen and (max-width: 800px) {
      width: 50%;
      margin-top: 32px;
    }
    @media screen and (max-width: 550px) {
      width: 100%;
    }
  `,
  description: css`
    text-align: center;
    font-size: 18px;
    margin: 24px auto 0;
    max-width: 440px;
  `,
  button: css`
    margin: 0 auto;
    max-width: 270px;
    width: 100%;
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
