import { FlowConfig } from '../shared/model';
import Views from '../shared/views';

export interface ConsumerProps {
  flowContext: {
    prevActiveView: Views;
    activeView: Views;
    addView: () => void;
    goToView: () => void;
  };
}

export interface ProviderProps {
  prevActiveView: Views;
  activeView: Views;
}

export interface FlowProps {
  activeView: Views;
}
