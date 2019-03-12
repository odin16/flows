import { FlowConfig } from './Flow';

export enum Views {
  selectDeliveryType = '1',
  requestMail = '2',
  requestAddress = '3',
  withCoverage = '4',
  withoutCoverage = '5',
  buyAndPick = '6'
}

export const config: FlowConfig = {
  activeView: Views.selectDeliveryType,
  views: {
    [Views.selectDeliveryType]: {
      next: Views.requestMail,
      component: import('./ModalItem'),
      props: {
        title: 'Conteniedo 1',
        className: 'content c1'
      }
    },
    [Views.requestMail]: {
      next: Views.requestAddress,
      component: import('./ModalItem'),
      props: {
        title: 'Conteniedo 2',
        className: 'content c2'
      }
    },
    [Views.requestAddress]: {
      next: [Views.withCoverage, Views.withoutCoverage],
      component: import('./ModalItem'),
      props: {
        title: 'Conteniedo 3',
        className: 'content c3'
      }
    },
    [Views.withCoverage]: {
      next: null,
      component: import('./ModalItem'),
      props: {
        title: 'Conteniedo 4',
        className: 'content c4'
      }
    },
    [Views.withoutCoverage]: {
      next: [Views.requestAddress, Views.buyAndPick],
      component: import('./ModalItem'),
      props: {
        title: 'Conteniedo 5',
        className: 'content c5'
      }
    },
    [Views.buyAndPick]: {
      next: Views.withCoverage,
      component: import('./ModalItem'),
      props: {
        title: 'Conteniedo 6',
        className: 'content c6'
      }
    }
  }
};
