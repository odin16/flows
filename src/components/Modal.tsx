import React, { SFC } from 'react';
import { Flow, FlowConsumer, View } from './flow';
import { config, Views } from './config';
import ModalItem from './ModalItem';

const Modal: SFC = () => {
  return (
    <Flow config={config}>
      <div className="modal">
        <View id={Views.selectDeliveryType}>
          <ModalItem className="content c1" title="Conteniedo 1" />
        </View>

        <View id={Views.requestMail}>
          <ModalItem className="content c2" title="Conteniedo 2" />
        </View>

        <View id={Views.requestAddress}>
          <ModalItem className="content c3" title="Conteniedo 3" />
        </View>

        <View id={Views.withCoverage}>
          <ModalItem className="content c4" title="Conteniedo 4" />
        </View>

        <View id={Views.withoutCoverage}>
          <ModalItem className="content c5" title="Conteniedo 5" />
        </View>

        <View id={Views.buyAndPick}>
          <ModalItem className="content c6" title="Conteniedo 6" />
        </View>
      </div>
    </Flow>
  );
};

export default Modal;
