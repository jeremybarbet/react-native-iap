export enum AndroidPurchaseType {
  TEST = 0,
  PROMO = 1,
  REWARDED = 2,
}

export enum AndroidConsumptionState {
  YET = 0,
  CONSUMED = 1,
}

export enum AndroidAcknowledgementState {
  YET = 0,
  ACKNOWLEDGED = 1,
}

export enum AndroidPurchaseState {
  UNSPECIFIED_STATE = 0,
  PURCHASED = 1,
  PENDING = 2,
}

export enum AndroidProrationModes {
  IMMEDIATE_WITH_TIME_PRORATION = 1,
  IMMEDIATE_AND_CHARGE_PRORATED_PRICE = 2,
  IMMEDIATE_WITHOUT_PRORATION = 3,
  DEFERRED = 4,
  UNKNOWN_SUBSCRIPTION_UPGRADE_DOWNGRADE_POLICY = 0,
}

export enum AndroidInstallSource {
  NOT_SET = 0,
  GOOGLE_PLAY = 1,
  AMAZON = 2,
}

export enum AndroidSkuType {
  SUBS = 'subs',
  INAPP = 'inapp',
}

/**
 * Get a list of products (consumable and non-consumable items, but not subscriptions)
 */
export type AndroidReceiptType = {
  /**
   * The time the product was purchased, in milliseconds since the epoch (Jan 1, 1970).
   */
  startTimeMillis: number;
  /**
   * The time the product expires, in milliseconds since the epoch (Jan 1, 1970).
   */
  expiryTimeMillis: number;
  /**
   * Check if it is a renewable product.
   */
  autoRenewing: boolean;
  /**
   * The price currency.
   */
  priceCurrencyCode: string;
  /**
   * Price amount int micros.
   */
  priceAmountMicros: number;
  /**
   * Country code.
   */
  countryCode: string;
  /**
   * Developer payload.
   */
  developerPayload: string;
  /**
   * Order id.
   */
  orderId: string;
  consumptionState?: AndroidConsumptionState;
  purchaseState: AndroidPurchaseState;
  /**
   * Purchase type.
   */
  purchaseType: AndroidPurchaseType;
  /**
   * Check if product is acknowledged.
   */
  acknowledgementState: AndroidAcknowledgementState;
  kind: string;
} & Record<string, unknown>;
