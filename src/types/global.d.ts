import 'react-native';

import type {PaymentDiscount} from './apple';
import type {Product, ProductCommon} from './index';

export type Sku = string;

export interface NativeModuleProps {
  initConnection(): Promise<boolean>;
  endConnection(): Promise<void>;
}

export interface IosModuleProps extends NativeModuleProps {
  getItems(skus: Sku[]): Promise<Product[]>;
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

export interface AndroidModuleProps extends NativeModuleProps {
  flushFailedPurchasesCachedAsPending(): Promise<boolean>;
  getItemsByType(type: string, skus: Sku[]): Promise<Product[]>;
}

export interface AmazonModuleProps extends NativeModuleProps {
  getUser(): Promise<{userMarketplaceAmazon: string}>;
}

declare module 'react-native' {
  interface NativeModulesStatic {
    IapIos: IosModuleProps;
    IapAndroid: AndroidModuleProps;
    IapAmazon: AmazonModuleProps;
  }
}
