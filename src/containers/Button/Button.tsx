import React from 'react';

import './Button.scss';
import { string, func } from 'prop-types';

type IButton = {
text: string;
className?: string;
type?: 'button' | 'submit' | 'reset';
onPress?: () => void
}

const Button = ({
  text,
  className = '',
  type = 'button',
  onPress,
}: IButton) => (
  <button
    className={`btn ${className}`}
    type={type} // TODO fix invalid type
    onClick={onPress}
  >
    {text}
  </button>
);

Button.defaultProps = {
  className: string,
  type: string,
  onPress: func,
};

export default Button;
