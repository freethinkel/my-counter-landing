import React from 'react';
import { cx, css } from 'linaria';

const Skeleton = ({ width, height, variant }) => {
  return (
    <div
      style={{
        width: width,
        height: height
      }}
      className={cx(classes.wrapper, classes[variant])}
    ></div>
  );
};

export default Skeleton;

const classes = {
  wrapper: css`
    border-radius: 5px;
    background-color: #bebebe;
    position: relative;
    margin-top: 0.8em;
    margin-bottom: 0.8em;
    animation: skeleton_animation 1.5s ease-in-out infinite;

    @keyframes skeleton_animation {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.4;
      }
      100% {
        pacity: 1;
      }
    }
  `,
  rect: css`
    border-radius: 0;
    margin: 0;
  `,
  circle: css`
    border-radius: 50%;
  `
};
