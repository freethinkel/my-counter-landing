import React from 'react';
// import classes from './AboutCompany.module.scss';
import AdvantageItem from '../components/AdvantageItem';
import { cx, css } from 'linaria';
// import { css } from '../../utils';

const content = {
  title: 'Наша компания',
  text: [
    'На протяжении 10 лет наша компания занимается поверкой и заменой приборов учета воды, электричества, газа и тепла. ',
    'На протяжении 10 лет наша компания занимается поверкой и заменой приборов учета воды, электричества, газа и тепла. На протяжении 10 лет наша 10 лет наша компания занимается поверкойи заменой приборов учета воды, электричества, газа и тепла, газа и тепла.',
    'На протяжении 10 лет наша компания занимается поверкой и заменой приборов учета воды, электричества, газа и тепла'
  ],
  items: [
    {
      icon: require('../assets/images/symbol.svg'),
      title: 'Работаем по всей России',
      description: 'Работаем по всей России'
    },
    {
      icon: require('../assets/images/award.svg'),
      title: 'На рынке больше 10 лет',
      description:
        'Работаем давно и качественно, поэтому наши клиенты обращаются повторно'
    },
    {
      icon: require('../assets/images/request.svg'),
      title: 'Удобная подача заявки',
      description:
        'Наши клиенты могут не только звонить на горячую линию, но и оставить заявку прямо на сайте'
    }
  ]
};

function AboutCompany() {
  return (
    <section scroll-data="about" className={classes.about_company}>
      <div className="container">
        <div className={classes.row}>
          <div className={classes.col}>
            <h2 className={cx('section_title', classes.title)}>
              {content.title}
            </h2>
            {content.text.map((t, i) => (
              <p key={i} className={classes.p}>
                {t}
              </p>
            ))}
          </div>
          <div className={classes.col}>
            <div className={classes.items}>
              {content.items.map((item, i) => (
                <AdvantageItem
                  key={i}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              ))}
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
  `,
  title: css`
    margin-bottom: 16px;
  `,
  p: css`
    font-size: 20px;
    & + & {
      margin-top: 16px;
    }
  `,
  row: css`
    display: flex;
  `,
  col: css`
    width: 50%;
  `,
  items: css`
    padding-left: 100px;
  `
};
