import React, { SFC, createContext } from 'react';
import { FlowProvider, FlowConsumer } from '../Flow/FlowContext';
import { ConsumerProps, ProviderProps } from './model';

const { Provider, Consumer } = createContext<Partial<ConsumerProps>>({});

const ViewProvider: SFC<ProviderProps> = props => {
  const context: ConsumerProps = {
    viewContext: {
      id: props.id,
      title: props.title,
      actions: props.actions || null
    }
  };

  return (
    <FlowConsumer>
      {({ flowContext }) => {
        flowContext.addView({
          id: props.id,
          title: props.title,
          actions: props.actions
        });

        return (
          flowContext.activeView === props.id && (
            <Provider value={context}>{props.children}</Provider>
          )
        );
      }}
    </FlowConsumer>
  );
};

const ViewConsumer = Consumer;

export { ViewProvider, ViewConsumer };
