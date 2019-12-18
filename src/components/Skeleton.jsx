import React, { Component } from 'react';
import { cx, css } from 'linaria';

class Skeleton extends Component {
  render() {
    return (
      <div
        style={{
          width: this.props.width,
          height: this.props.height
        }}
        className={cx(classes.wrapper, classes[this.props.variant])}
      ></div>
    );
  }
}

export default Skeleton;

const classes = {
  wrapper: css`
    border-radius: 8px;
    background-color: #bebebe;
    position: relative;
    margin-top: 0.8em;
    margin-bottom: 0.8em;
    animation: skeleton_animation 1.5s ease-in-out infinite;
  `,
  rect: css`
    border-radius: 0;
    margin: 0;
  `,
  circle: css`
    border-radius: 50%;
  `
};
