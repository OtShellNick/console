import React, { ReactNode } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';

import './Tooltip.scss';
import 'react-popper-tooltip/dist/styles.css';

type TTooltipProps = {
  children: ReactNode;
  text: string;
  placement?: string;
}

const Tooltip = ({ children, text, placement }: TTooltipProps) => {
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({ placement, delayShow: 100, delayHide: 100 });

  return (
    <div ref={setTriggerRef}>
      {children}
      {visible && (
      <div ref={setTooltipRef} {...getTooltipProps({ className: 'tooltip-container' })}>
        <div {...getArrowProps({ className: 'tooltip-arrow' })} />
          {text}
      </div>
      )}
    </div>
  );
};

Tooltip.defaultProps = {
  placement: 'right',
};

export default Tooltip;
