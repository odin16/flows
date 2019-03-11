import React, { SFC } from 'react';
import { FlowConsumer } from './flow';

interface ModalItemProps {
  className: string;
  title: string;
}

const ModalItem: SFC<ModalItemProps> = props => {
  return (
    <FlowConsumer>
      {({
        views,
        activeView,
        prevActiveView,
        existsViewsHistory,
        goToView,
        goToNextView,
        backInHistory
      }) => {
        const next = views[activeView].next;
        const nextIsArray = Array.isArray(next);

        return (
          <div className={props.className}>
            <h2>{props.title}</h2>
            <div className="btns">
              {next && !nextIsArray && (
                <button onClick={() => goToNextView()}>Next</button>
              )}

              {next &&
                nextIsArray &&
                (next as string[]).map((id, i) => {
                  return (
                    <button key={i} onClick={() => goToNextView(i)}>
                      Branch {i}
                    </button>
                  );
                })}

              {prevActiveView && (
                <button onClick={() => goToView(prevActiveView)}>Prev</button>
              )}

              {existsViewsHistory && (
                <button onClick={backInHistory}>Back in history</button>
              )}
            </div>
          </div>
        );
      }}
    </FlowConsumer>
  );
};

export default ModalItem;
