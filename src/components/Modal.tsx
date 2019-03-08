import React, { SFC } from 'react';
import { FlowProvider, FlowConsumer } from './Flow/FlowContext';
import { ViewProvider } from './View/ViewContext';
import Views from './shared/views';
import ModalItem from './ModalItem';

const Modal: SFC = () => {
  return (
    <FlowProvider activeView={Views.AddedProduct}>
      <FlowConsumer>
        {({ flowContext: { titleView } }) => {
          return (
            <div className="modal">
              <div className="modal-header">
                <h1>{titleView}</h1>
              </div>
              <div className="modal-content">
                <ViewProvider
                  id={Views.AddedProduct}
                  title="Producto agregado al carrito"
                  actions={{
                    goToLogin: Views.Login,
                    goToShippingAddress: Views.ShippingAddress
                  }}>
                  <ModalItem className="content c1" />
                </ViewProvider>

                <ViewProvider
                  id={Views.Login}
                  title="Inicio de sesión"
                  actions={{
                    returnAddedProduct: Views.AddedProduct,
                    goToShippingAddress: Views.ShippingAddress
                  }}>
                  <ModalItem className="content c2" />
                </ViewProvider>

                <ViewProvider
                  id={Views.ShippingAddress}
                  title="Dirección de envio">
                  <ModalItem className="content c3" showClose={true} />
                </ViewProvider>
              </div>
            </div>
          );
        }}
      </FlowConsumer>
    </FlowProvider>
  );
};

export default Modal;
