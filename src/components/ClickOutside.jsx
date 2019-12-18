import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

function useOutsideDetect(ref, props) {
  function handleClickOutside(event) {
    let node = ReactDOM.findDOMNode(ref.current);
    if (node && !node.contains(event.target)) {
      props.onClickOutside && props.onClickOutside();
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
}

export default function ClickOutside(props) {
  const wrapperRef = useRef(null);
  useOutsideDetect(wrapperRef, props);
  return React.cloneElement(props.children, { ref: wrapperRef });
}
