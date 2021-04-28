import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.css';

const modal = (props) => {
  return (
    <Aux>
      <Backdrop show={props.show} remove={props.removeModal} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0',
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};

function checkRendering(prevProps, nextProps) {
  return (
    prevProps.show === nextProps.show && prevProps.loading === nextProps.loading
  );
}
export default React.memo(modal, checkRendering);
