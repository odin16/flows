import React, { createContext, SFC, useState } from 'react';
import { ConsumerProps, ProviderProps } from './model';
import { View } from '../shared/model';
import { omit } from 'lodash';

const { Provider, Consumer } = createContext<Partial<ConsumerProps>>({});

const FlowProvider: SFC<ProviderProps> = props => {
  const [views, setViews] = useState({});
  const [titleView, setTitleView] = useState(null);
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
      if (newView.id === props.activeView) {
        setTitleView(newView.title);
      }
    }
  };

  const goToView = (id: string) => event => {
    if (id in views) {
      setTitleView(views[id].title);
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
    const id = arr.pop();

    setTitleView(views[id].title);
    setPrevActiveView(activeView);
    setActiveView(id);
    setViewsHistory(arr);
  };

  const context: ConsumerProps = {
    flowContext: {
      titleView,
      prevActiveView,
      activeView,
      addView,
      goToView,
      goToBack,
      closeFlow,
      existsViewsHistory: !!viewsHistory.length
    }
  };

  return <Provider value={context}>{props.children}</Provider>;
};

const FlowConsumer = Consumer;

export { FlowProvider, FlowConsumer };
