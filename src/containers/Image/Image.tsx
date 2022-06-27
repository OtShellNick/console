import React from 'react';

import './Image.scss';

type TImage = {
   hash: string;
   className?: string;
}

const Image = ({ hash, className }: TImage) => <img className={className} src={`https://console-rest.sobix.io:8080/v1/sbx-files/${hash}`} alt="N/A" />;

Image.defaultProps = {
  className: '',
};
export default Image;
