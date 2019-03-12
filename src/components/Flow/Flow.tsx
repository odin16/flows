import React, {
  createContext,
  createElement,
  FunctionComponent,
  useState,
  useEffect
} from 'react';
import { ConsumerProps, ProviderProps, ListView } from './model';
import { omit, isEmpty } from 'lodash';
import { asyncComponent } from 'react-async-component';

const { Provider, Consumer } = createContext<Partial<ConsumerProps>>({});

const FlowProvider: FunctionComponent<ProviderProps> = ({
  config,
  children
}) => {
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

  const saveData = (data: any) => {
    const view = views[activeView];
    view.data = { ...view.data, ...data };
    setViews({ ...views, ...{ [activeView]: view } });
  };

  const View = () => {
    const view = views[activeView];
    console.log('Views: ', views);
    if (!isEmpty(view)) {
      return createElement(
        asyncComponent({
          resolve: () => view.component
        }),
        view.props
      );
    }
    return null;
  };

  const context: ConsumerProps = {
    views,
    existsViewsHistory: !!viewsHistory.length,
    prevActiveView,
    activeView,
    goToView,
    backInHistory,
    goToNextView,
    saveData
  };

  return (
    <Provider value={context}>
      <View />
    </Provider>
  );
};

const FlowConsumer = Consumer;
const Flow = FlowProvider;

export { Flow, FlowConsumer };
