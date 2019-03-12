export interface ViewConfig {
  next: string | string[];
  component: Promise<any>;
  props?: any;
  data?: any;
}

export interface ListView {
  [key: string]: ViewConfig;
}

export interface FlowConfig {
  activeView: string;
  views: ListView;
}

export interface ConsumerProps {
  views: ListView;
  prevActiveView: string;
  activeView: string;
  existsViewsHistory: boolean;
  goToView: (id: string) => void;
  backInHistory: () => void;
  goToNextView: (branch?: number) => void;
  saveData: (data: any) => void;
}

export interface ProviderProps {
  config: FlowConfig;
}
