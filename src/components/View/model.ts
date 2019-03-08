import { View } from '../shared/model';

export interface ConsumerProps {
  viewContext: View;
}

export interface ProviderProps extends View {}
