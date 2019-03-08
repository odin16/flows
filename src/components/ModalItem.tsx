import React, { SFC } from 'react';
import { ViewConsumer } from './View/ViewContext';
import { FlowConsumer } from './Flow/FlowContext';

interface ModalItemProps {
  className: string;
  showClose: boolean;
}

const ModalItem: SFC<ModalItemProps> = props => {
  return (
    <FlowConsumer>
      {({
        flowContext: {
          goToView,
          goToBack,
          closeFlow,
          prevActiveView,
          existsViewsHistory
        }
      }) => {
        return (
          <ViewConsumer>
            {({ viewContext: { title, actions } }) => {
              return (
                <div className={props.className}>
                  <h2>{title}</h2>
                  <div className="btns">
                    {actions &&
                      Object.keys(actions).map((key, i) => (
                        <button key={i} onClick={goToView(actions[key])}>
                          {key}
                        </button>
                      ))}

                    {props.showClose && (
                      <button onClick={() => setTimeout(closeFlow, 2000)}>
                        Close
                      </button>
                    )}

                    {prevActiveView && (
                      <button onClick={goToView(prevActiveView)}>Prev</button>
                    )}

                    {existsViewsHistory && (
                      <button onClick={goToBack}>Back</button>
                    )}
                  </div>
                </div>
              );
            }}
          </ViewConsumer>
        );
      }}
    </FlowConsumer>
  );
};

export default ModalItem;
