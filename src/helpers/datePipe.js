export class DatePipe {
  d;
  static rusMonth = {
    rdt: [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря'
    ],
    imn: [
      'январь',
      'февраль',
      'март',
      'апрель',
      'май',
      'июнь',
      'июль',
      'август',
      'сентябрь',
      'октябрь',
      'ноябрь',
      'декабрь'
    ]
  };
  static weekDayShort = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  static weekDay = [
    'Понелельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье'
  ];

  constructor(d) {
    this.d = new Date(d || new Date());
  }

  getDateMonthNumber() {
    return `${this.fixedNumber(this.d.getDate())}:${this.fixedNumber(
      this.d.getMonth()
    )}`;
  }

  getYear(l = 4) {
    return this.fixedNumber(this.d.getFullYear(), l);
  }

  getLongMonth(t = 'rdt') {
    return DatePipe.rusMonth[t][this.d.getMonth()];
  }

  getLongDate() {
    return `${this.getDateMonth()} ${this.getYear()} г.`;
  }

  getDateMonth() {
    return `${this.fixedNumber(this.d.getDate())} ${this.getLongMonth()}`;
  }

  getShortDate() {
    return `${this.fixedNumber(this.d.getDate())}.${this.fixedNumber(
      this.d.getMonth() + 1
    )}.${this.getYear()}`;
  }

  fixedNumber(n, l = 2) {
    return `${(new Array(l).fill(0).join('') + n).slice(-l)}`;
  }
}
