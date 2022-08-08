import {Linking, NativeModules} from 'react-native';
import type {
  ProductPurchase,
  SubscriptionPurchase,
} from '@jeremybarbet/google-api-types';

import {enhancedFetch, linkingError} from '../internal';
import type {
  NativeModuleProps,
  Product,
  ProductType,
  Purchase,
  PurchaseToken,
  Sku,
} from '../types';

import {AmazonModule} from './amazon';

export enum ProrationModesAndroid {
  UNKNOWN_SUBSCRIPTION_UPGRADE_DOWNGRADE_POLICY = 0,
  IMMEDIATE_WITH_TIME_PRORATION = 1,
  IMMEDIATE_AND_CHARGE_PRORATED_PRICE = 2,
  IMMEDIATE_WITHOUT_PRORATION = 3,
  DEFERRED = 4,
}

export interface PurchaseResult {
  responseCode?: number;
  debugMessage?: string;
  code?: string;
  message?: string;
}

type FlushFailedPurchasesCachedAsPending = () => Promise<void>;

type GetItemsByType = <T = Product>(
  type: ProductType,
  skus: Sku[],
) => Promise<T[]>;

type GetAvailableItemsByType = <T = Purchase>(
  type: ProductType,
) => Promise<T[]>;

type GetPurchaseHistoryByType = <T = Purchase>(
  type: ProductType,
) => Promise<T[]>;

export type BuyItemByType = (
  type: string,
  sku: Sku,
  purchaseToken: PurchaseToken,
  prorationMode: ProrationModesAndroid,
  obfuscatedAccountId?: string,
  obfuscatedProfileId?: string,
) => Promise<void>;

type AcknowledgePurchase = (
  purchaseToken: PurchaseToken,
  developerPayloadAndroid?: string,
) => Promise<PurchaseResult | void>;

type ConsumeProduct = (
  purchaseToken: PurchaseToken,
  developerPayloadAndroid?: string,
) => Promise<string | void>;

type StartListening = () => Promise<void>;
type GetPackageName = () => Promise<string>;

export interface AndroidModuleProps extends NativeModuleProps {
  flushFailedPurchasesCachedAsPending: FlushFailedPurchasesCachedAsPending;
  getItemsByType: GetItemsByType;
  getAvailableItemsByType: GetAvailableItemsByType;
  getPurchaseHistoryByType: GetPurchaseHistoryByType;
  buyItemByType: BuyItemByType;
  acknowledgePurchase: AcknowledgePurchase;
  consumeProduct: ConsumeProduct;
  startListening: StartListening;
  getPackageName: GetPackageName;
}

export const AndroidModule = (
  NativeModules.RNIapModule
    ? NativeModules.RNIapModule
    : AmazonModule
    ? AmazonModule
    : linkingError
) as AndroidModuleProps;

/**
 * Consume all 'ghost' purchases.
 *
 * That is, pending payment that already failed but is still marked as pending in Play Store cache
 *
 * @platform Android
 */
export const flushFailedPurchasesCachedAsPendingAndroid = () =>
  AndroidModule.flushFailedPurchasesCachedAsPending();

/**
 * Acknowledge a product.
 *
 * @platform Android
 */
export const acknowledgePurchaseAndroid = (
  /** The product's token */
  token: string,

  /** Android developerPayload */
  developerPayload?: string,
) => {
  return AndroidModule.acknowledgePurchase(token, developerPayload);
};

/**
 * Deep link to subscriptions screen.
 *
 * @platform Android
 */
export const deepLinkToSubscriptionsAndroid = async (
  /** The product's SKU */
  sku: Sku,
) =>
  Linking.openURL(
    `https://play.google.com/store/account/subscriptions?package=${await AndroidModule.getPackageName()}&sku=${sku}`,
  );

/**
 * Validate receipt.
 *
 * @note
 * This method is here for debugging purposes only. Including your
 * access token in the binary you ship to users is potentially dangerous.
 * Use server side validation instead for your production builds.
 *
 * @platform Android
 */
export const validateReceiptAndroid = async (
  /** package name of your app. */
  packageName: string,

  /** product id for your in app product. */
  productId: string,

  /** token for your purchase. */
  productToken: string,

  /** accessToken from googleApis. */
  accessToken: string,

  /** whether this is a subscription or in-app product. `true` for subscription. */
  isSub?: boolean,
) => {
  const type = isSub ? 'subscriptions' : 'products';

  const url =
    'https://androidpublisher.googleapis.com/androidpublisher/v3/applications' +
    `/${packageName}/purchases/${type}/${productId}` +
    `/tokens/${productToken}?access_token=${accessToken}`;

  return await enhancedFetch<ProductPurchase | SubscriptionPurchase>(url);
};
