import React, { createContext, SFC, useState } from 'react';
import { ConsumerProps, ProviderProps } from './model';
import { View } from '../shared/model';
import { omit } from 'lodash';

const { Provider, Consumer } = createContext<Partial<ConsumerProps>>({});

const FlowProvider: SFC<ProviderProps> = props => {
  const [views, setViews] = useState({});
  const [activeView, setActiveView] = useState(props.activeView || null);
  const [viewsHistory, setViewsHistory] = useState([]);
  const [prevActiveView, setPrevActiveView] = useState(
    props.prevActiveView || null
  );

  const addView = (newView: View) => {
    if (!(newView.id in views)) {
      setViews({
        ...views,
        [newView.id]: omit(newView, 'id')
      });
    }
  };

  const goToView = (id: string) => event => {
    if (id in views) {
      setPrevActiveView(activeView);
      setViewsHistory([...viewsHistory, activeView]);
      setActiveView(id);
    }
  };

  const closeFlow = () => {
    setPrevActiveView(activeView);
    setActiveView(null);
  };

  const goToBack = () => {
    const arr = [...viewsHistory];
    setPrevActiveView(activeView);
    setActiveView(arr.pop());
    setViewsHistory(arr);
  };

  const context: ConsumerProps = {
    flowContext: {
      existsViewsHistory: !!viewsHistory.length,
      prevActiveView,
      activeView,
      addView,
      goToView,
      goToBack,
      closeFlow
    }
  };

  return <Provider value={context}>{props.children}</Provider>;
};

const FlowConsumer = Consumer;

export { FlowProvider, FlowConsumer };
