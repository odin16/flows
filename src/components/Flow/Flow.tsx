import React, { createContext, SFC, useState, useEffect } from 'react';
import { ConsumerProps, ProviderProps } from './model';
import { ListView } from '../shared/model';
import { omit } from 'lodash';

const { Provider, Consumer } = createContext<Partial<ConsumerProps>>({});

const FlowProvider: SFC<ProviderProps> = ({ config, children }) => {
  const [views, setViews] = useState<Partial<ListView>>({});
  const [activeView, setActiveView] = useState<string>(null);
  const [viewsHistory, setViewsHistory] = useState<string[]>([]);
  const [prevActiveView, setPrevActiveView] = useState<string>(null);

  useEffect(() => {
    setViews(config.views);
    setActiveView(config.activeView);
  }, []);

  const goToView = (id: string) => {
    if (id in views) {
      setPrevActiveView(activeView);
      setViewsHistory([...viewsHistory, activeView]);
      setActiveView(id);
    } else {
      console.error('The id from view is invalid.');
    }
  };

  const backInHistory = () => {
    const arr = [...viewsHistory];
    setPrevActiveView(activeView);
    setActiveView(arr.pop());
    setViewsHistory(arr);
  };

  const goToNextView = (branch: number = -1) => {
    const view = views[activeView];

    if (typeof view.next === 'string') {
      goToView(view.next);
    } else if (Array.isArray(view.next) && branch >= 0) {
      goToView(view.next[branch]);
    } else {
      console.error('The next view in the flow is invalid.');
    }
  };

  const context: ConsumerProps = {
    views,
    existsViewsHistory: !!viewsHistory.length,
    prevActiveView,
    activeView,
    goToView,
    backInHistory,
    goToNextView
  };

  return <Provider value={context}>{children}</Provider>;
};

const FlowConsumer = Consumer;
const Flow = FlowProvider;

export { Flow, FlowConsumer };
