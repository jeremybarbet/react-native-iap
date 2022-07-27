import 'react-native';

import type {PaymentDiscount} from './apple';
import type {Product, ProductCommon, ProductPurchase} from './index';

type Sku = string;

enum IAPErrorCode {
  E_IAP_NOT_AVAILABLE = 'E_IAP_NOT_AVAILABLE',
  E_UNKNOWN = 'E_UNKNOWN',
  E_USER_CANCELLED = 'E_USER_CANCELLED',
  E_USER_ERROR = 'E_USER_ERROR',
  E_ITEM_UNAVAILABLE = 'E_ITEM_UNAVAILABLE',
  E_REMOTE_ERROR = 'E_REMOTE_ERROR',
  E_NETWORK_ERROR = 'E_NETWORK_ERROR',
  E_SERVICE_ERROR = 'E_SERVICE_ERROR',
  E_RECEIPT_FAILED = 'E_RECEIPT_FAILED',
  E_RECEIPT_FINISHED_FAILED = 'E_RECEIPT_FINISHED_FAILED',
  E_NOT_PREPARED = 'E_NOT_PREPARED',
  E_NOT_ENDED = 'E_NOT_ENDED',
  E_ALREADY_OWNED = 'E_ALREADY_OWNED',
  E_DEVELOPER_ERROR = 'E_DEVELOPER_ERROR',
  E_BILLING_RESPONSE_JSON_PARSE_ERROR = 'E_BILLING_RESPONSE_JSON_PARSE_ERROR',
  E_DEFERRED_PAYMENT = 'E_DEFERRED_PAYMENT',
}

interface PurchaseResult {
  responseCode?: number;
  debugMessage?: string;
  code?: string;
  message?: string;
}

type Purchase = InAppPurchase | SubscriptionPurchase;

interface NativeModuleProps {
  initConnection(): Promise<boolean>;
  endConnection(): Promise<boolean>;
}

interface IosModuleProps extends NativeModuleProps {
  getItems(skus: Sku[]): Promise<(Product | Subscription)[]>;
  getAvailableItems(): Promise<void>;
  buyProduct(
    sku: Sku,
    andDangerouslyFinishTransactionAutomatically: boolean,
  ): Promise<void>;
  buyProductWithOffer(
    sku: Sku,
    forUser: string,
    withOffer: PaymentDiscount,
  ): Promise<void>;
  buyProductWithQuantityIOS(sku: Sku, quantity: number): Promise<void>;
  clearTransaction(): Promise<void>;
  clearProducts(): Promise<void>;
  promotedProduct(): Promise<void>;
  buyPromotedProduct(): Promise<void>;
  requestReceipt(refresh: boolean): Promise<void>;
  finishTransaction(transactionIdentifier: string): Promise<void>;
  getPendingTransactions(): Promise<void>;
  presentCodeRedemptionSheet(): Promise<void>;
}

interface AndroidModuleProps extends NativeModuleProps {
  startListening(): Promise<void>;
  flushFailedPurchasesCachedAsPending(): Promise<boolean>;
  getItemsByType(
    type: string,
    skus: Sku[],
  ): Promise<(Product | Subscription)[]>;
  getAvailableItemsByType(
    type: AndroidSkuType,
  ): Promise<(Product | Subscription)[]>;
  getPurchaseHistoryByType(type: AndroidSkuType): Promise<ProductPurchase[]>;
  buyItemByType(
    type: strindAndroidSkuTypeg,
    sku: Sku,
    purchaseToken?: string,
  ): Promise<SubscriptionPurchase | null>;
}

interface AmazonModuleProps extends NativeModuleProps {
  getUser(): Promise<{userMarketplaceAmazon: string}>;
}

interface NativeModuleEventEmitter extends NativeModuleProps {
  addListener(eventType: string): void;
  removeListeners(count: number): void;
}

declare module 'react-native' {
  interface NativeModulesStatic {
    IapIos: IosModuleProps;
    IapAndroid: AndroidModuleProps;
    IapAmazon: AmazonModuleProps;
  }
}
