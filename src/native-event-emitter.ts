import {EmitterSubscription, NativeEventEmitter, Platform} from 'react-native';

import {AndroidModule, NativeModule} from './module';
import type {
  InAppPurchase,
  NativeModuleEventEmitter,
  PurchaseError,
  SubscriptionPurchase,
} from './types';

const nativeEventEmitter = new NativeEventEmitter(
  NativeModule as unknown as NativeModuleEventEmitter,
);

/**
 * Add IAP purchase event
 */
export const purchaseUpdatedListener = (
  listener: (event: InAppPurchase | SubscriptionPurchase) => void,
) => {
  const emitterSubscription = nativeEventEmitter.addListener(
    'purchase-updated',
    listener,
  );

  if (Platform.OS === 'android') {
    AndroidModule.startListening();
  }

  return emitterSubscription;
};

/**
 * Add IAP purchase error event
 */
export const purchaseErrorListener = (
  listener: (errorEvent: PurchaseError) => void,
): EmitterSubscription =>
  nativeEventEmitter.addListener('purchase-error', listener);
