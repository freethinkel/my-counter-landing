export const defaultCity = 'Владимир';

export const getHeaderSize = () => {
  const header = document.querySelector('header');
  return (header && header.offsetHeight) || 105;
};

export function scrollToElem(selector, offset) {
  let elem = document.querySelector(selector);
  if (elem) {
    let coord =
      elem.getBoundingClientRect().top +
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
