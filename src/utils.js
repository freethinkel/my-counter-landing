export const defaultCity = 'Владимир';

export const getHeaderSize = () => {
  // const header = document.querySelector('header > div');
  let size = 98;
  if (window.innerWidth <= 1000) {
    size = 78;
  }
  return size;
};

export function scrollToElem(selector, offset) {
  let elem = document.querySelector(selector);
  if (elem) {
    let coord =
      elem.getBoundingClientRect().top * 0.69 +
      (window.pageYOffset || document.body.scrollTop) -
      offset;
    smoothScrollTo(null, coord);
  }
}

export function smoothScrollTo(element, target) {
  if (element) {
    document.querySelector(element).scroll({
      top: target,
      left: 0,
      behavior: 'smooth'
    });
  } else {
    window.scroll({
      top: target,
      left: 0,
      behavior: 'smooth'
    });
  }
}

export const scrollToSection = id => {
  let selector = `[scroll-data=${id}]`;
  const section = document.querySelector(selector);
  if (section) {
    let offset = (window.innerHeight - section.clientHeight) / 2;
    if (offset < 0) offset = 0;
    offset += getHeaderSize() - 1;
    scrollToElem(selector, offset);
  }
};

export const phonePipe = value => {
  if (value) {
    let arr;
    if (value[0] === '+') {
      arr =
        value.substr(0, 2) +
        ' (' +
        value.substr(2, 3) +
        ') ' +
        value.substr(5, 3) +
        '-' +
        value.substr(8, 2) +
        '-' +
        value.substr(10);
    } else {
      arr =
        +value[0] +
        ' (' +
        value.substr(1, 3) +
        ') ' +
        value.substr(4, 3) +
        '-' +
        value.substr(7, 2) +
        '-' +
        value.substr(9);
    }
    return arr;
  } else {
    return value;
  }
};

// getPhotoUrl(props.src, {
//   w: 1200,
//   fm: 'jpg',
//   fl: 'progressive',
//   q: 78
// });

export const getPhotoUrl = (url, params) => url + toQuery(params);

export const toQuery = obj => {
  let query = '?';
  Object.keys(obj).forEach(key => {
    query += `${key}=${obj[key]}&`;
  });
  return query.slice(0, -1);
};
