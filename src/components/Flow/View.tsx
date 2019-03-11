import React, { FunctionComponent, createContext } from 'react';
import { FlowConsumer } from './Flow';

interface ViewProps {
  id: string;
}

export const View: FunctionComponent<ViewProps> = props => {
  return (
    <FlowConsumer>
      {({ activeView }) => {
        return activeView === props.id && props.children;
      }}
    </FlowConsumer>
  );
};
