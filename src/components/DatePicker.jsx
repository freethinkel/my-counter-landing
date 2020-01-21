import React, { useState } from 'react';
import DayPicker from 'react-day-picker';
import Select from './Select';
import 'react-day-picker/lib/style.css';
import { DatePipe } from '../helpers/datePipe';
import { css } from 'linaria';
import { COLORS } from '../assets/styles';

const MONTHS = DatePipe.rusMonth.imn.map(e => e[0].toUpperCase() + e.substr(1));
const WEEKDAYS_LONG = DatePipe.weekDay;
const WEEKDAYS_SHORT = DatePipe.weekDayShort;

const DatePicker = ({
  onSelect,
  value,
  pastBefore,
  placeholder,
  label,
  disabledDays
}) => {
  return (
    <>
      <Select
        label={label}
        value={value ? new DatePipe(value).getLongDate() : null}
        placeholder={placeholder}
        customList={
          <div className={classes.list}>
            <DayPicker
              locale="ru"
              disabledDays={disabledDays || { before: pastBefore }}
              weekdaysLong={WEEKDAYS_LONG}
              selectedDays={value ? new Date(value) : null}
              onDayClick={d =>
                pastBefore
                  ? d.getTime() >= pastBefore.getTime() && onSelect(d)
                  : onSelect(d)
              }
              weekdaysShort={WEEKDAYS_SHORT}
              months={MONTHS}
            />
          </div>
        }
      />
    </>
  );
};

export default DatePicker;

const classes = {
  list: css`
    position: absolute;
    top: 100%;
    width: 100%;
    background-color: #fff;
    box-shadow: 0px 4px 20px rgba(70, 16, 16, 0.2);
    border-radius: 0 0 5px 5px;
    padding: 12px 8px;
    z-index: 10;
    & .DayPicker {
      width: 100%;
      & * {
        outline: none;
      }
      &-NavButton {
        top: 0;
        right: 0;
        background-image: url(${require('../assets/images/arrow-primary.svg')});
        &--prev {
          transform: rotate(180deg);
        }
      }
      &-Month {
        width: 100%;
        margin: 0;
      }
      &-Day {
        &--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
          background-color: ${COLORS.primary};
        }
        transition: 0.3s;
        border-radius: 5px;
        outline: none;
        cursor: pointer;
        &:focus {
          box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.12);
        }
        &--disabled {
          cursor: default;
          box-shadow: none;
        }
      }
    }
    .DayPicker:not(.DayPicker--interactionDisabled)
      .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
      background-color: #eee5e5;
    }
  `
};
