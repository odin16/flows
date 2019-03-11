export enum Views {
  selectDeliveryType = '1',
  requestMail = '2',
  requestAddress = '3',
  withCoverage = '4',
  withoutCoverage = '5',
  buyAndPick = '6'
}

export const config = {
  activeView: Views.selectDeliveryType,
  views: {
    [Views.selectDeliveryType]: {
      next: Views.requestMail
    },
    [Views.requestMail]: {
      next: Views.requestAddress
    },
    [Views.requestAddress]: {
      next: [Views.withCoverage, Views.withoutCoverage]
    },
    [Views.withCoverage]: {
      next: null
    },
    [Views.withoutCoverage]: {
      next: [Views.requestAddress, Views.buyAndPick]
    },
    [Views.buyAndPick]: {
      next: Views.withCoverage
    }
  }
};
