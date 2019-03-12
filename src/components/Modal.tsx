import React, { SFC } from 'react';
import { Flow, FlowConsumer, View } from './flow';
import { config, Views } from './config';
import ModalItem from './ModalItem';

const Modal: SFC = () => {
  return (
    <div className="modal">
      <Flow config={config} />
    </div>
  );
};

export default Modal;
