export interface View {
  id: string;
  title: string;
  actions: { [key: string]: string };
}

// export interface ViewConfig extends View {
//   actions: { [key: string]: string };
// }

// export interface FlowConfig {
//   activeView: string;
//   views: ViewConfig[];
// }
